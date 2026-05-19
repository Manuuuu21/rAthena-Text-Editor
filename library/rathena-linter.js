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
            
            // 1. Tab-based Segmentation
            const tabCount = (beforeBrace.match(/\t/g) || []).length;
            const components = beforeBrace.split('\t');
            
            const locPart = (components[0] || "").trim();
            const isFloating = locPart === '-';
            const isFunction = locPart.toLowerCase() === 'function';
            const requiredTabs = isFunction ? 2 : 3;

            // 2. Structural Validation
            // Check for missing TABs - rAthena requires TABs as primary separators
            if (tabCount < requiredTabs) {
                annotations.push({
                    row: index,
                    column: 0,
                    text: `rAthena Error: NPC header requires literal TABs as separators. Found ${tabCount} TABs, expected at least ${requiredTabs}. E.g: map,x,y,dir<TAB>script<TAB>NPC name<TAB>spriteID,{`,
                    type: "error"
                });
                break; 
            }

            // 3. Component Integrity (Check for illegal spaces in non-name fields)
            // Part 0: Location/Function (Example: map,x,y,dir) - No spaces allowed
            if (components[0].trim().includes(' ')) {
                annotations.push({
                    row: index, column: 0,
                    text: "rAthena Error: Spaces are not allowed in the location field (Part 1). Use a TAB to separate it from the NPC type.",
                    type: "error"
                });
                break;
            }

            // Part 1: Type (Example: script, shop, warp) - No spaces allowed
            if (components[1] && components[1].trim().includes(' ')) {
                annotations.push({
                    row: index, column: 0,
                    text: "rAthena Error: Spaces are not allowed in the NPC type field (Part 2). Use a TAB to separate it from the NPC name.",
                    type: "error"
                });
                break;
            }
            
            // Note: components[2] is the NPC Name, which IS allowed to have spaces.

            // Part 3: Sprite ID (or Market Info) - No spaces allowed
            if (!isFunction && components[3] && components[3].trim().includes(' ')) {
                annotations.push({
                    row: index, column: 0,
                    text: "rAthena Error: Spaces are not allowed in the Sprite ID field (Part 4).",
                    type: "error"
                });
                break;
            }

            // Map components for the remainder of the validation
            const validationComponents = components.map(p => p.trim().replace(/,$/, '').trim());

            // 4. Granular Structure Check (inherited logic)
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