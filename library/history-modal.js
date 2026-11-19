/* Present the same per-tab savepoints used by the chat's change actions. */
window.historyModal = (() => {
    const overlay = document.getElementById('historyModal');
    const list = document.getElementById('historyList');
    const closeButton = document.getElementById('historyCloseBtn');
    let returnFocus = null;
    let diffTrigger = null;
    let isOpen = false;

    function close(restoreFocus = true) {
        if (!isOpen) return;
        isOpen = false;
        overlay.style.display = 'none';
        overlay.inert = false;
        diffTrigger = null;
        if (restoreFocus && returnFocus?.isConnected) returnFocus.focus();
    }

    function resume() {
        if (!isOpen) return;
        overlay.inert = false;
        if (diffTrigger?.isConnected) diffTrigger.focus();
        else closeButton.focus();
        diffTrigger = null;
    }

    function open() {
        const tab = tabManager.activeTab;
        if (!tab) return;
        returnFocus = document.activeElement;
        list.replaceChildren();
        const history = tab.diffHistory || [];
        document.getElementById('historyFileName').textContent =
            `${tab.name} · ${history.length} recorded change${history.length === 1 ? '' : 's'} · Newest first`;

        if (!history.length) {
            const empty = document.createElement('p');
            empty.className = 'history-empty';
            empty.textContent = 'No recorded changes for this file yet. Saved edits, AI changes, and loaded external changes will appear here.';
            list.append(empty);
        }

        for (let index = history.length - 1; index >= 0; index--) {
            const entry = history[index];
            const card = document.createElement('article');
            card.className = 'history-entry';
            const position = history.length - 1 - index;
            if (position < 2) {
                const heading = document.createElement('h3');
                heading.className = 'history-section-title';
                heading.textContent = position === 0 ? 'Latest Edited' : 'Recent Edited';
                list.append(heading);
            }
            const date = entry.timestamp ? new Date(entry.timestamp) : null;
            const time = document.createElement('p');
            time.textContent = 'Time Edited: ' + (date && !Number.isNaN(date.getTime()) ? date.toLocaleString() : 'Unknown time');
            const stats = document.createElement('p');
            const added = document.createElement('span');
            added.className = 'history-additions';
            added.textContent = `+${entry.additions || 0}`;
            const removed = document.createElement('span');
            removed.className = 'history-removals';
            removed.textContent = `-${entry.removals || 0}`;
            stats.append(added, ' ', removed, ' lines changed');

            const actions = document.createElement('div');
            actions.className = 'diff-actions';
            const view = document.createElement('button');
            view.type = 'button';
            view.className = 'diff-btn view';
            view.textContent = 'View Changes';
            view.addEventListener('click', () => {
                if (!tabManager.tabs.includes(tab) || tab.diffHistory[index] !== entry) return;
                openDiff(index, tab.id);
                diffTrigger = view;
                overlay.inert = true;
                document.querySelector('#diffModal .close-btn').focus();
            });
            const restore = document.createElement('button');
            restore.type = 'button';
            restore.className = 'diff-btn restore';
            restore.textContent = 'Restore Code to this point';
            restore.addEventListener('click', () => {
                if (!tabManager.tabs.includes(tab) || tab.diffHistory[index] !== entry) return;
                restoreFromDiff(index, 'new', tab.id);
            });
            actions.append(view, restore);
            card.append(time, stats, actions);
            list.append(card);
        }

        isOpen = true;
        overlay.inert = false;
        overlay.style.display = 'flex';
        list.scrollTop = 0;
        closeButton.focus();
    }

    closeButton.addEventListener('click', () => close());
    overlay.addEventListener('click', event => {
        if (event.target === overlay) close();
    });
    document.addEventListener('keydown', event => {
        if (!isOpen) return;
        const diff = document.getElementById('diffModal');
        const showingDiff = diff.style.display === 'flex';
        if (event.key === 'Escape') {
            event.preventDefault();
            event.stopImmediatePropagation();
            if (showingDiff) closeDiffModal();
            else close();
        } else if (event.key === 'Tab') {
            const container = showingDiff ? diff : overlay;
            const focusable = [...container.querySelectorAll('button:not(:disabled), textarea, [tabindex="0"]')]
                .filter(element => element.getClientRects().length);
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (first && (!container.contains(document.activeElement) ||
                (event.shiftKey ? document.activeElement === first : document.activeElement === last))) {
                event.preventDefault();
                (event.shiftKey ? last : first).focus();
            }
        }
    }, true);

    return { open, close, resume };
})();
