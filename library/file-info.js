/* Read file metadata without loading file contents or changing the folder tree. */
(function (root, factory) {
    const api = factory();
    if (typeof module === 'object' && module.exports) module.exports = api;
    else root.FileInfo = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
    'use strict';

    function checkCancelled(signal) {
        if (signal && signal.aborted) {
            throw signal.reason || new DOMException('Inspection cancelled.', 'AbortError');
        }
    }

    // File-system reads cannot be cancelled, but closing Info should stop waiting
    // immediately and must not start another read when the pending one finishes.
    function waitForRead(read, signal) {
        if (!signal) return read;
        return new Promise((resolve, reject) => {
            const abort = () => reject(signal.reason || new DOMException('Inspection cancelled.', 'AbortError'));
            signal.addEventListener('abort', abort, { once: true });
            Promise.resolve(read).then(resolve, reject).finally(() => signal.removeEventListener('abort', abort));
            if (signal.aborted) abort();
        });
    }

    function closeIterator(iterator) {
        if (!iterator || typeof iterator.return !== 'function') return;
        try { Promise.resolve(iterator.return()).catch(() => {}); } catch (_) {}
    }

    async function inspect(handle, { signal, onProgress } = {}) {
        checkCancelled(signal);
        if (!handle || !['file', 'directory'].includes(handle.kind)) {
            throw new TypeError('A file or folder handle is required.');
        }
        if (handle.kind === 'file') {
            const file = await waitForRead(handle.getFile(), signal);
            checkCancelled(signal);
            return { kind: 'file', name: handle.name, size: file.size, lastModified: file.lastModified, type: file.type };
        }

        const result = {
            kind: 'directory', name: handle.name, size: 0,
            files: 0, folders: 0, directFiles: 0, directFolders: 0, unreadable: 0
        };
        const pending = [{ handle, isRoot: true }];
        let lastProgress = Date.now();
        let lastYield = Date.now();
        let sinceYield = 0;
        const report = () => { if (typeof onProgress === 'function') onProgress({ ...result }); };
        const checkpoint = async () => {
            checkCancelled(signal);
            if (++sinceYield >= 32 || Date.now() - lastYield >= 16) {
                await waitForRead(new Promise(resolve => setTimeout(resolve, 0)), signal);
                checkCancelled(signal);
                sinceYield = 0;
                lastYield = Date.now();
            }
            if (Date.now() - lastProgress >= 100) {
                report();
                lastProgress = Date.now();
            }
        };
        report();

        // Use a stack so deep folder trees do not consume the JavaScript call stack.
        while (pending.length) {
            checkCancelled(signal);
            const directory = pending.pop();
            let iterator;
            let seen = 0;
            try {
                iterator = directory.handle.entries();
            } catch (error) {
                checkCancelled(signal);
                if (directory.isRoot) throw error;
                result.unreadable++;
                continue;
            }
            try {
                while (true) {
                    checkCancelled(signal);
                    let entry;
                    try {
                        entry = await waitForRead(iterator.next(), signal);
                        checkCancelled(signal);
                    } catch (error) {
                        checkCancelled(signal);
                        if (directory.isRoot && seen === 0) throw error;
                        result.unreadable++;
                        break;
                    }
                    if (entry.done) break;
                    seen++;
                    const child = entry.value[1];
                    if (child.kind === 'directory') {
                        result.folders++;
                        if (directory.isRoot) result.directFolders++;
                        pending.push({ handle: child, isRoot: false });
                    } else if (child.kind === 'file') {
                        result.files++;
                        if (directory.isRoot) result.directFiles++;
                        try {
                            const file = await waitForRead(child.getFile(), signal);
                            checkCancelled(signal);
                            result.size += file.size;
                        } catch (_) {
                            checkCancelled(signal);
                            result.unreadable++;
                        }
                    }
                    await checkpoint();
                }
            } finally {
                closeIterator(iterator);
            }
        }
        checkCancelled(signal);
        report();
        return result;
    }

    function formatBytes(size) {
        if (!Number.isFinite(size) || size < 0) return 'Unknown';
        if (size < 1024) return `${size} ${size === 1 ? 'byte' : 'bytes'}`;
        const units = ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB'];
        let value = size / 1024;
        let unit = 0;
        while (value >= 1024 && unit < units.length - 1) { value /= 1024; unit++; }
        return `${Number(value.toFixed(2))} ${units[unit]}`;
    }

    return { inspect, formatBytes };
});
