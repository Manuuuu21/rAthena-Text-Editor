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
    // Example: prontera,150,150,4	script	Healer	123,{
    const headerRegex = /^([^ \t]+)\s+(script|function|shop|cashshop|itemshop|pointshop|warp|boss_warp|duplicate)\s+([^,{]+)/i;

    lines.forEach((line, index) => {
        const trimmedLine = line.trim();
        
        // Skip comments and empty lines
        if (trimmedLine.startsWith('//') || trimmedLine === '') return;

        // Pattern to identify potential rAthena headers (Map,X,Y,Dir or Floating -)
        // We look for script/shop/warp/etc keywords
        const keywords = '(script|shop|cashshop|itemshop|pointshop|warp|boss_warp|duplicate|function)';
        const headerKeywordRegex = new RegExp(`\\s+${keywords}\\s+`, 'i');

        if (line.match(/^(.*),(.*),(.*),(.*)/) || line.startsWith('-')) {
            if (headerKeywordRegex.test(line)) {
                // Check if the line contains spaces (rAthena headers MUST use TABs)
                // Specifically check if there are spaces between the primary components
                let beforeBrace = line.split('{')[0];
                // Remove trailing comma if it exists before {
                const headerPartsRaw = beforeBrace.trim().replace(/,$/, '');
                const componentsByTab = headerPartsRaw.split('\t').filter(part => part.trim().length > 0);
                
                // 1. Check for TAB usage
                if (beforeBrace.includes(' ')) {
                    // If there are spaces instead of tabs separating the main parts
                    annotations.push({
                        row: index,
                        column: 0,
                        text: "rAthena Error: NPC header must use literal TABs as separators, not spaces.",
                        type: "error"
                    });
                } 
                // 2. Check for structure (at least Location, Type, Name, and Sprite bits should be there for NPCs)
                else {
                    const type = componentsByTab[1] ? componentsByTab[1].toLowerCase() : "";
                    const isFunction = type === "function" || (componentsByTab[0] && componentsByTab[0].toLowerCase() === "function");
                    
                    // Most NPCs (script, shop, warp, etc.) require 4 components
                    // Functions usually require 3
                    const requiredParts = isFunction ? 3 : 4;

                    if (componentsByTab.length < requiredParts) {
                        annotations.push({
                            row: index,
                            column: 0,
                            text: `rAthena Error: Incomplete NPC header structure. Expected ${requiredParts} components separated by TABs.`,
                            type: "error"
                        });
                    }
                }
            }
        }
    });

    session.setAnnotations(annotations);
}

// Export for use in index.html
window.runRathenaLinter = runRathenaLinter;
