/* Fill missing Ace indent guides without changing document whitespace. */
function installIndentGuides(editor) {
    const renderer = editor.renderer;
    let session = editor.session;
    let cachedRuns = [];

    function invalidate() {
        cachedRuns = [];
    }

    function indentation(line, tabSize) {
        let column = 0;
        for (const character of line) {
            if (character === '\t') column += tabSize - column % tabSize;
            else if (character === ' ') column++;
            else break;
        }
        return column;
    }

    function render() {
        // Ace 1.41 reuses these cells when scrolling. Remove our decorations
        // before inspecting them so edited/recycled rows cannot retain guides.
        const layer = renderer.$textLayer;
        layer.element.querySelectorAll('.rte-indent-guide').forEach(node => node.remove());
        if (!editor.getOption('displayIndentGuides')) return;

        const tabSize = session.getTabSize();
        const width = tabSize * renderer.characterWidth;
        const visibleRuns = [];
        for (const cell of layer.$lines.cells) {
            const row = cell.row;
            const text = session.getLine(row);
            let columns = indentation(text, tabSize);

            if (/^[\t ]*$/.test(text)) {
                if (session.getFoldLine(row)) continue;
                let run = visibleRuns.find(item => row >= item.start && row <= item.end)
                    || cachedRuns.find(item => row >= item.start && row <= item.end);
                if (!run) {
                    let before = row - 1;
                    let after = row + 1;
                    while (before >= 0 && /^[\t ]*$/.test(session.getLine(before))) before--;
                    while (after < session.getLength() && /^[\t ]*$/.test(session.getLine(after))) after++;
                    // Only bridge indentation shared by both surrounding code lines.
                    // Leading/trailing empty lines therefore do not acquire guides.
                    run = {
                        start: before + 1,
                        end: after - 1,
                        columns: before >= 0 && after < session.getLength()
                            ? Math.min(indentation(session.getLine(before), tabSize), indentation(session.getLine(after), tabSize))
                            : 0
                    };
                }
                if (!visibleRuns.includes(run)) visibleRuns.push(run);
                columns = Math.max(columns, run.columns);
            }

            // Ace's native renderer stops at the first tab/space transition.
            // Supplement its guides using visual columns across the full prefix.
            const wrapped = session.getUseWrapMode();
            const lines = wrapped ? cell.element.children : [cell.element];
            const splits = wrapped ? session.getRowSplitData(row) : null;
            for (let part = 0; part < lines.length; part++) {
                const line = lines[part];
                let lineColumns = columns;
                if (splits && splits.length) {
                    lineColumns = Math.min(columns, part === 0
                        ? indentation(text.slice(0, splits[0]), tabSize)
                        : splits.indent);
                }
                // Keep the final indent clear, matching Ace's native placement.
                const count = Math.max(0, Math.floor((lineColumns - 1) / tabSize));
                const existing = line.querySelectorAll('.ace_indent-guide').length;
                for (let index = existing; index < count; index++) {
                    const guide = document.createElement('span');
                    guide.className = 'ace_indent-guide rte-indent-guide';
                    guide.setAttribute('aria-hidden', 'true');
                    guide.style.cssText = `position:absolute;pointer-events:none;top:0;left:${index * width}px;width:${width}px;height:${renderer.lineHeight}px;`;
                    line.appendChild(guide);
                }
            }
        }
        cachedRuns = visibleRuns;
    }

    function attachSession() {
        session.off('change', invalidate);
        session.off('changeTabSize', invalidate);
        session = editor.session;
        session.on('change', invalidate);
        session.on('changeTabSize', invalidate);
        invalidate();
    }

    attachSession();
    renderer.on('afterRender', render);
    editor.on('changeSession', attachSession);
    editor.on('destroy', () => {
        renderer.off('afterRender', render);
        editor.off('changeSession', attachSession);
        session.off('change', invalidate);
        session.off('changeTabSize', invalidate);
    });
}
