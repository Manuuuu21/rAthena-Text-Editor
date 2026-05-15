/**
 * rAthena Script Linter
 * Provides live syntax checking for common rAthena scripting errors.
 */

function runRathenaLinter(editor) {
    const session = editor.getSession();
    const code = session.getValue();
    const lines = code.split('\n');
    const annotations = [];

    // Regex to detect NPC/Function/Shop/Warp headers
    // Example: prontera,150,150,4  script  Healer  123,{
    const headerRegex = /^([^ \t]+)\s+(script|function|shop|cashshop|itemshop|pointshop|warp|boss_warp|duplicate)\s+([^,{]+)/i;

    lines.forEach((line, index) => {
        const trimmedLine = line.trim();
        
        // Skip comments and empty lines
        if (trimmedLine.startsWith('//') || trimmedLine === '') return;

        // Potential Header detection
        // rAthena headers usually start with Map,X,Y,Dir OR Floating - OR function
        const locPattern = /^([^ \t\n\r,]+,\d+,\d+,\d+|function|-)/i;
        const isHeaderCandidate = locPattern.test(line);

        if (isHeaderCandidate) {
            const beforeBrace = line.split('{')[0];
            
            // 1. Check for SPACE usage instead of TABs
            if (beforeBrace.includes(' ')) {
                annotations.push({
                    row: index,
                    column: 0,
                    text: "rAthena Error: NPC header must use literal TABs as separators, not spaces.",
                    type: "error"
                });
                return; 
            }

            // 2. Check if TABs exist at all (Squashed header detection)
            const tabCount = (beforeBrace.match(/\t/g) || []).length;
            
            const rawComponents = beforeBrace.split('\t');
            const componentsByTab = rawComponents.map(p => p.trim().replace(/,$/, '').trim());
            const locPart = componentsByTab[0] || "";
            const isFloating = locPart === '-';
            const isFunction = locPart.toLowerCase() === 'function';

            // Check for squashed text (Missing TABs between fields)
            const requiredTabs = isFunction ? 2 : 3;
            if (tabCount < requiredTabs) {
                annotations.push({
                    row: index,
                    column: 0,
                    text: "rAthena Error: Missing TAB separators in header (possibly squashed). Expected TABs between location, type, name, and sprite.",
                    type: "error"
                });
                return;
            }

            // 3. Granular Structure Check
            // Location
            if (!isFloating && !isFunction) {
                const locSubParts = locPart.split(',');
                if (locSubParts.length < 4) {
                    annotations.push({ row: index, column: 0, text: "rAthena Error: incomplete location field. Expected: map,x,y,dir", type: "error" });
                } else {
                    if (!locSubParts[0]) annotations.push({ row: index, column: 0, text: "rAthena Error: missing 'map' name.", type: "error" });
                    if (!locSubParts[1]) annotations.push({ row: index, column: 0, text: "rAthena Error: missing 'x' coordinate.", type: "error" });
                    if (!locSubParts[2]) annotations.push({ row: index, column: 0, text: "rAthena Error: missing 'y' coordinate.", type: "error" });
                    if (!locSubParts[3]) annotations.push({ row: index, column: 0, text: "rAthena Error: missing 'faceDirection'.", type: "error" });
                }
            }

            // Type Check
            if (!componentsByTab[1]) {
                annotations.push({ row: index, column: 0, text: "rAthena Error: missing NPC type (e.g., script, shop, warp).", type: "error" });
            }

            // Name Check
            if (!componentsByTab[2]) {
                annotations.push({ row: index, column: 0, text: "rAthena Error: missing NPC name.", type: "error" });
            }

            // Sprite/Ending Check
            if (!isFunction) {
                if (!componentsByTab[3]) {
                    const errorText = isFloating ? "rAthena Error: missing floating marker '-'." : "rAthena Error: missing Sprite ID.";
                    annotations.push({ row: index, column: 0, text: errorText, type: "error" });
                }
            }
        }
    });

    session.setAnnotations(annotations);
}

// Export for use in index.html
window.runRathenaLinter = runRathenaLinter;
