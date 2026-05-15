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

    for (let index = 0; index < lines.length; index++) {
        const line = lines[index];
        const trimmedLine = line.trim();
        
        // Skip comments and empty lines
        if (trimmedLine.startsWith('//') || trimmedLine === '') continue;

        // Potential Header detection
        // rAthena headers usually start with Map,X,Y,Dir OR Floating - OR function
        const locPattern = /^([^ \t\n\r]*?,[^ \t\n\r]*?,[^ \t\n\r]*?,[^ \t\n\r]*|function|-)/i;
        const isHeaderCandidate = locPattern.test(line);

        if (isHeaderCandidate) {
            const beforeBrace = line.split('{')[0];
            
            // 1. Check for SPACE usage instead of TABs
            const hasSpaces = beforeBrace.trim().includes(' ');
            if (hasSpaces) {
                annotations.push({
                    row: index,
                    column: 0,
                    text: "rAthena Error: NPC header must use literal TABs as separators, not spaces. E.g: map,x,y,dir<TAB>script<TAB>NPC name<TAB>spriteID,{",
                    type: "error"
                });
                break; // Show 1 error only
            }

            // 2. Structural Validation
            const tabCount = (beforeBrace.match(/\t/g) || []).length;
            const rawComponents = beforeBrace.split('\t');
            const componentsByTab = rawComponents.map(p => p.trim().replace(/,$/, '').trim());
            
            // Intelligence: Try space-split if tab-split feels empty
            let validationComponents = componentsByTab;
            if (tabCount === 0 && hasSpaces) {
                validationComponents = beforeBrace.split(/\s+/).map(p => p.trim().replace(/,$/, '').trim());
            }

            const locPart = validationComponents[0] || "";
            const isFloating = locPart === '-';
            const isFunction = locPart.toLowerCase() === 'function';

            // Check for missing TABs (if no spaces, this is the primary error)
            const requiredTabs = isFunction ? 2 : 3;
            if (tabCount < requiredTabs && !hasSpaces) {
                annotations.push({
                    row: index,
                    column: 0,
                    text: "rAthena Error: Missing TAB separators in header. Expected TABs between location, type, name, and spriteID. E.g: map,x,y,dir<TAB>script<TAB>NPC name<TAB>spriteID,{",
                    type: "error"
                });
                break; // Show 1 error only
            }

            // 3. Granular Structure Check
            // Location (map,x,y,dir)
            if (!isFloating && !isFunction) {
                const locSubParts = locPart.split(',');
                if (locSubParts.length < 4) {
                    annotations.push({ row: index, column: 0, text: "rAthena Error: missing 'faceDirection'. Expected: map,x,y,dir", type: "error" });
                } else {
                    if (locSubParts[0] === "") annotations.push({ row: index, column: 0, text: "rAthena Error: missing 'map' name. Expected: map,x,y,dir", type: "error" });
                    else if (locSubParts[1] === "") annotations.push({ row: index, column: 0, text: "rAthena Error: missing 'x' coordinate. Expected: map,x,y,dir", type: "error" });
                    else if (locSubParts[2] === "") annotations.push({ row: index, column: 0, text: "rAthena Error: missing 'y' coordinate. Expected: map,x,y,dir", type: "error" });
                    else if (locSubParts[3] === "") annotations.push({ row: index, column: 0, text: "rAthena Error: missing 'faceDirection'. Expected: map,x,y,dir", type: "error" });
                    else if (locSubParts.length > 4) annotations.push({ row: index, column: 0, text: "rAthena Error: Extra components in location field. Expected: map,x,y,dir", type: "error" });
                }
            }

            if (annotations.length > 0) break;

            // Type Check (script, shop, etc)
            if (validationComponents.length < 2 || validationComponents[1] === "") {
                annotations.push({ row: index, column: 0, text: "rAthena Error: missing NPC type (e.g., script, shop, warp).", type: "error" });
            }

            if (annotations.length > 0) break;

            // Name Check
            if (validationComponents.length < 3 || validationComponents[2] === "") {
                annotations.push({ row: index, column: 0, text: "rAthena Error: missing NPC name.", type: "error" });
            }

            if (annotations.length > 0) break;

            // Sprite/Ending Check
            if (!isFunction) {
                if (validationComponents.length < 4 || validationComponents[3] === "") {
                    const errorText = isFloating ? "rAthena Error: missing floating marker '-'." : "rAthena Error: missing Sprite ID.";
                    annotations.push({ row: index, column: 0, text: errorText, type: "error" });
                }
            }

            if (annotations.length > 0) break;
        }
    }

    session.setAnnotations(annotations);
}

// Export for use in index.html
window.runRathenaLinter = runRathenaLinter;