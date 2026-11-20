// Shared by the worker and the cooperative fallback. Decode with the editor's
// own readFileWithEncoding so search and opening a file see the same text.
function createFolderContentSearchEngine(readFile, cacheLimit = 96 * 1024 * 1024) {
    const cache = new Map();
    const stats = { fileReads: 0, cacheHits: 0, cacheBytes: 0 };
    const chunkSize = 128 * 1024;

    function remove(key) {
        const entry = cache.get(key);
        if (entry) stats.cacheBytes -= entry.bytes;
        cache.delete(key);
    }

    async function search(entry, query, isCurrent) {
        const { file, key } = entry;
        let cached = cache.get(key);
        let text;
        if (cached && cached.size === file.size && cached.modified === file.lastModified) {
            stats.cacheHits++;
            cache.delete(key);
            cache.set(key, cached);
            text = cached.text;
        } else {
            remove(key);
            stats.fileReads++;
            ({ text } = await readFile(file));
            if (!isCurrent()) return null;
            // Count two bytes per UTF-16 code unit, even on engines that store
            // ASCII strings more compactly. Never retain an oversized file.
            const bytes = text.length * 2 + (Math.ceil(text.length / chunkSize) + 1) * 8;
            cached = { text, size: file.size, modified: file.lastModified, bytes, lineCounts: [1] };
            if (bytes <= cacheLimit) {
                while (cache.size && (stats.cacheBytes + bytes > cacheLimit || cache.size >= 2048)) remove(cache.keys().next().value);
                cache.set(key, cached);
                stats.cacheBytes += bytes;
            }
        }

        const expression = new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
        let lastYield = performance.now();
        const yieldIfNeeded = async () => {
            if (performance.now() - lastYield >= 6) {
                await new Promise(resolve => setTimeout(resolve, 0));
                lastYield = performance.now();
            }
            return isCurrent();
        };
        let matchIndex = -1;
        // Overlap chunks so a literal match spanning their boundary is found.
        // A regex gives original-string offsets even for Unicode case variants.
        for (let start = 0; start < text.length; start += chunkSize) {
            if (!isCurrent()) return null;
            const match = expression.exec(text.slice(start, start + chunkSize + query.length - 1));
            if (match) { matchIndex = start + match.index; break; }
            if (!await yieldIfNeeded()) return null;
        }
        if (matchIndex < 0) return null;

        // Count line breaks without splitting hundreds of thousands of lines
        // into temporary strings. CRLF is one break, including across chunks.
        // Keep one line-number checkpoint per chunk, so later queries need only
        // count the final partial chunk rather than revisiting all earlier lines.
        const countBreaks = (start, end) => {
            const part = text.slice(start, end);
            const breaks = /\r\n|\r|\n/g;
            let count = 0;
            while (breaks.exec(part)) count++;
            if (end > start && start > 0 && text[start - 1] === '\r' && text[start] === '\n') count--;
            return count;
        };
        const block = Math.floor(matchIndex / chunkSize);
        const counts = cached.lineCounts;
        for (let index = counts.length - 1; index < block; index++) {
            counts.push(counts[index] + countBreaks(index * chunkSize, (index + 1) * chunkSize));
            if (!await yieldIfNeeded()) return null;
        }
        const line = counts[block] + countBreaks(block * chunkSize, matchIndex);
        const lineStart = Math.max(text.lastIndexOf('\n', matchIndex - 1), text.lastIndexOf('\r', matchIndex - 1)) + 1;
        const snippetStart = Math.max(lineStart, matchIndex - 45);
        const snippet = (snippetStart > lineStart ? '…' : '') + text.slice(snippetStart, matchIndex + Math.max(query.length, 100)).split(/\r\n|\r|\n/, 1)[0];
        return { matchLine: line, matchSnippet: snippet };
    }

    return {
        stats,
        clear() { cache.clear(); stats.cacheBytes = 0; },
        async searchBatch(entries, query, isCurrent) {
            const results = [];
            for (const entry of entries) {
                if (!isCurrent()) return null;
                try { results.push(await search(entry, query, isCurrent)); }
                catch (error) { results.push({ error: true }); }
                // Cached small files also need to yield between batches of work.
                if (!isCurrent()) return null;
            }
            return results;
        }
    };
}

function runFolderContentSearchWorker(createEngine, readFile) {
    const engine = createEngine(readFile);
    let generation = 0;
    self.onmessage = async ({ data }) => {
        if (data.type === 'cancel' || data.type === 'clear') {
            generation = data.generation;
            if (data.type === 'clear') engine.clear();
            return;
        }
        generation = data.generation;
        const results = await engine.searchBatch(data.entries, data.query, () => generation === data.generation);
        if (generation === data.generation) self.postMessage({ id: data.id, results, stats: engine.stats });
    };
}

class FolderContentSearch {
    constructor(readFile) {
        this.readFile = readFile;
        this.worker = null;
        this.workerUnavailable = false;
        this.fallback = null;
        this.pending = new Map();
        this.handles = new WeakMap();
        this.nextKey = 0;
        this.nextJob = 0;
        this.generation = 0;
        this.stats = {};
    }

    keyFor(handle) {
        if (!this.handles.has(handle)) this.handles.set(handle, ++this.nextKey);
        return this.handles.get(handle);
    }

    ensureWorker() {
        if (this.worker || this.workerUnavailable) return;
        let url;
        try {
            // Blob workers also work when index.html is opened via file:///.
            const source = `(${runFolderContentSearchWorker.toString()})(${createFolderContentSearchEngine.toString()}, ${this.readFile.toString()});`;
            url = URL.createObjectURL(new Blob([source], { type: 'text/javascript' }));
            this.worker = new Worker(url);
            this.worker.onmessage = ({ data }) => {
                const pending = this.pending.get(data.id);
                if (!pending) return;
                this.pending.delete(data.id);
                this.stats = data.stats;
                pending.resolve(data.results);
            };
            this.worker.onerror = event => {
                event.preventDefault();
                this.disableWorker();
            };
        } catch (error) { this.disableWorker(); }
        finally { if (url) URL.revokeObjectURL(url); }
    }

    disableWorker() {
        if (this.worker) this.worker.terminate();
        this.worker = null;
        this.workerUnavailable = true;
        for (const job of this.pending.values()) job.reject(new Error('Search worker unavailable'));
        this.pending.clear();
    }

    cancel() {
        this.generation++;
        for (const job of this.pending.values()) job.resolve(null);
        this.pending.clear();
        if (this.worker) this.worker.postMessage({ type: 'cancel', generation: this.generation });
    }

    clear() {
        this.cancel();
        if (this.worker) this.worker.postMessage({ type: 'clear', generation: this.generation });
        if (this.fallback) this.fallback.clear();
        this.handles = new WeakMap();
        this.stats = {};
    }

    async searchBatch(entries, query, isCurrent) {
        const generation = this.generation;
        const current = () => generation === this.generation && isCurrent();
        if (!current()) return null;
        this.ensureWorker();
        if (this.worker) {
            const id = ++this.nextJob;
            try {
                return await new Promise((resolve, reject) => {
                    this.pending.set(id, { resolve, reject });
                    this.worker.postMessage({ type: 'search', id, generation, entries, query });
                });
            } catch (error) {
                this.pending.delete(id);
                this.disableWorker();
            }
        }
        if (!current()) return null;
        if (!this.fallback) this.fallback = createFolderContentSearchEngine(this.readFile);
        const results = await this.fallback.searchBatch(entries, query, current);
        this.stats = { ...this.fallback.stats };
        return results;
    }
}
