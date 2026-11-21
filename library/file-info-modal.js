/* Read metadata on demand; closing the dialog cancels folder traversal. */
(() => {
    const dialog = document.getElementById('fileInfoDialog');
    const element = id => document.getElementById(`fileInfo${id}`);
    let current = null;

    const describeContents = (files, folders) =>
        `${files.toLocaleString()} ${files === 1 ? 'file' : 'files'}, ${folders.toLocaleString()} ${folders === 1 ? 'folder' : 'folders'}`;
    const describeSize = bytes => bytes < 1024 ? FileInfo.formatBytes(bytes)
        : `${FileInfo.formatBytes(bytes)} (${bytes.toLocaleString()} bytes)`;

    function showFolderStats(stats) {
        element('Size').textContent = describeSize(stats.size);
        element('Direct').textContent = describeContents(stats.directFiles, stats.directFolders);
        element('Total').textContent = describeContents(stats.files, stats.folders);
    }

    function close() {
        current?.controller.abort();
        dialog.close();
    }

    element('Close').addEventListener('click', close);
    element('Done').addEventListener('click', close);
    dialog.addEventListener('cancel', event => {
        event.preventDefault();
        close();
    });
    dialog.addEventListener('close', () => {
        // A queued close event from an earlier opening must not cancel a new one.
        if (dialog.open) return;
        const previous = current;
        current = null;
        previous?.controller.abort();
        if (previous?.focusTarget?.isConnected) {
            if (!previous.focusTarget.hasAttribute('tabindex')) previous.focusTarget.tabIndex = -1;
            previous.focusTarget.focus({ preventScroll: true });
        }
    });
    dialog.addEventListener('click', event => {
        const bounds = dialog.getBoundingClientRect();
        if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right
            || event.clientY < bounds.top || event.clientY > bounds.bottom)) close();
    });
    // Keep tree shortcuts (Delete, F2, Enter, etc.) inside this modal.
    dialog.addEventListener('keydown', event => event.stopPropagation());
    element('CopyPath').addEventListener('click', async () => {
        const request = current;
        if (!request) return;
        try {
            await navigator.clipboard.writeText(request.path);
            if (current === request && dialog.open) element('CopyPath').textContent = 'Copied';
        } catch {
            if (current !== request || !dialog.open) return;
            const selection = window.getSelection();
            const range = document.createRange();
            range.selectNodeContents(element('Path'));
            selection.removeAllRanges();
            selection.addRange(range);
            element('CopyPath').textContent = 'Press Ctrl+C to copy';
        }
    });

    window.FileInfoDialog = {
        async open({ handle, path, focusTarget }) {
            current?.controller.abort();
            const request = { controller: new AbortController(), path, focusTarget };
            current = request;
            const isFolder = handle.kind === 'directory';
            element('Title').textContent = isFolder ? 'Folder info' : 'File info';
            element('Name').textContent = handle.name;
            element('Path').textContent = path;
            element('Type').textContent = isFolder ? 'Folder' : 'File';
            element('SizeLabel').textContent = isFolder ? 'Total size' : 'Size';
            element('Size').textContent = 'Calculating…';
            element('Modified').textContent = 'Loading…';
            element('Direct').textContent = 'Counting…';
            element('Total').textContent = 'Counting…';
            element('ModifiedRow').hidden = isFolder;
            element('DirectRow').hidden = !isFolder;
            element('TotalRow').hidden = !isFolder;
            element('CopyPath').textContent = 'Copy path';
            element('Status').textContent = isFolder ? 'Scanning folder, including subfolders…' : 'Reading file details…';
            dialog.setAttribute('aria-busy', 'true');
            if (!dialog.open) dialog.showModal();
            element('Close').focus();
            const isCurrent = () => current === request && dialog.open && !request.controller.signal.aborted;
            try {
                const info = await FileInfo.inspect(handle, {
                    signal: request.controller.signal,
                    onProgress: stats => { if (isCurrent()) showFolderStats(stats); }
                });
                if (!isCurrent()) return;
                if (isFolder) {
                    showFolderStats(info);
                    element('Status').textContent = info.unreadable
                        ? `Partial results: ${info.unreadable.toLocaleString()} ${info.unreadable === 1 ? 'item could' : 'items could'} not be read. Counts and size may be incomplete.`
                        : 'Totals include all files in subfolders.';
                } else {
                    const extension = handle.name.includes('.') ? handle.name.split('.').pop() : '';
                    element('Type').textContent = info.type || (extension ? `${extension.toUpperCase()} file` : 'File');
                    element('Size').textContent = describeSize(info.size);
                    element('Modified').textContent = new Date(info.lastModified).toLocaleString();
                    element('Status').textContent = '';
                }
            } catch (error) {
                if (!isCurrent()) return;
                element('Size').textContent = 'Unavailable';
                element('Modified').textContent = 'Unavailable';
                element('Direct').textContent = 'Unavailable';
                element('Total').textContent = 'Unavailable';
                element('Status').textContent = error.name === 'NotAllowedError'
                    ? 'Access denied. Reopen the workspace folder and try again.'
                    : 'Could not read this item. It may have been moved, deleted, or become unavailable.';
            } finally {
                if (current === request) dialog.setAttribute('aria-busy', 'false');
            }
        }
    };
})();
