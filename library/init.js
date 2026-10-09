let currentTheme = "ace/theme/monokai";
document.documentElement.setAttribute('data-theme', 'dark');
document.documentElement.classList.add('dark');

function normalizeCode(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/^\uFEFF/, '').replace(/\r\n|\r/g, '\n').trimEnd();
}

/* ==========================================================================
   Ragnarok Online Mojibake & Character Encoding Engine (Windows-1252 / EUC-KR / UTF-8)
   Enables lossless display, decoding, editing, and saving of .lua files with Mojibake
   ========================================================================== */
const CP1252_SPECIAL_BYTES = {
  0x20AC: 0x80, 0x201A: 0x82, 0x0192: 0x83, 0x201E: 0x84, 0x2026: 0x85, 0x2020: 0x86, 0x2021: 0x87,
  0x02C6: 0x88, 0x2030: 0x89, 0x0160: 0x8A, 0x2039: 0x8B, 0x0152: 0x8C, 0x017D: 0x8E, 0x2018: 0x91,
  0x2019: 0x92, 0x201C: 0x93, 0x201D: 0x94, 0x2022: 0x95, 0x2013: 0x96, 0x2014: 0x97, 0x02DC: 0x98,
  0x2122: 0x99, 0x0161: 0x9A, 0x203A: 0x9B, 0x0153: 0x9C, 0x017E: 0x9E, 0x0178: 0x9F
};

function encodeWindows1252(str) {
  if (typeof str !== 'string') return new Uint8Array(0);
  const bytes = new Uint8Array(str.length);
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i);
    if (code <= 0x7F) {
      bytes[i] = code;
    } else if (code >= 0xA0 && code <= 0xFF) {
      bytes[i] = code;
    } else if (CP1252_SPECIAL_BYTES[code] !== undefined) {
      bytes[i] = CP1252_SPECIAL_BYTES[code];
    } else {
      bytes[i] = 0x3F; // fallback '?'
    }
  }
  return bytes;
}

let cp949HangulMap = null;
function getCP949HangulMap() {
  if (cp949HangulMap) return cp949HangulMap;
  cp949HangulMap = new Map();
  try {
    const decoder = new TextDecoder("euc-kr");
    for (let b1 = 0x81; b1 <= 0xFE; b1++) {
      const row = new Uint8Array(2);
      row[0] = b1;
      for (let b2 = 0x41; b2 <= 0xFE; b2++) {
        row[1] = b2;
        const str = decoder.decode(row);
        if (str && str !== "\uFFFD" && str.length === 1) {
          if (!cp949HangulMap.has(str)) {
            cp949HangulMap.set(str, [b1, b2]);
          }
        }
      }
    }
  } catch (e) {
    console.warn("CP949 map init error:", e);
  }
  return cp949HangulMap;
}

function encodeEucKr(str) {
  if (typeof str !== 'string') return new Uint8Array(0);
  const map = getCP949HangulMap();
  const result = [];
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    const code = str.charCodeAt(i);
    if (code <= 0x7F) {
      result.push(code);
    } else if (map && map.has(char)) {
      const b = map.get(char);
      result.push(b[0], b[1]);
    } else if (code >= 0xA0 && code <= 0xFF) {
      result.push(code);
    } else if (CP1252_SPECIAL_BYTES[code] !== undefined) {
      result.push(CP1252_SPECIAL_BYTES[code]);
    } else {
      result.push(0x3F);
    }
  }
  return new Uint8Array(result);
}

function mojibakeToKorean(str) {
  if (typeof str !== 'string' || !str) return str;
  try {
    const bytes = encodeWindows1252(str);
    const decoder = new TextDecoder("euc-kr");
    return decoder.decode(bytes);
  } catch (e) {
    return str;
  }
}

function koreanToMojibake(str) {
  if (typeof str !== 'string' || !str) return str;
  try {
    const bytes = encodeEucKr(str);
    const decoder = new TextDecoder("windows-1252");
    return decoder.decode(bytes);
  } catch (e) {
    return str;
  }
}

function isMojibakeString(str) {
  if (typeof str !== 'string' || str.length < 2) return false;
  let nonAscii = 0;
  for (let i = 0; i < str.length; i++) {
    const c = str.charCodeAt(i);
    if (c >= 0x80 && c <= 0xFF) {
      nonAscii++;
    }
  }
  return nonAscii >= 2;
}

function getEncodingLabel(enc) {
  if (!enc) return "Windows-1252 (Mojibake)";
  const lower = enc.toLowerCase();
  if (lower.includes("1252") || lower.includes("mojibake") || lower.includes("ansi")) {
    return "Windows-1252 (Mojibake)";
  }
  if (lower.includes("euc") || lower.includes("kr") || lower.includes("korean") || lower.includes("949")) {
    return "EUC-KR (Korean)";
  }
  if (lower.includes("utf")) {
    return "UTF-8";
  }
  return "Windows-1252 (Mojibake)";
}

async function readFileWithEncoding(file, forcedEncoding = null) {
  const arrayBuffer = await file.arrayBuffer();
  const uint8 = new Uint8Array(arrayBuffer);

  if (forcedEncoding) {
    try {
      const decoder = new TextDecoder(forcedEncoding);
      return {
        text: decoder.decode(uint8),
        encoding: forcedEncoding,
        rawBytes: uint8
      };
    } catch (e) {
      console.warn("Failed with forced encoding " + forcedEncoding, e);
    }
  }

  // 1. Check for explicit UTF-8 BOM
  if (uint8.length >= 3 && uint8[0] === 0xEF && uint8[1] === 0xBB && uint8[2] === 0xBF) {
    const decoder = new TextDecoder('utf-8');
    return {
      text: decoder.decode(uint8.subarray(3)),
      encoding: 'utf-8',
      rawBytes: uint8,
      hasBom: true
    };
  }

  const fileName = (file && file.name) ? file.name.toLowerCase() : "";
  const isLua = fileName.endsWith(".lua");

  // For .lua files, default to Windows-1252 (Mojibake)
  if (isLua) {
    try {
      const win1252 = new TextDecoder('windows-1252');
      const text = win1252.decode(uint8);
      return {
        text: text,
        encoding: 'windows-1252',
        rawBytes: uint8,
        hasBom: false
      };
    } catch (e) {
      const latin = new TextDecoder('iso-8859-1');
      return {
        text: latin.decode(uint8),
        encoding: 'windows-1252',
        rawBytes: uint8,
        hasBom: false
      };
    }
  }

  // For other non-lua files, check if clean UTF-8
  try {
    const strictUtf8 = new TextDecoder('utf-8', { fatal: true });
    const text = strictUtf8.decode(uint8);
    return {
      text: text,
      encoding: 'utf-8',
      rawBytes: uint8,
      hasBom: false
    };
  } catch (utf8Err) {
    // Non-UTF-8 bytes: decode with windows-1252 (Mojibake)
    try {
      const win1252 = new TextDecoder('windows-1252');
      const text = win1252.decode(uint8);
      return {
        text: text,
        encoding: 'windows-1252',
        rawBytes: uint8,
        hasBom: false
      };
    } catch (e) {
      const latin = new TextDecoder('iso-8859-1');
      return {
        text: latin.decode(uint8),
        encoding: 'windows-1252',
        rawBytes: uint8,
        hasBom: false
      };
    }
  }
}

function updateStatusBarEncoding(tab) {
  const statusBarElem = document.getElementById("statusBar");
  if (!statusBarElem) return;
  let encBadge = statusBarElem.querySelector(".status-bar-encoding");
  if (!encBadge) {
    encBadge = document.createElement("div");
    encBadge.className = "status-bar-encoding";
    encBadge.title = "File Character Encoding - Click to manage / convert";
    encBadge.onclick = () => openMojibakeModal();
    statusBarElem.appendChild(encBadge);
  }
  const enc = (tab && tab.encoding) ? tab.encoding : "windows-1252";
  encBadge.innerHTML = `<span>${getEncodingLabel(enc)}</span> ▾`;
}

function openMojibakeModal() {
  const modal = document.getElementById("mojibakeModal");
  if (!modal) return;
  updateMojibakeModalUI();
  modal.style.display = "flex";
}

function closeMojibakeModal() {
  const modal = document.getElementById("mojibakeModal");
  if (modal) modal.style.display = "none";
}

function updateMojibakeModalUI() {
  const activeTab = (typeof tabManager !== 'undefined') ? tabManager.activeTab : null;
  const nameEl = document.getElementById("mojibakeActiveFileName");
  const badgeEl = document.getElementById("mojibakeCurrentEncodingBadge");
  if (nameEl && activeTab) {
    nameEl.textContent = activeTab.name || "Untitled";
  }
  if (badgeEl && activeTab) {
    badgeEl.textContent = getEncodingLabel(activeTab.encoding);
  }
}

function handleMojibakeLiveInput(val) {
  const koreanOutput = document.getElementById("koreanLiveInput");
  if (koreanOutput) {
    koreanOutput.value = mojibakeToKorean(val);
  }
}

function handleKoreanLiveInput(val) {
  const mojibakeOutput = document.getElementById("mojibakeLiveInput");
  if (mojibakeOutput) {
    mojibakeOutput.value = koreanToMojibake(val);
  }
}


function toggleTheme() {
  const root = document.documentElement;
  const isLight = currentTheme === "ace/theme/github_light_default";

  currentTheme = isLight ? "ace/theme/monokai" : "ace/theme/github_light_default";
  
    if (isLight) {
    // Switching to DARK
    root.setAttribute('data-theme', 'dark');
    root.classList.add('dark');
    root.style.setProperty('--tabBarBg', '#2e2e2e');
    root.style.setProperty('--toolbarBg', '#3e3e3e');
    root.style.setProperty('--textColor', '#ddd');
    root.style.setProperty('--activeTabColor', '#fff');
    root.style.setProperty('--tabCloseColor', '#bbb');
    root.style.setProperty('--darkmodeColor', '#686868');
    root.style.setProperty('--tooltipBg', '#1e1e1e');
    root.style.setProperty('--tooltipColor', '#d4d4d4');
    root.style.setProperty('--tooltipBorder', '#454545');
    root.style.setProperty('--tooltipHeaderColor', '#66d9ef');
    root.style.setProperty('--tooltipDivider', '#444');
    root.style.setProperty('--diffAddedBg', '#1e3a1e');
    root.style.setProperty('--diffAddedColor', '#a3d9a3');
    root.style.setProperty('--diffAddedHighlightBg', 'rgba(46, 160, 67, 0.5)');
    root.style.setProperty('--diffRemovedBg', '#4a1e1e');
    root.style.setProperty('--diffRemovedColor', '#e6a3a3');
    root.style.setProperty('--diffRemovedHighlightBg', '#7a3232');
    root.style.setProperty('--scrollbarTrack', '#252525');
    root.style.setProperty('--scrollbarThumb', '#666');
    root.style.setProperty('--scrollbarThumbHover', '#555');
    root.style.setProperty('--btnBg', '#444');
    root.style.setProperty('--btnText', '#fff');
    root.style.setProperty('--closeBtnColor', '#bbb');
    root.style.setProperty('--searchBg', '#202124');
    root.style.setProperty('--searchColor', '#e8eaed');
    root.style.setProperty('--searchBorder', '#3c4043');
    root.style.setProperty('--searchFieldBg', '#2d3035');
    root.style.setProperty('--searchFieldBorder', '#5f6368');
    root.style.setProperty('--searchFieldColor', '#f1f3f4');
    root.style.setProperty('--searchBtnBg', '#3c4043');
    root.style.setProperty('--searchBtnHoverBg', '#4f5358');
    root.style.setProperty('--searchBtnColor', '#e8eaed');
    root.style.setProperty('--searchBtnBorder', '#5f6368');
    root.style.setProperty('--searchCounterColor', '#9aa0a6');
    root.style.setProperty('--searchShadow', '0 8px 24px rgba(0, 0, 0, 0.55)');
    
    // rAthena Syntax Highlighting for Dark Mode
    root.style.setProperty('--syntaxString', '#e6db74');
    root.style.setProperty('--syntaxComment', '#75715e');
    root.style.setProperty('--syntaxNumber', '#ae81ff');
    root.style.setProperty('--syntaxKeyword', '#f92672');
    root.style.setProperty('--syntaxFunction', '#66d9ef');
    root.style.setProperty('--syntaxVariable', '#a6e22e');
    root.style.setProperty('--syntaxConstant', '#fd971f');
    root.style.setProperty('--minimapBg', '#1e1e1e');
    root.style.setProperty('--minimapBorder', '#2d2d2d');
    root.style.setProperty('--minimapSliderBg', 'rgba(255, 255, 255, 0.08)');
    root.style.setProperty('--minimapSliderHoverBg', 'rgba(255, 255, 255, 0.15)');
    root.style.setProperty('--minimapSliderActiveBg', 'rgba(255, 255, 255, 0.22)');
    root.style.setProperty('--minimapSliderBorder', 'rgba(255, 255, 255, 0.25)');
    root.style.setProperty('--sidebarResizerBg', '#252525');
    root.style.setProperty('--sidebarResizerBorder', 'rgba(255, 255, 255, 0.08)');
    root.style.setProperty('--sidebarResizerHoverBg', '#3b82f6');
  } else {
    // Switching to LIGHT
    root.setAttribute('data-theme', 'light');
    root.classList.remove('dark');
    root.style.setProperty('--tabBarBg', '#d8ccc6');
    root.style.setProperty('--toolbarBg', '#f8f1ef');
    root.style.setProperty('--textColor', '#333');
    root.style.setProperty('--activeTabColor', '#000');
    root.style.setProperty('--tabCloseColor', '#777');
    root.style.setProperty('--darkmodeColor', '#d9d9d9');
    root.style.setProperty('--tooltipBg', '#fff');
    root.style.setProperty('--tooltipColor', '#333');
    root.style.setProperty('--tooltipBorder', '#ccc');
    root.style.setProperty('--tooltipHeaderColor', '#0056b3');
    root.style.setProperty('--tooltipDivider', '#eee');
    root.style.setProperty('--diffAddedBg', '#e6ffec');
    root.style.setProperty('--diffAddedColor', '#155724');
    root.style.setProperty('--diffAddedHighlightBg', '#68ffa0');
    root.style.setProperty('--diffRemovedBg', '#ffebe9');
    root.style.setProperty('--diffRemovedColor', '#721c24');
    root.style.setProperty('--diffRemovedHighlightBg', '#ffc5c2');
    root.style.setProperty('--scrollbarTrack', '#f1f1f1');
    root.style.setProperty('--scrollbarThumb', '#888');
    root.style.setProperty('--scrollbarThumbHover', '#555');
    root.style.setProperty('--searchBg', '#f8f1ef');
    root.style.setProperty('--searchColor', '#24292f');
    root.style.setProperty('--searchBorder', '#d0d7de');
    root.style.setProperty('--searchFieldBg', '#ffffff');
    root.style.setProperty('--searchFieldBorder', '#d0d7de');
    root.style.setProperty('--searchFieldColor', '#24292f');
    root.style.setProperty('--searchBtnBg', '#eaeef2');
    root.style.setProperty('--searchBtnHoverBg', '#d0d7de');
    root.style.setProperty('--searchBtnColor', '#24292f');
    root.style.setProperty('--searchBtnBorder', '#d0d7de');
    root.style.setProperty('--searchCounterColor', '#57606a');
    root.style.setProperty('--searchShadow', '0 8px 24px rgba(0, 0, 0, 0.12)');
    
    // rAthena Syntax Highlighting for Light Mode
    root.style.setProperty('--syntaxString', '#032f62');
    root.style.setProperty('--syntaxComment', '#6a737d');
    root.style.setProperty('--syntaxNumber', '#005cc5');
    root.style.setProperty('--syntaxKeyword', '#d73a49');
    root.style.setProperty('--syntaxFunction', '#6f42c1');
    root.style.setProperty('--syntaxVariable', '#e36209');
    root.style.setProperty('--syntaxConstant', '#b07d00');
    root.style.setProperty('--minimapBg', '#f6f8fa');
    root.style.setProperty('--minimapBorder', '#e1e4e8');
    root.style.setProperty('--minimapSliderBg', 'rgba(0, 0, 0, 0.07)');
    root.style.setProperty('--minimapSliderHoverBg', 'rgba(0, 0, 0, 0.13)');
    root.style.setProperty('--minimapSliderActiveBg', 'rgba(0, 0, 0, 0.18)');
    root.style.setProperty('--minimapSliderBorder', 'rgba(0, 0, 0, 0.22)');
    root.style.setProperty('--sidebarResizerBg', '#d0c4bd');
    root.style.setProperty('--sidebarResizerBorder', 'rgba(0, 0, 0, 0.12)');
    root.style.setProperty('--sidebarResizerHoverBg', '#3b82f6');
  }
  
  tabManager.tabs.forEach(tab => {
    if (tab.editor) {
      tab.editor.setTheme(currentTheme);
      if (tab.editor.tokenTooltip && tab.editor.tokenTooltip.activeEmbeddedEditors) {
        tab.editor.tokenTooltip.activeEmbeddedEditors.forEach(embeddedEditor => {
          try {
            embeddedEditor.setTheme(currentTheme);
          } catch (e) {
            console.warn("Failed to update theme of embedded editor inside tooltip:", e);
          }
        });
      }
    }
    if (tab.minimap) {
      tab.minimap.colorCache = {};
      tab.minimap.update(true);
    }
  });
  if (diffOldEditor) diffOldEditor.setTheme(currentTheme);
  if (diffNewEditor) diffNewEditor.setTheme(currentTheme);
}

/* Diff Modal handling */
function closeDiffModal() {
    document.getElementById('diffModal').style.display = 'none';
}

function toggleThinking(element) {
    const thinkingDiv = element.nextElementSibling;
    if (thinkingDiv && (thinkingDiv.classList.contains('ai_thinking') || thinkingDiv.tagName.toLowerCase() === 'div')) {
        const arrowSpan = element.querySelector('.toggle-arrow');
        if (thinkingDiv.style.display === 'none') {
            thinkingDiv.style.display = 'block';
            if (arrowSpan) {
                arrowSpan.style.transform = 'rotate(90deg)';
            }
        } else {
            thinkingDiv.style.display = 'none';
            if (arrowSpan) {
                arrowSpan.style.transform = 'rotate(0deg)';
            }
        }
    }
}

let diffOldEditor = null;
let diffNewEditor = null;
let currentDiffIndex = -1;
let currentDiffTab = null;

function setupDiffEditor(id, readOnly = true) {
    const editor = ace.edit(id);
    editor.setTheme(currentTheme);
    editor.session.setMode("ace/mode/rathena");
    editor.setReadOnly(readOnly);
    editor.setShowPrintMargin(false);
    editor.setOption("selectionStyle", "text");
    editor.renderer.setScrollMargin(0, 0, 0, 50);
    return editor;
}

function openDiff(index, tabId) {
    let tab = tabManager.activeTab;
    if (tabId !== undefined) {
        tab = tabManager.tabs.find(t => t.id === tabId) || tab;
    }
    if (!tab) return;
    
    currentDiffIndex = index;
    currentDiffTab = tab;

    const {old: oldCode, new: newCode, timestamp} = tab.diffHistory[index];
    
    // Set timestamp
    document.getElementById('diffTimestamp').innerText = timestamp ? timestamp.toLocaleString() : "";
    
    if (!diffOldEditor) {
        diffOldEditor = setupDiffEditor('diffOld');
    }
    if (!diffNewEditor) {
        diffNewEditor = setupDiffEditor('diffNew');
    }

    const name = (tab.name || "").toLowerCase();
    let diffMode = "ace/mode/rathena";
    if (name.endsWith(".yml") || name.endsWith(".yaml")) {
        diffMode = "ace/mode/rathena_yaml";
    } else if (name.endsWith(".conf")) {
        diffMode = "ace/mode/rathena_conf";
    } else if (name.endsWith(".cpp") || name.endsWith(".c") || name.endsWith(".hpp") || name.endsWith(".h") || name.endsWith(".cc") || name.endsWith(".cxx") || name.endsWith(".c++") || name.endsWith(".h++") || name.endsWith(".inl") || name.endsWith(".inc")) {
        diffMode = "ace/mode/c_cpp";
    } else if (name.endsWith(".lua")) {
        diffMode = "ace/mode/lua";
    }
    diffOldEditor.session.setMode(diffMode);
    diffNewEditor.session.setMode(diffMode);
    
    diffOldEditor.setValue(oldCode, -1);
    diffNewEditor.setValue(newCode, -1);
    
    const oldSession = diffOldEditor.getSession();
    const newSession = diffNewEditor.getSession();
    
    const oldMarkers = oldSession.getMarkers();
    for (let m in oldMarkers) {
      if (oldMarkers[m].clazz === 'ace_removed' || oldMarkers[m].clazz === 'ace_removed_word') {
          oldSession.removeMarker(oldMarkers[m].id);
      }
    }
    const newMarkers = newSession.getMarkers();
    for (let m in newMarkers) {
      if (newMarkers[m].clazz === 'ace_added' || newMarkers[m].clazz === 'ace_added_word') {
          newSession.removeMarker(newMarkers[m].id);
      }
    }

    const diff = Diff.diffLines(oldCode, newCode);
    let additions = 0;
    let removals = 0;
    diff.forEach(part => {
        if (part.added) additions += part.count;
        if (part.removed) removals += part.count;
    });
    document.getElementById('diffStats').innerHTML =
        `<span style="color: green">+${additions}</span> <span style="color: red">-${removals}</span> lines changed`;
    
    let firstAddedLine = -1;
    let firstRemovedLine = -1;
    let oldLine = 0;
    let newLine = 0;
    const Range = ace.require('ace/range').Range;

    const oldLines = oldCode.split(/\r?\n/);
    const newLines = newCode.split(/\r?\n/);

    for (let i = 0; i < diff.length; i++) {
        const part = diff[i];
        if (part.added) {
            if (firstAddedLine === -1) firstAddedLine = newLine;
            const range = new Range(newLine, 0, newLine + part.count - 1, Infinity);
            newSession.addMarker(range, "ace_added", "fullLine");
            newLine += part.count;
        } else if (part.removed) {
            if (firstRemovedLine === -1) firstRemovedLine = oldLine;
            const range = new Range(oldLine, 0, oldLine + part.count - 1, Infinity);
            oldSession.addMarker(range, "ace_removed", "fullLine");

            // Look ahead to see if the next part is an addition
            // so we can perform precise character-level highlights on the matching lines
            const nextPart = diff[i + 1];
            if (nextPart && nextPart.added) {
                const matchCount = Math.min(part.count, nextPart.count);
                for (let j = 0; j < matchCount; j++) {
                    const lOld = oldLine + j;
                    const lNew = newLine + j;
                    const lineOldText = oldLines[lOld] || "";
                    const lineNewText = newLines[lNew] || "";

                    if (typeof Diff !== 'undefined' && Diff.diffWordsWithSpace) {
                        try {
                            const wordDiff = Diff.diffWordsWithSpace(lineOldText, lineNewText);
                            let charOld = 0;
                            let charNew = 0;
                            wordDiff.forEach(wp => {
                                if (wp.added) {
                                    const wRange = new Range(lNew, charNew, lNew, charNew + wp.value.length);
                                    newSession.addMarker(wRange, "ace_added_word", "text");
                                    charNew += wp.value.length;
                                } else if (wp.removed) {
                                    const wRange = new Range(lOld, charOld, lOld, charOld + wp.value.length);
                                    oldSession.addMarker(wRange, "ace_removed_word", "text");
                                    charOld += wp.value.length;
                                } else {
                                    charOld += wp.value.length;
                                    charNew += wp.value.length;
                                }
                            });
                        } catch (e) {
                            console.error("Word-diff failed for matched lines:", e);
                        }
                    }
                }
            }

            oldLine += part.count;
        } else {
            oldLine += part.count;
            newLine += part.count;
        }
    }

    document.getElementById('diffModal').style.display = 'flex';
    
    setTimeout(() => {
        diffOldEditor.resize();
        diffNewEditor.resize();
        if (firstAddedLine !== -1) diffNewEditor.scrollToLine(firstAddedLine, true, true, function () {});
        if (firstRemovedLine !== -1) diffOldEditor.scrollToLine(firstRemovedLine, true, true, function () {});
        
        // Ensure scroll positions inside the Diff Modal and its editors are reset to the left
        diffOldEditor.getSession().setScrollLeft(0);
        diffNewEditor.getSession().setScrollLeft(0);
        const splitContainer = document.querySelector('.diff-split-container');
        if (splitContainer) splitContainer.scrollLeft = 0;
        const modalBox = document.querySelector('.diff-modal-box');
        if (modalBox) modalBox.scrollLeft = 0;
    }, 100);
}

function restoreFromDiff(index, restoreTo = 'new', tabId) {
    if (typeof index !== 'number') {
        index = currentDiffIndex;
    }
    
    let tab = currentDiffTab || tabManager.activeTab;
    if (tabId !== undefined) {
        tab = tabManager.tabs.find(t => t.id === tabId) || tab;
    }
    
    if (!tab) return;
    
    if (index === -1 || index === undefined || index === null) {
        showSnackbar("No savepoint selected.");
        return;
    }
    
    const {old: oldCode, new: newCode, timestamp} = tab.diffHistory[index];
    tab.saveCurrentCodeToHistory();
    const codeToRestore = (restoreTo === 'new') ? newCode : oldCode;
    
    tab.editor.setValue(codeToRestore, -1);
    tab.editor.session.setUndoManager(new ace.UndoManager()); 
    tab.editor.focus();
    showSnackbar(`Restored to savepoint (${restoreTo}).`);
    
    const timeString = timestamp ? timestamp.toLocaleString() : "Unknown time";
    tab.addMessage(`🏴 Restored code from the Time: ${timeString}`, 'restored');
    
    closeDiffModal();
}

function openApiModal() {
  document.getElementById('modalApi').style.display = 'flex';
}

function closeApiModal() {
  document.getElementById('modalApi').style.display = 'none';
}

function openModal() {
  const toggleMinimapElem = document.getElementById('toggleMinimap');
  if (toggleMinimapElem && typeof minimapEnabled !== 'undefined') {
    toggleMinimapElem.checked = minimapEnabled;
  }
  const toggleLocalElem = document.getElementById('toggleLocalCompletion');
  if (toggleLocalElem && typeof localCompletionEnabled !== 'undefined') {
    toggleLocalElem.checked = localCompletionEnabled;
  }
  const toggleReadOnlyElem = document.getElementById('toggleReadOnly');
  if (toggleReadOnlyElem && tabManager.activeTab) {
    toggleReadOnlyElem.checked = tabManager.activeTab.editor.getReadOnly();
  }
  const toggleTooltipElem = document.getElementById('toggleTooltip');
  if (toggleTooltipElem && typeof documentationTooltipEnabled !== 'undefined') {
    toggleTooltipElem.checked = documentationTooltipEnabled;
  }
  const toggleHideChatElem = document.getElementById('toggleHideChatBot');
  if (toggleHideChatElem && typeof hideChatBotContainer !== 'undefined') {
    toggleHideChatElem.checked = hideChatBotContainer;
  }
  const toggleAutoSaveElem = document.getElementById('toggleAutoSave');
  if (toggleAutoSaveElem && typeof autoSaveEnabled !== 'undefined') {
    toggleAutoSaveElem.checked = autoSaveEnabled;
  }
  const toggleTreeDblElem = document.getElementById('toggleTreeDoubleClick');
  if (toggleTreeDblElem && typeof treeDoubleClickOpen !== 'undefined') {
    toggleTreeDblElem.checked = treeDoubleClickOpen;
  }
  document.getElementById('modalOverlay').style.display = 'flex';
}

function closeModal() {
  document.getElementById('modalOverlay').style.display = 'none';
}

function openClearChatModal() {
    document.getElementById('clearChatModal').style.display = 'flex';
}

function closeClearChatModal() {
    document.getElementById('clearChatModal').style.display = 'none';
}

function openCloseTabConfirmModal(tabId, tabName, isUntitled) {
    const modal = document.getElementById('closeTabConfirmModal');
    const header = document.getElementById('closeTabConfirmHeader');
    const message = document.getElementById('closeTabConfirmMessage');
    const yesBtn = document.getElementById('closeTabYesBtn');
    const noBtn = document.getElementById('closeTabNoBtn');

    if (isUntitled) {
        message.textContent = "New file has been modified, save changes?";
    } else {
        message.textContent = `${tabName} has been modified, save changes?`;
    }

    yesBtn.onclick = async () => {
        closeCloseTabConfirmModal();
        const tab = tabManager.tabs.find(t => t.id === tabId);
        if (tab) {
            try {
                const saved = await tab.saveToFile();
                if (saved) {
                    tabManager.forceCloseTab(tabId);
                }
            } catch (err) {
                console.error("Save failed or canceled:", err);
            }
        }
    };

    noBtn.onclick = () => {
        closeCloseTabConfirmModal();
        tabManager.forceCloseTab(tabId);
    };

    modal.style.display = 'flex';
}

function closeCloseTabConfirmModal() {
    document.getElementById('closeTabConfirmModal').style.display = 'none';
}

let activeConflictTab = null;
let activeExternalContent = "";
let activeExternalModified = 0;

function openExternalConflictModal(tab, diskContent, diskModified) {
    closeExternalConflictModal();
    if (!tab) return;
    activeConflictTab = tab;
    activeExternalContent = diskContent;
    activeExternalModified = diskModified || Date.now();

    const modal = document.getElementById('externalConflictModal');
    if (!modal) return;
    const header = document.getElementById('externalConflictHeader');
    if (header) header.textContent = `⚠️ External File Change: "${tab.name}"`;
    const msg = document.getElementById('externalConflictMessage');
    if (msg) {
        msg.innerHTML = `<strong>"${tab.name}"</strong> was modified externally on disk (e.g. by Notepad or another tool).<br/><br/>You also have unsaved edits in this editor. What would you like to do?`;
    }

    const keepBtn = document.getElementById('conflictKeepBtn');
    if (keepBtn) {
        keepBtn.onclick = () => {
            if (activeConflictTab) {
                showSnackbar(`Kept editor edits for "${activeConflictTab.name}".`);
            }
            closeExternalConflictModal();
        };
    }

    const reloadBtn = document.getElementById('conflictReloadBtn');
    if (reloadBtn) {
        reloadBtn.onclick = () => {
            if (activeConflictTab && activeExternalContent !== undefined) {
                const target = activeConflictTab;
                const content = activeExternalContent;
                const mod = activeExternalModified;
                if (target.diskSaveTimeout) {
                    clearTimeout(target.diskSaveTimeout);
                    target.diskSaveTimeout = null;
                }
                const oldCode = target.editor.getValue();
                const cursor = target.editor.getCursorPosition();
                const scrollTop = target.editor.session.getScrollTop();
                const scrollLeft = target.editor.session.getScrollLeft();
                target.lastSavedCode = content;
                target.lastModified = mod;
                target.editor.setValue(content, -1);
                target.editor.session.setUndoManager(new ace.UndoManager());
                try {
                    target.editor.moveCursorToPosition(cursor);
                    target.editor.session.setScrollTop(scrollTop);
                    target.editor.session.setScrollLeft(scrollLeft);
                } catch (e) {}
                target.updateTabIcon();
                target.updateTitle();
                target.saveCurrentCodeToHistory();
                target.saveToDB();
                target.recordChange(oldCode, content, new Date(mod || Date.now()));
                showSnackbar(`"${target.name}" reloaded from disk.`);
            }
            closeExternalConflictModal();
        };
    }

    const diffBtn = document.getElementById('conflictDiffBtn');
    if (diffBtn) {
        diffBtn.onclick = () => {
            if (activeConflictTab && activeExternalContent !== undefined) {
                const target = activeConflictTab;
                const oldCode = target.editor.getValue();
                const diffIndex = target.recordChange(oldCode, activeExternalContent, new Date(activeExternalModified || Date.now()));
                closeExternalConflictModal();
                if (diffIndex !== null) {
                    openDiff(diffIndex, target.id);
                }
            } else {
                closeExternalConflictModal();
            }
        };
    }

    modal.style.display = 'flex';
}

function closeExternalConflictModal() {
    const modal = document.getElementById('externalConflictModal');
    if (modal) modal.style.display = 'none';
    activeConflictTab = null;
    activeExternalContent = "";
    activeExternalModified = 0;
}

window.onclick = function(event) {
  if (event.target.id == 'modalOverlay') closeModal();
  if (event.target.id == 'clearChatModal') closeClearChatModal();
  if (event.target.id == 'closeTabConfirmModal') closeCloseTabConfirmModal();
  if (event.target.id == 'externalConflictModal') closeExternalConflictModal();
  if (event.target.id == 'deleteItemConfirmModal' && typeof folderTreeManager !== 'undefined') folderTreeManager.closeDeleteModal();
  if (typeof folderTreeManager !== 'undefined' && folderTreeManager.closeContextMenu && (!event.target.closest || !event.target.closest('#treeContextMenu'))) {
    folderTreeManager.closeContextMenu();
  }
  if (typeof folderTreeManager !== 'undefined' && folderTreeManager.clearTreeSelection) {
    if (!event.target.closest || (!event.target.closest('#folderTreeContainer') && !event.target.closest('#treeContextMenu') && !event.target.closest('.modal') && !event.target.closest('.modal-overlay'))) {
      folderTreeManager.clearTreeSelection();
    }
  }
}

let minimapEnabled = localStorage.getItem("minimapEnabled") !== "false";
let localCompletionEnabled = localStorage.getItem("localCompletionEnabled") !== "false";
let documentationTooltipEnabled = localStorage.getItem("documentationTooltipEnabled") === "true";
let hideChatBotContainer = localStorage.getItem("hideChatBotContainer") === "true";
let autoSaveEnabled = localStorage.getItem("autoSaveEnabled") === "true";
let treeDoubleClickOpen = localStorage.getItem("treeDoubleClickOpen") === "true";

const toggleAutoSaveElem = document.getElementById("toggleAutoSave");
if (toggleAutoSaveElem) {
  toggleAutoSaveElem.checked = autoSaveEnabled;
  toggleAutoSaveElem.addEventListener("change", function () {
    autoSaveEnabled = this.checked;
    localStorage.setItem("autoSaveEnabled", autoSaveEnabled);
    if (autoSaveEnabled) {
      showSnackbar("Autosave in 1.5 seconds enabled.");
    } else {
      showSnackbar("Autosave disabled.");
    }
  });
}

const toggleTreeDblElem = document.getElementById("toggleTreeDoubleClick");
if (toggleTreeDblElem) {
  toggleTreeDblElem.checked = treeDoubleClickOpen;
  toggleTreeDblElem.addEventListener("change", function () {
    treeDoubleClickOpen = this.checked;
    localStorage.setItem("treeDoubleClickOpen", treeDoubleClickOpen);
    if (treeDoubleClickOpen) {
      showSnackbar("Double click to open file enabled.");
    } else {
      showSnackbar("Double click to open file disabled.");
    }
  });
}

const toggleMinimapElem = document.getElementById("toggleMinimap");
if (toggleMinimapElem) {
  toggleMinimapElem.checked = minimapEnabled;
  toggleMinimapElem.addEventListener("change", function () {
    minimapEnabled = this.checked;
    localStorage.setItem("minimapEnabled", minimapEnabled);
    tabManager.tabs.forEach(tab => {
      if (tab.setMinimapVisible) {
        tab.setMinimapVisible(minimapEnabled);
      }
    });
  });
}

const toggleLocalElem = document.getElementById("toggleLocalCompletion");
if (toggleLocalElem) {
  toggleLocalElem.checked = localCompletionEnabled;
  toggleLocalElem.addEventListener("change", function () {
    localCompletionEnabled = this.checked;
    localStorage.setItem("localCompletionEnabled", localCompletionEnabled);
    tabManager.tabs.forEach(tab => {
      if (tab.editor) {
        tab.editor.setOption("enableBasicAutocompletion", localCompletionEnabled);
        tab.editor.setOption("enableLiveAutocompletion", localCompletionEnabled);
      }
    });
  });
}

document.getElementById("toggleReadOnly").addEventListener("change", function () {
  if (tabManager.activeTab) {
    tabManager.activeTab.editor.setReadOnly(this.checked);
  }
});

document.getElementById("toggleTooltip").checked = documentationTooltipEnabled;
document.getElementById("toggleTooltip").addEventListener("change", function () {
  documentationTooltipEnabled = this.checked;
  localStorage.setItem("documentationTooltipEnabled", documentationTooltipEnabled);
});

const toggleHideChatElem = document.getElementById("toggleHideChatBot");
if (toggleHideChatElem) {
  toggleHideChatElem.checked = hideChatBotContainer;
  toggleHideChatElem.addEventListener("change", function () {
    setChatBotContainerHidden(this.checked);
  });
}

function setChatBotContainerHidden(hidden) {
  hideChatBotContainer = hidden;
  localStorage.setItem("hideChatBotContainer", hidden);

  const toggleHideElem = document.getElementById("toggleHideChatBot");
  if (toggleHideElem) {
    toggleHideElem.checked = hidden;
  }

  tabManager.tabs.forEach(tab => {
    if (tab.setChatBotHidden) {
      tab.setChatBotHidden(hidden);
    }
  });
}

function toggleDisplayChatBotContainer() {
  const activeTab = tabManager.activeTab;
  if (!activeTab) return;

  const chatBot = activeTab.elements.chatBotContainer;
  const isCurrentlyHidden = window.getComputedStyle(chatBot).display === 'none';

  setChatBotContainerHidden(!isCurrentlyHidden);

  if (isCurrentlyHidden) {
    setTimeout(() => {
      const messages = activeTab.elements.chatMessages;
      if (messages) messages.scrollTop = messages.scrollHeight;
    }, 100);
  }
}

function ensureChatBotVisible() {
  const activeTab = (typeof tabManager !== 'undefined') ? tabManager.activeTab : null;
  let isCurrentlyHidden = false;

  if (activeTab && activeTab.elements && activeTab.elements.chatBotContainer) {
    const chatBot = activeTab.elements.chatBotContainer;
    isCurrentlyHidden = (chatBot.style.display === 'none') || (window.getComputedStyle(chatBot).display === 'none');
  } else if (typeof hideChatBotContainer !== 'undefined') {
    isCurrentlyHidden = !!hideChatBotContainer;
  }

  if (isCurrentlyHidden) {
    setChatBotContainerHidden(false);
    if (activeTab && activeTab.elements && activeTab.elements.chatMessages) {
      setTimeout(() => {
        activeTab.elements.chatMessages.scrollTop = activeTab.elements.chatMessages.scrollHeight;
      }, 100);
    }
  }
}

function showSnackbar(message) {
    const activeTab = tabManager.activeTab;
    if (!activeTab) return;
    
    const container = activeTab.elements.editorWrapper || activeTab.elements.editor;
    let snackbar = container.querySelector(".snackbar");
    if (!snackbar) {
        snackbar = document.createElement("div");
        snackbar.className = "snackbar";
        snackbar.id = "snackbar";
        container.appendChild(snackbar);
    }
    
    snackbar.textContent = message;
    snackbar.classList.add("show");

    if (activeTab.snackbarTimeout) clearTimeout(activeTab.snackbarTimeout);
    activeTab.snackbarTimeout = setTimeout(() => {
        snackbar.classList.remove("show");
    }, 3000);
}

class Minimap {
    constructor(tab, container, canvas, slider) {
        this.tab = tab;
        this.container = container;
        this.canvas = canvas;
        this.slider = slider;
        this.ctx = canvas.getContext('2d');
        this.isDragging = false;
        this.animFrame = null;
        this.lineHeight = 3.0;
        this.charWidth = 1.35;
        this.minimapScrollTop = 0;
        this.colorCache = {};
        this.probeSpan = null;

        this.initEvents();
    }

    initEvents() {
        const editor = this.tab.editor;
        
        // Listen to scroll events on Ace editor - redraw on scroll to keep canvas in exact lockstep
        editor.session.on('changeScrollTop', () => this.update(true));
        editor.session.on('changeScrollLeft', () => this.update(false));
        
        // Listen to document changes (code typed, loaded, or undone)
        editor.on('change', () => this.scheduleUpdate());
        editor.session.on('changeMode', () => {
            this.colorCache = {};
            this.update(true);
        });
        editor.renderer.on('afterRender', () => this.update(true));

        // Listen to search and selection changes so minimap search highlights update in real time
        editor.session.on('changeBackMarker', () => this.scheduleUpdate());
        editor.session.on('changeFrontMarker', () => this.scheduleUpdate());
        editor.selection.on('changeCursor', () => this.scheduleUpdate());
        editor.selection.on('changeSelection', () => {
            updateSearchMatchState();
            this.scheduleUpdate();
        });
        editor.on('findSearchBox', () => this.scheduleUpdate());

        const updateSearchMatchState = () => {
            const sb = editor.searchBox;
            const session = editor.session;
            if (!editor.container) return;

            // Clean up any old markers from previous sessions
            if (session && session.$currentSearchMarker) {
                session.removeMarker(session.$currentSearchMarker);
                session.$currentSearchMarker = null;
            }

            if (!sb || !sb.active || !sb.element || sb.element.style.display === 'none') {
                editor.container.classList.remove('ace_searchbox_active');
                editor.container.classList.remove('ace_search_match_selected');
                return;
            }

            editor.container.classList.add('ace_searchbox_active');

            const query = sb.searchInput ? sb.searchInput.value : '';
            if (!query || query.trim() === '') {
                editor.container.classList.remove('ace_search_match_selected');
                return;
            }

            const selRange = editor.getSelectionRange();
            if (selRange && !selRange.isEmpty() && (!selRange.isMultiLine || !selRange.isMultiLine())) {
                const selectedText = session ? session.getTextRange(selRange) : '';
                const isCase = sb.caseSensitiveOption && sb.caseSensitiveOption.checked;
                const matches = isCase ? (selectedText === query) : (selectedText.toLowerCase() === query.toLowerCase());

                let regexMatches = false;
                if (!matches && sb.regExpOption && sb.regExpOption.checked && editor.$search && editor.$search.$options && editor.$search.$options.re) {
                    try {
                        regexMatches = editor.$search.$options.re.test(selectedText);
                    } catch (e) {}
                }

                if (matches || regexMatches) {
                    editor.container.classList.add('ace_search_match_selected');
                } else {
                    editor.container.classList.remove('ace_search_match_selected');
                }
            } else {
                editor.container.classList.remove('ace_search_match_selected');
            }
        };

        // Connect searchBox hooks to manage search state and immediately clear minimap when search is closed
        const connectSearchBoxHooks = () => {
            const sb = editor.searchBox;
            if (sb && !sb._minimapHooked) {
                sb._minimapHooked = true;
                const origHide = sb.hide;
                sb.hide = (...args) => {
                    const res = origHide.apply(sb, args);
                    updateSearchMatchState();
                    this.scheduleUpdate();
                    return res;
                };
                const origShow = sb.show;
                sb.show = (...args) => {
                    const res = origShow.apply(sb, args);
                    updateSearchMatchState();
                    this.scheduleUpdate();
                    return res;
                };
                const origFind = sb.find;
                sb.find = (...args) => {
                    const res = origFind.apply(sb, args);
                    updateSearchMatchState();
                    this.scheduleUpdate();
                    return res;
                };
                const origFindNext = sb.findNext;
                sb.findNext = (...args) => {
                    const res = origFindNext.apply(sb, args);
                    updateSearchMatchState();
                    this.scheduleUpdate();
                    return res;
                };
                const origFindPrev = sb.findPrev;
                sb.findPrev = (...args) => {
                    const res = origFindPrev.apply(sb, args);
                    updateSearchMatchState();
                    this.scheduleUpdate();
                    return res;
                };
                if (sb.searchInput) {
                    sb.searchInput.addEventListener('input', () => {
                        updateSearchMatchState();
                        this.scheduleUpdate();
                    });
                }
            }
        };

        // When mouse clicking or dragging in the code editor, ensure classic mouse selection style and live minimap updates
        if (editor.container && !editor.container._hasSelectionResetHook) {
            editor.container._hasSelectionResetHook = true;
            editor.container.addEventListener('mousedown', () => {
                editor.container.classList.remove('ace_search_match_selected');
            }, true);
            editor.container.addEventListener('mousemove', (e) => {
                if (e.buttons === 1) {
                    this.scheduleUpdate();
                }
            }, true);
        }

        if (editor.searchBox) {
            connectSearchBoxHooks();
        } else if (editor.commands) {
            editor.commands.on('afterExec', (e) => {
                if (e && e.command && (e.command.name === 'find' || e.command.name === 'replace')) {
                    setTimeout(() => {
                        connectSearchBoxHooks();
                        this.scheduleUpdate();
                    }, 50);
                }
            });
        }

        // Click & Drag interaction on Minimap
        this.container.addEventListener('mousedown', (e) => {
            this.handleMouseDown(e);
        });

        // Touch interaction on Minimap
        this.container.addEventListener('touchstart', (e) => {
            this.handleTouchStart(e);
        }, { passive: false });

        // Mouse wheel over minimap - responsive and sensitive navigation
        this.container.addEventListener('wheel', (e) => {
            e.preventDefault();
            const editor = this.tab.editor;
            if (!editor || !editor.session) return;

            const editorLineHeight = (editor.renderer && editor.renderer.lineHeight) || 18;
            let dy = e.deltaY;
            if (e.deltaMode === 1) { // DOM_DELTA_LINE
                dy *= editorLineHeight * 3;
            } else if (e.deltaMode === 2) { // DOM_DELTA_PAGE
                dy *= editor.container.clientHeight || 500;
            } else {
                // DOM_DELTA_PIXEL: responsive 2x sensitivity
                dy *= 2.0;
            }

            const currentScroll = editor.session.getScrollTop();
            const maxScroll = this.getMaxEditorScroll();
            const newScroll = Math.max(0, Math.min(maxScroll, currentScroll + dy));
            editor.session.setScrollTop(newScroll);
        }, { passive: false });

        // Window resize
        window.addEventListener('resize', () => {
            if (this.tab === tabManager.activeTab) {
                this.update(true);
            }
        });
    }

    getMaxEditorScroll() {
        const editor = this.tab.editor;
        if (!editor || !editor.session || !editor.renderer) return 0;

        const renderer = editor.renderer;
        if (renderer.scrollBarV && renderer.scrollBarV.scrollHeight > renderer.scrollBarV.clientHeight && renderer.scrollBarV.clientHeight > 0) {
            return Math.max(0, renderer.scrollBarV.scrollHeight - renderer.scrollBarV.clientHeight);
        }

        const session = editor.session;
        const totalLines = session.getScreenLength ? session.getScreenLength() : session.getLength();
        const editorLineHeight = renderer.lineHeight || 18;
        const scrollerHeight = (renderer.$size && renderer.$size.scrollerHeight) || editor.container.clientHeight || 500;
        const scrollMarginBottom = (renderer.scrollMargin && renderer.scrollMargin.bottom) || 0;

        return Math.max(0, (totalLines * editorLineHeight) - scrollerHeight + scrollMarginBottom);
    }

    getMaxSliderTravel() {
        const height = this.container.clientHeight;
        const editor = this.tab.editor;
        const totalLines = editor && editor.session ? editor.session.getLength() : 0;
        const totalMinimapHeight = totalLines * this.lineHeight;
        const sliderHeight = parseFloat(this.slider.style.height) || 25;

        if (totalMinimapHeight <= height) {
            return Math.max(1, totalMinimapHeight - sliderHeight);
        }
        return Math.max(1, height - sliderHeight);
    }

    scrollToSliderTop(targetSliderTop) {
        const editor = this.tab.editor;
        if (!editor || !editor.session) return;

        const maxTravel = this.getMaxSliderTravel();
        const maxEditorScroll = this.getMaxEditorScroll();
        if (maxEditorScroll <= 0 || maxTravel <= 0) return;

        const clampedTop = Math.max(0, Math.min(maxTravel, targetSliderTop));
        const fraction = clampedTop / maxTravel;
        const targetScroll = Math.round(fraction * maxEditorScroll);

        editor.session.setScrollTop(targetScroll);
    }

    scrollToMinimapY(clickY) {
        const editor = this.tab.editor;
        if (!editor || !editor.session) return;

        const session = editor.session;
        const totalLines = session.getLength();
        if (totalLines === 0) return;

        // Calculate exact document row rendered at clickY on the minimap canvas:
        // y = row * lineHeight - minimapScrollTop  =>  row = (clickY + minimapScrollTop) / lineHeight
        const clickedRow = (clickY + this.minimapScrollTop) / this.lineHeight;
        const targetLine = Math.max(1, Math.min(totalLines, Math.floor(clickedRow) + 1));

        if (typeof editor.scrollToLine === 'function') {
            editor.scrollToLine(targetLine, true, false, function() {});
        } else {
            const editorLineHeight = (editor.renderer && editor.renderer.lineHeight) || 18;
            const scrollerHeight = (editor.renderer && editor.renderer.$size && editor.renderer.$size.scrollerHeight) || editor.container.clientHeight || this.container.clientHeight || 500;
            const visibleRowCount = scrollerHeight / editorLineHeight;
            const targetScrollTop = (targetLine - 1 - visibleRowCount / 2) * editorLineHeight;
            const maxEditorScroll = this.getMaxEditorScroll();
            editor.session.setScrollTop(Math.max(0, Math.min(maxEditorScroll, targetScrollTop)));
        }
    }

    handleMouseDown(e) {
        if (e.button !== 0) return; // Primary mouse button only
        e.preventDefault();

        const editor = this.tab.editor;
        if (!editor || !editor.session || !editor.renderer) return;

        const rect = this.container.getBoundingClientRect();
        const clickY = e.clientY - rect.top;
        const sliderTop = parseFloat(this.slider.style.top) || 0;
        const sliderHeight = parseFloat(this.slider.style.height) || 25;

        const isInsideSlider = (clickY >= sliderTop && clickY <= sliderTop + sliderHeight);
        if (isInsideSlider) {
            this.dragType = 'slider';
            this.grabOffsetY = clickY - sliderTop;
        } else {
            // Clicked outside slider: scroll editor directly to the clicked line/section
            this.dragType = 'track';
            this.lastMouseY = clickY;
            this.scrollToMinimapY(clickY);
        }

        this.isDragging = true;
        this.slider.classList.add('dragging');
        document.body.style.userSelect = 'none';

        const onMouseMove = (moveEvent) => {
            if (!this.isDragging) return;
            moveEvent.preventDefault();

            const currentRect = this.container.getBoundingClientRect();
            const currentMouseY = moveEvent.clientY - currentRect.top;

            if (this.dragType === 'slider') {
                this.scrollToSliderTop(currentMouseY - this.grabOffsetY);
            } else {
                const dy = currentMouseY - this.lastMouseY;
                this.lastMouseY = currentMouseY;
                if (dy !== 0) {
                    const editorLineHeight = (editor.renderer && editor.renderer.lineHeight) || 18;
                    const linesDelta = dy / this.lineHeight;
                    const currentScroll = editor.session.getScrollTop();
                    const maxScroll = this.getMaxEditorScroll();
                    const newScroll = Math.max(0, Math.min(maxScroll, currentScroll + (linesDelta * editorLineHeight)));
                    editor.session.setScrollTop(newScroll);
                }
            }
        };

        const onMouseUp = () => {
            this.isDragging = false;
            this.slider.classList.remove('dragging');
            document.body.style.userSelect = '';
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
    }

    handleTouchStart(e) {
        if (!e.touches || e.touches.length !== 1) return;
        e.preventDefault();

        const editor = this.tab.editor;
        if (!editor || !editor.session) return;

        const touch = e.touches[0];
        const rect = this.container.getBoundingClientRect();
        const clickY = touch.clientY - rect.top;
        const sliderTop = parseFloat(this.slider.style.top) || 0;
        const sliderHeight = parseFloat(this.slider.style.height) || 25;

        const isInsideSlider = (clickY >= sliderTop && clickY <= sliderTop + sliderHeight);
        if (isInsideSlider) {
            this.dragType = 'slider';
            this.grabOffsetY = clickY - sliderTop;
        } else {
            this.dragType = 'track';
            this.lastTouchY = clickY;
            this.scrollToMinimapY(clickY);
        }

        this.isDragging = true;
        this.slider.classList.add('dragging');

        const onTouchMove = (moveEvent) => {
            if (!this.isDragging || !moveEvent.touches || moveEvent.touches.length !== 1) return;
            moveEvent.preventDefault();
            const curTouch = moveEvent.touches[0];
            const currentRect = this.container.getBoundingClientRect();
            const currentMouseY = curTouch.clientY - currentRect.top;

            if (this.dragType === 'slider') {
                this.scrollToSliderTop(currentMouseY - this.grabOffsetY);
            } else {
                const dy = currentMouseY - this.lastTouchY;
                this.lastTouchY = currentMouseY;
                const editorLineHeight = (editor.renderer && editor.renderer.lineHeight) || 18;
                const linesDelta = dy / this.lineHeight;
                const currentScroll = editor.session.getScrollTop();
                const maxScroll = this.getMaxEditorScroll();
                const newScroll = Math.max(0, Math.min(maxScroll, currentScroll + (linesDelta * editorLineHeight)));
                editor.session.setScrollTop(newScroll);
            }
        };

        const onTouchEnd = () => {
            this.isDragging = false;
            this.slider.classList.remove('dragging');
            window.removeEventListener('touchmove', onTouchMove);
            window.removeEventListener('touchend', onTouchEnd);
            window.removeEventListener('touchcancel', onTouchEnd);
        };

        window.addEventListener('touchmove', onTouchMove, { passive: false });
        window.addEventListener('touchend', onTouchEnd);
        window.addEventListener('touchcancel', onTouchEnd);
    }

    scheduleUpdate() {
        if (this.animFrame) cancelAnimationFrame(this.animFrame);
        this.animFrame = requestAnimationFrame(() => this.update(true));
    }

    update(fullRedraw = true) {
        if (!minimapEnabled || this.container.offsetParent === null) return;

        const width = this.container.clientWidth;
        const height = this.container.clientHeight;
        if (width === 0 || height === 0) return;

        const dpr = window.devicePixelRatio || 1;
        const targetW = Math.round(width * dpr);
        const targetH = Math.round(height * dpr);
        if (this.canvas.width !== targetW || this.canvas.height !== targetH) {
            this.canvas.width = targetW;
            this.canvas.height = targetH;
            fullRedraw = true;
        }

        const editor = this.tab.editor;
        if (!editor || !editor.session || !editor.renderer) return;

        const session = editor.session;
        const totalLines = session.getLength();
        if (totalLines === 0) return;

        const editorLineHeight = editor.renderer.lineHeight || 18;
        const scrollerHeight = editor.renderer.$size.scrollerHeight || editor.container.clientHeight || height;
        
        // Exact continuous row position and count visible in Ace editor
        const topScrollRow = session.getScrollTop() / editorLineHeight;
        const visibleRowCount = scrollerHeight / editorLineHeight;

        // Total height of all lines in document on minimap
        const totalMinimapHeight = totalLines * this.lineHeight;

        // Exact height of the slider: each line visible in the editor corresponds to 1 line on the minimap
        const sliderHeight = Math.max(16, Math.min(height, visibleRowCount * this.lineHeight));

        const maxEditorScroll = this.getMaxEditorScroll();
        const currentScrollTop = session.getScrollTop();
        const scrollRatio = maxEditorScroll > 0 ? Math.max(0, Math.min(1, currentScrollTop / maxEditorScroll)) : 0;

        const prevMinimapScrollTop = this.minimapScrollTop;
        let sliderTop = 0;

        if (totalMinimapHeight <= height) {
            // Entire document fits inside minimap container without scrolling
            this.minimapScrollTop = 0;
            sliderTop = topScrollRow * this.lineHeight;
            const maxSliderTop = Math.max(0, Math.min(height - sliderHeight, totalMinimapHeight - sliderHeight));
            sliderTop = Math.max(0, Math.min(maxSliderTop, sliderTop));
        } else {
            // Document is taller than container; minimap content scrolls proportionally
            const maxMinimapScroll = totalMinimapHeight - height;
            this.minimapScrollTop = scrollRatio * maxMinimapScroll;
            // The top of the visible screen on minimap canvas:
            sliderTop = topScrollRow * this.lineHeight - this.minimapScrollTop;
            sliderTop = Math.max(0, Math.min(height - sliderHeight, sliderTop));
        }

        this.slider.style.top = `${sliderTop}px`;
        this.slider.style.height = `${sliderHeight}px`;

        if (fullRedraw || prevMinimapScrollTop !== this.minimapScrollTop) {
            this.draw(width, height, dpr);
        }
    }

    getTokenFallbackColor(type, isLight) {
        if (!type) return isLight ? '#24292e' : '#f8f8f2';

        if (type.includes('comment')) {
            return isLight ? '#6a737d' : '#75715e';
        }
        if (type.includes('string')) {
            return isLight ? '#032f62' : '#e6db74';
        }
        // Parameters & constant library keywords (Orange in Monokai!)
        // Important: check parameter BEFORE variable, since token type is "variable.parameter"
        if (type.includes('parameter')) {
            return isLight ? '#e36209' : '#fd971f';
        }
        if (type.includes('keyword') || type.includes('storage')) {
            return isLight ? '#d73a49' : '#f92672';
        }
        if (type.includes('function') || type.includes('support') || type.includes('entity.name')) {
            return isLight ? '#6f42c1' : '#66d9ef';
        }
        if (type.includes('numeric') || type.includes('constant')) {
            return isLight ? '#005cc5' : '#ae81ff';
        }
        if (type.includes('variable.language')) {
            return isLight ? '#005cc5' : '#a6e22e';
        }
        if (type.includes('variable')) {
            return isLight ? '#e36209' : '#a6e22e';
        }
        if (type.includes('identifier')) {
            return isLight ? '#24292e' : '#f8f8f2';
        }
        if (type.includes('operator') || type.includes('punctuation') || type.includes('paren')) {
            return isLight ? '#586069' : '#f8f8f2';
        }

        return isLight ? '#24292e' : '#f8f8f2';
    }

    getTokenColor(token) {
        const isLight = currentTheme === "ace/theme/github_light_default";
        const defaultColor = isLight ? '#24292e' : '#f8f8f2';
        if (!token) return defaultColor;
        const type = token.type || '';
        if (!type) return defaultColor;

        if (!this.colorCache) this.colorCache = {};
        const cacheKey = `${currentTheme}::${type}`;
        if (this.colorCache[cacheKey]) {
            return this.colorCache[cacheKey];
        }

        let color = null;

        // Plain identifiers, text, parens, and punctuation in Ace render with default editor text color
        if (type === 'identifier' || type === 'text' || type.startsWith('paren.') || type === 'punctuation.operator') {
            color = defaultColor;
            this.colorCache[cacheKey] = color;
            return color;
        }

        try {
            if (!this.probeSpan) {
                this.probeSpan = document.createElement('span');
                this.probeSpan.style.position = 'absolute';
                this.probeSpan.style.left = '-9999px';
                this.probeSpan.style.top = '-9999px';
                this.probeSpan.style.visibility = 'hidden';
                this.probeSpan.style.pointerEvents = 'none';
                this.probeSpan.style.width = '0px';
                this.probeSpan.style.height = '0px';
                this.probeSpan.style.overflow = 'hidden';
                if (this.tab && this.tab.editor && this.tab.editor.container) {
                    this.tab.editor.container.appendChild(this.probeSpan);
                }
            }

            if (this.probeSpan && this.probeSpan.parentElement) {
                // Ace formats token classes by replacing '.' with ' ace_'
                this.probeSpan.className = "ace_" + type.replace(/\./g, " ace_");
                const computed = window.getComputedStyle(this.probeSpan).color;
                if (computed && computed !== 'rgba(0, 0, 0, 0)' && computed !== 'transparent') {
                    const defaultRgb = isLight ? 'rgb(36, 41, 46)' : 'rgb(248, 248, 242)';
                    if (computed !== defaultRgb) {
                        color = computed;
                    }
                }
            }
        } catch (e) {
            // fallback
        }

        if (!color) {
            color = this.getTokenFallbackColor(type, isLight);
        }

        this.colorCache[cacheKey] = color;
        return color;
    }

    getSearchInfo() {
        const editor = this.tab.editor;
        if (!editor || !editor.session) return null;

        const session = editor.session;
        const sb = editor.searchBox;
        const isSearchOpen = sb && sb.active && sb.element && sb.element.style.display !== 'none' &&
                             sb.searchInput && sb.searchInput.value.trim() !== '';

        let re = null;
        let activeMatch = null;

        const selRange = editor.getSelectionRange();
        const hasSelection = selRange && !selRange.isEmpty() && (!selRange.isMultiLine || !selRange.isMultiLine());

        if (isSearchOpen) {
            re = (editor.$search && editor.$search.$options && editor.$search.$options.re) ||
                 (session.$searchHighlight ? session.$searchHighlight.regExp : null);
            if (hasSelection) {
                activeMatch = {
                    row: selRange.start.row,
                    startCol: selRange.start.column,
                    endCol: selRange.end.column
                };
            }
        } else if (hasSelection) {
            // Double-clicked word or selected word when Ctrl+F searchbox is not open
            const selectedText = session.getTextRange(selRange);
            const trimmed = selectedText ? selectedText.trim() : '';
            // Only trigger on valid identifier/word tokens (letters, numbers, underscores, and rAthena prefixes)
            if (trimmed.length >= 1 && /^[a-zA-Z0-9_$.#]+$/.test(trimmed)) {
                if (session.$searchHighlight && session.$searchHighlight.regExp) {
                    re = session.$searchHighlight.regExp;
                } else if (typeof editor.$getSelectionHighLightRegexp === 'function') {
                    re = editor.$getSelectionHighLightRegexp();
                }

                if (!re) {
                    const escaped = trimmed.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                    const isWordBoundary = /^\w+$/.test(trimmed);
                    const pattern = isWordBoundary ? `\\b${escaped}\\b` : escaped;
                    re = new RegExp(pattern, 'g');
                }

                activeMatch = {
                    row: selRange.start.row,
                    startCol: selRange.start.column,
                    endCol: selRange.end.column
                };
            }
        }

        if (!re) return null;

        let globalRe;
        try {
            const flags = re.flags && re.flags.includes('g') ? re.flags : (re.flags || '') + 'g';
            globalRe = new RegExp(re.source, flags);
        } catch (e) {
            globalRe = re;
        }

        return { regex: globalRe, activeMatch };
    }

    getXForColumn(row, col, maxW) {
        const session = this.tab.editor.session;
        const tokens = session.getTokens(row);
        let x = 4;

        if (tokens && tokens.length > 0) {
            let currentColumn = 0;
            for (let i = 0; i < tokens.length; i++) {
                const val = tokens[i].value;
                const len = val.length;

                if (currentColumn + len >= col) {
                    const offset = Math.max(0, col - currentColumn);
                    return Math.min(maxW, x + offset * this.charWidth);
                }

                if (val.trim() === '') {
                    x += len * this.charWidth;
                } else {
                    const tokenW = Math.max(1.5, Math.min(len * this.charWidth, maxW - x));
                    x += tokenW + 0.8;
                }

                currentColumn += len;
                if (x >= maxW) break;
            }
            return Math.min(maxW, x);
        } else {
            const line = session.getLine(row) || '';
            const leadingMatch = line.match(/^\s*/);
            const leadSpaces = leadingMatch ? leadingMatch[0].length : 0;
            if (col <= leadSpaces) {
                return 4 + col * this.charWidth;
            }
            return Math.min(maxW, 4 + leadSpaces * this.charWidth + (col - leadSpaces) * this.charWidth);
        }
    }

    draw(width, height, dpr) {
        const ctx = this.ctx;
        ctx.save();
        ctx.scale(dpr, dpr);
        ctx.clearRect(0, 0, width, height);

        const session = this.tab.editor.session;
        const totalLines = session.getLength();
        const startLine = Math.max(0, Math.floor(this.minimapScrollTop / this.lineHeight));
        const endLine = Math.min(totalLines - 1, Math.ceil((this.minimapScrollTop + height) / this.lineHeight));
        const isLight = currentTheme === "ace/theme/github_light_default";
        const defaultTextColor = isLight ? '#24292e' : '#f8f8f2';

        const drawH = 2; // 2px thickness with 1px space between lines (lineHeight = 3.0)

        // 1. Draw standard syntax token lines
        for (let row = startLine; row <= endLine; row++) {
            const y = row * this.lineHeight - this.minimapScrollTop;
            const tokens = session.getTokens(row);
            let x = 4; // Left margin

            if (tokens && tokens.length > 0) {
                for (let i = 0; i < tokens.length; i++) {
                    const token = tokens[i];
                    const val = token.value;
                    const len = val.length;

                    if (val.trim() === '') {
                        x += len * this.charWidth;
                        if (x >= width - 4) break;
                        continue;
                    }

                    const color = this.getTokenColor(token);
                    const tokenW = Math.max(1.5, Math.min(len * this.charWidth, width - 4 - x));
                    ctx.fillStyle = color;
                    ctx.fillRect(x, y, tokenW, drawH);
                    x += tokenW + 0.8;
                    if (x >= width - 4) break;
                }
            } else {
                const line = session.getLine(row);
                if (line && line.trim() !== '') {
                    const leadingMatch = line.match(/^\s*/);
                    const leadSpaces = leadingMatch ? leadingMatch[0].length : 0;
                    x += leadSpaces * this.charWidth;
                    const textLen = line.length - leadSpaces;
                    const tokenW = Math.max(1.5, Math.min(textLen * this.charWidth, width - 4 - x));
                    ctx.fillStyle = defaultTextColor;
                    ctx.fillRect(x, y, tokenW, drawH);
                }
            }
        }

        // 2. Draw Search Highlights directly on code tokens (ONLY when search is actively open)
        const searchInfo = this.getSearchInfo();
        if (searchInfo && searchInfo.regex) {
            const re = searchInfo.regex;
            const activeMatch = searchInfo.activeMatch;

            for (let row = startLine; row <= endLine; row++) {
                const line = session.getLine(row);
                if (!line) continue;

                re.lastIndex = 0;
                let match;

                while ((match = re.exec(line)) !== null) {
                    const matchStart = match.index;
                    const matchLen = match[0].length || 1;
                    const matchEnd = matchStart + matchLen;
                    const y = row * this.lineHeight - this.minimapScrollTop;

                    const matchX = Math.max(2, 4 + (matchStart * this.charWidth));
                    const matchW = Math.max(5, Math.min(matchLen * this.charWidth, width - 6 - matchX));

                    const isActive = activeMatch && activeMatch.row === row &&
                                     matchStart <= activeMatch.startCol && matchEnd >= activeMatch.endCol;

                    if (isActive) {
                        ctx.fillStyle = '#e5a524';
                        ctx.fillRect(matchX, y, matchW, drawH);
                    } else {
                        ctx.fillStyle = 'rgba(229, 165, 36, 0.75)';
                        ctx.fillRect(matchX, y, matchW, drawH);
                    }

                    if (re.lastIndex === 0) break;
                }
            }
        }

        // 3. Draw Mouse Drag Selection Highlight on the Minimap (Precisely aligned with code tokens)
        const selRange = this.tab.editor.getSelectionRange();
        if (selRange && !selRange.isEmpty()) {
            const startRow = Math.max(startLine, Math.min(selRange.start.row, selRange.end.row));
            const endRow = Math.min(endLine, Math.max(selRange.start.row, selRange.end.row));

            const isSelLight = currentTheme === "ace/theme/github_light_default" || document.documentElement.style.getPropertyValue('--minimapBg') === '#f6f8fa';
            const selColor = isSelLight ? 'rgba(0, 0, 0, 0.14)' : 'rgba(255, 255, 255, 0.25)';

            for (let r = startRow; r <= endRow; r++) {
                const line = session.getLine(r);
                if (!line || line.trim() === '') continue; // Skip blank lines so no unaligned boxes appear

                const y = r * this.lineHeight - this.minimapScrollTop;
                let cStart = 0;
                let cEnd = line.length;

                if (selRange.start.row === selRange.end.row) {
                    cStart = Math.min(selRange.start.column, selRange.end.column);
                    cEnd = Math.max(selRange.start.column, selRange.end.column);
                } else if (r === selRange.start.row) {
                    cStart = selRange.start.column;
                    cEnd = line.length;
                } else if (r === selRange.end.row) {
                    cStart = 0;
                    cEnd = selRange.end.column;
                }

                if (cEnd <= cStart) continue;

                // For middle lines starting at 0, align start with indentation
                const leadingMatch = line.match(/^\s*/);
                const leadSpaces = leadingMatch ? leadingMatch[0].length : 0;
                let effectiveStartCol = cStart;
                if (cStart === 0 && leadSpaces > 0 && r !== selRange.start.row) {
                    effectiveStartCol = leadSpaces;
                }

                const selX = this.getXForColumn(r, effectiveStartCol, width - 4);
                const selEndX = this.getXForColumn(r, cEnd, width - 4);
                const selW = Math.max(3, selEndX - selX);

                // Highlight overlay precisely aligned with the 2px text line
                ctx.fillStyle = selColor;
                ctx.fillRect(selX, y, selW, drawH);
            }
        }

        ctx.restore();
    }
}

class Tab {
    constructor(id, name = "Untitled") {
        this.id = id;
        this.name = name;
        this.chatHistory = [];
        this.diffHistory = [];
        this.codeHistory = [];
        this.currentHistoryIndex = -1;
        this.fileHandle = null;
        this.relativePath = "";
        this.lastSavedCode = "";
        this.lastModified = 0;
        this.isSaving = false;
        this.lastSavedAt = 0;
        this.isCheckingExternal = false;
        this.timerCounterForGlobal = 0;
        this.chatSessionNum = 0;
        this.typeWriterStatusForChatDone = true;
        this.snackbarTimeout = null;
        this.visibleCount = 10;
        this.dbSaveTimeout = null;
        this.encoding = "windows-1252";

        this.initDOM();
        this.initEditor();
        this.initChat();
    }

    initDOM() {
        this.elements = {};
        const content = document.createElement("div");
        content.className = "tab-content";
        content.id = `tab-content-${this.id}`;
        content.innerHTML = `
            <div id="editor-wrapper-${this.id}" class="editor-wrapper">
                <div id="editor-${this.id}" class="editor-instance"></div>
                <div id="minimap-container-${this.id}" class="minimap-container ${minimapEnabled ? '' : 'hidden'}">
                    <canvas id="minimap-canvas-${this.id}" class="minimap-canvas"></canvas>
                    <div id="minimap-slider-${this.id}" class="minimap-slider" title="Drag to scroll"></div>
                </div>
            </div>
            <div id="chatBotContainer-${this.id}" class="chat-container-instance">
                <div class="chat-section">
                    <div class="chat-messages" id="chat-messages-${this.id}"></div>
                    <div class="loading-indicator" id="loading-indicator-${this.id}">
                        AI is thinking <span class="first_dot">.</span><span class="second_dot">.</span><span class="third_dot">.</span>
                    </div>
                    <div class="model-container">
                        <select id="model-select-${this.id}" style="border:none;font-size:12px;">
                            <option value="gemini-flash-lite-latest" selected>gemini-flash-lite-latest</option>
                            <option value="gemini-flash-latest">gemini-flash-latest</option>
                        </select>
                        <button id="clear-chat-${this.id}" class="clear-chat-btn" title="Clear chat messages" style="background:none;border:none;cursor:pointer;">🗑️</button>
                    </div>
                    <div class="chat-input-area">
                        <textarea id="chat-input-${this.id}" class="chat-input" placeholder="Type your message..."></textarea>
                        <button id="send-button-${this.id}" class="send-button">➜</button>
                    </div>
                </div>
            </div>
        `;
        document.getElementById("tabContentArea").appendChild(content);
        
        this.elements.content = content;
        this.elements.editorWrapper = content.querySelector(`#editor-wrapper-${this.id}`);
        this.elements.editor = content.querySelector(`#editor-${this.id}`);
        this.elements.minimapContainer = content.querySelector(`#minimap-container-${this.id}`);
        this.elements.minimapCanvas = content.querySelector(`#minimap-canvas-${this.id}`);
        this.elements.minimapSlider = content.querySelector(`#minimap-slider-${this.id}`);
        this.elements.chatBotContainer = content.querySelector(`#chatBotContainer-${this.id}`);
        this.elements.chatMessages = content.querySelector(`#chat-messages-${this.id}`);
        this.elements.chatInput = content.querySelector(`#chat-input-${this.id}`);
        this.elements.sendButton = content.querySelector(`#send-button-${this.id}`);
        this.elements.loadingIndicator = content.querySelector(`#loading-indicator-${this.id}`);
        this.elements.clearChatBtn = content.querySelector(`#clear-chat-${this.id}`);
        this.elements.modelSelect = content.querySelector(`#model-select-${this.id}`);

        if (typeof hideChatBotContainer !== 'undefined' && hideChatBotContainer) {
            this.elements.chatBotContainer.style.display = 'none';
            this.elements.editorWrapper.style.flex = '1 1 100%';
            this.elements.editorWrapper.style.width = '100%';
        }

        const savedModel = localStorage.getItem("lastSelectedModel");
        if (savedModel) {
            this.elements.modelSelect.value = savedModel;
        }

        this.elements.modelSelect.addEventListener('change', (e) => {
            const newModel = e.target.value;
            localStorage.setItem("lastSelectedModel", newModel);
            
            // Update all tabs
            tabManager.tabs.forEach(tab => {
                if (tab.elements.modelSelect) {
                    tab.elements.modelSelect.value = newModel;
                }
            });
        });
    }

    updateEditorMode() {
        if (!this.editor) return;
        this.editor.tab = this;
        if (this.editor.session) {
            this.editor.session.tab = this;
        }
        const name = (this.name || "").toLowerCase();
        if (name.endsWith(".yml") || name.endsWith(".yaml")) {
            this.editor.session.setMode("ace/mode/rathena_yaml");
        } else if (name.endsWith(".conf")) {
            this.editor.session.setMode("ace/mode/rathena_conf");
        } else if (name.endsWith(".cpp") || name.endsWith(".c") || name.endsWith(".hpp") || name.endsWith(".h") || name.endsWith(".cc") || name.endsWith(".cxx") || name.endsWith(".c++") || name.endsWith(".h++") || name.endsWith(".inl") || name.endsWith(".inc")) {
            this.editor.session.setMode("ace/mode/c_cpp");
        } else if (name.endsWith(".lua")) {
            this.editor.session.setMode("ace/mode/lua");
        } else {
            this.editor.session.setMode("ace/mode/rathena");
        }
        if (this.minimap) {
            this.minimap.colorCache = {};
            this.minimap.update(true);
        }
        if (typeof runRathenaLinter === "function") {
            runRathenaLinter(this.editor, this.name);
        }
    }

    initEditor() {
        this.editor = ace.edit(this.elements.editor.id);
        this.editor.tab = this;
        if (this.editor.session) {
            this.editor.session.tab = this;
        }
        this.editor.setTheme(currentTheme);
        this.updateEditorMode();
        const localCompletion = typeof localCompletionEnabled !== "undefined" ? localCompletionEnabled : true;
        this.editor.setOptions({
            enableBasicAutocompletion: localCompletion,
            enableLiveAutocompletion: localCompletion,
            fontSize: "14px",
            selectionStyle: "text",
        });
        this.editor.renderer.setScrollMargin(0, 0, 0, 50);

        new TokenTooltip(this.editor);

        this.minimap = new Minimap(
            this,
            this.elements.minimapContainer,
            this.elements.minimapCanvas,
            this.elements.minimapSlider
        );

        this.editor.setShowPrintMargin(false); // Hide the vertical print margin line
        this.editor.getSession().setUseSoftTabs(false);
        
        // Disable Tab completion
        const Autocomplete = ace.require("ace/autocomplete").Autocomplete;
        if (Autocomplete && Autocomplete.prototype && Autocomplete.prototype.commands) {
            Autocomplete.prototype.commands["Tab"] = null;
            Autocomplete.prototype.commands["Shift-Tab"] = null;
        }

        ace.require("ace/ext/statusbar");
        const StatusBar = ace.require("ace/ext/statusbar").StatusBar;
        // The status bar is unique in the original, we keep only one global status bar if needed,
        // but here we can try to attach it to the current editor.
        // Simplified: status bar is handled by tab switch.

        this.editor.on("change", () => {
            if (typeof runRathenaLinter === "function") {
                runRathenaLinter(this.editor, this.name);
            }
            this.updateTabIcon();
            this.scheduleSaveToDB();
            this.scheduleSaveToFile();
        });

        this.editor.getSelection().on("changeSelection", () => {
             tabManager.latestSelectedText = this.editor.getSelectedText();
        });

        // CTRL+S functionality
        this.editor.commands.addCommand({
            name: 'saveToFileSystem',
            bindKey: {win: 'Ctrl-S',  mac: 'Command-S'},
            exec: (editor) => {
                if (!this.isSaving) {
                    this.saveToFile();
                }
            },
            readOnly: false
        });

        // Reopen closed tab keyboard shortcut bindings (supporting Alt-Shift-T / Ctrl-Alt-T as reliable fallbacks)
        this.editor.commands.addCommand({
            name: 'revertClosedTabCommand',
            bindKey: {win: 'Ctrl-Shift-T|Alt-Shift-T|Ctrl-Alt-T', mac: 'Command-Shift-T|Alt-Shift-T|Command-Alt-T'},
            exec: (editor) => {
                if (typeof tabManager !== 'undefined' && tabManager.revertClosedTab) {
                    tabManager.revertClosedTab();
                }
            },
            readOnly: false
        });

        this.editor.container.addEventListener("contextmenu", (e) => {
            e.preventDefault();
            if (tabManager.latestSelectedText.trim() !== "") {
                tabManager.menuX = e.pageX;
                tabManager.menuY = e.pageY;
                const contextMenu = document.getElementById("contextMenu");
                contextMenu.style.left = `${tabManager.menuX}px`;
                contextMenu.style.top = `${tabManager.menuY}px`;
                contextMenu.style.display = "block";
                document.getElementById("askAIForm").style.display = "none";
            }
        });

        // Drag and Drop
        this.elements.editor.addEventListener("dragover", (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = "copy";
        });
        this.elements.editor.addEventListener("drop", async (e) => {
            e.preventDefault();
            const files = e.dataTransfer.files;
            if (!files || files.length === 0) {
                return;
            }

            // Decide where to start: we can reuse the current tab once if it's completely empty/untitled/clean
            let currentTabReusable = !this.fileHandle && this.name === "Untitled" && !this.isDirty() && this.editor.getValue().trim() === "";

            for (let i = 0; i < files.length; i++) {
                const file = files[i];

                // Try to get a FileSystemFileHandle for the dropped item
                let handle = null;
                if (e.dataTransfer.items && e.dataTransfer.items.length === files.length) {
                    try {
                        const item = e.dataTransfer.items[i];
                        if (typeof item.getAsFileSystemHandle === "function") {
                            handle = await item.getAsFileSystemHandle();
                        }
                    } catch(err) {}
                }

                const fileData = await readFileWithEncoding(file);
                const contents = fileData.text;

                // Check if another tab already has this file open to avoid duplicates
                let existingTab = null;
                if (handle) {
                    for (const otherTab of tabManager.tabs) {
                        if (otherTab.fileHandle) {
                            try {
                                if (await otherTab.fileHandle.isSameEntry(handle)) {
                                    existingTab = otherTab;
                                    break;
                                }
                            } catch (e) {}
                        }
                    }
                } else {
                    for (const otherTab of tabManager.tabs) {
                        if (otherTab.name === file.name && otherTab.editor.getValue() === contents) {
                            existingTab = otherTab;
                            break;
                        }
                    }
                }

                if (existingTab) {
                    existingTab.encoding = fileData.encoding;
                    tabManager.switchTab(existingTab.id);
                    const oldCode = existingTab.editor.getValue();
                    const normDisk = normalizeCode(contents);
                    const normSaved = normalizeCode(existingTab.lastSavedCode || '');
                    const normEditor = normalizeCode(oldCode);
                    const wasDiskEdited = (normDisk !== normSaved && normDisk !== normEditor);

                    if (wasDiskEdited) {
                        if (existingTab.isDirty()) {
                            existingTab.lastModified = file.lastModified || Date.now();
                            openExternalConflictModal(existingTab, contents, file.lastModified || Date.now());
                            continue;
                        }
                        if (existingTab.diskSaveTimeout) {
                            clearTimeout(existingTab.diskSaveTimeout);
                            existingTab.diskSaveTimeout = null;
                        }
                        existingTab.lastSavedCode = contents;
                        existingTab.lastModified = file.lastModified || Date.now();
                        existingTab.editor.setValue(contents, -1);
                        existingTab.editor.session.setUndoManager(new ace.UndoManager());
                        existingTab.updateTabIcon();
                        existingTab.updateTitle();
                        existingTab.saveCurrentCodeToHistory();
                        existingTab.saveToDB();

                        const diffIndex = existingTab.recordChange(oldCode, contents, new Date(file.lastModified || Date.now()));
                        if (diffIndex !== null) {
                            const diffData = existingTab.diffHistory[diffIndex] || { additions: 0, removals: 0 };
                            const additions = diffData.additions || 0;
                            const removals = diffData.removals || 0;
                            let aiMessage = `<p>File was modified externally (e.g. Notepad).<br/><br/>
                                            <span style="font-size:10px"><b>Time Edited:</b> ${(new Date(file.lastModified || Date.now())).toLocaleString()}<br/>
                                            <b><span style="color: #2ea043;">+${additions}</span> <span style="color: #f85149;">-${removals}</span> lines changed</b></span></p>`;
                            aiMessage += `<div class="diff-actions">
                                            <button class="diff-btn view" onclick="openDiff(${diffIndex}, ${existingTab.id})">View Changes</button>
                                            <button class="diff-btn restore" onclick="restoreFromDiff(${diffIndex}, 'new', ${existingTab.id})">Restore Code here</button>
                                          </div>`;
                            existingTab.addMessage(aiMessage, 'ai');
                        }
                        showSnackbar(`"${existingTab.name}" updated with external changes.`);
                    } else {
                        existingTab.lastModified = file.lastModified || Date.now();
                    }
                    continue;
                }

                // Decide where to open: reuse current tab if empty/clean (only once), otherwise open in a new tab
                let targetTab;
                if (currentTabReusable) {
                    targetTab = this;
                    currentTabReusable = false; // Cannot reuse more than once
                } else {
                    targetTab = tabManager.addTab();
                }

                // If it's a different file, clear the chat
                const isSame = targetTab.fileHandle && handle && await targetTab.fileHandle.isSameEntry(handle);
                if (!isSame) {
                    targetTab.clearChat(false);
                }

                // Reset code history for target tab on opening a new file
                targetTab.codeHistory = [];
                targetTab.currentHistoryIndex = -1;

                targetTab.fileHandle = handle;
                if (handle) {
                    tabManager.lastDirectoryHandle = handle;
                }

                targetTab.encoding = fileData.encoding;
                targetTab.lastSavedCode = contents;
                targetTab.lastModified = file.lastModified || 0;
                targetTab.editor.setValue(contents, -1);
                targetTab.editor.session.setUndoManager(new ace.UndoManager());
                targetTab.editor.scrollToLine(1, true, true);
                targetTab.editor.gotoLine(1, 0, false);
                targetTab.name = file.name;
                targetTab.updateEditorMode();
                targetTab.saveCurrentCodeToHistory();
                targetTab.updateTabIcon();
                targetTab.updateTitle();
                tabManager.renderTabs();
                tabManager.switchTab(targetTab.id);
                targetTab.saveToDB();
            }
        });
    }

    initChat() {
        this.clearChat(false);
        this.elements.sendButton.addEventListener('click', () => this.sendMessage());
        this.elements.chatInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter' && !event.shiftKey) { 
                event.preventDefault(); 
                this.sendMessage();
            }
        });
        this.elements.chatInput.addEventListener('input', () => {
            if (this.visibleCount !== 10) {
                this.visibleCount = 10;
                this.updateMessageVisibility(false);
            }
        });
        this.elements.clearChatBtn.addEventListener('click', () => openClearChatModal());
        
        // scroll up pagination to show more chat history
        let isScrolledUpLoading = false;
        this.elements.chatMessages.addEventListener('scroll', () => {
            if (isScrolledUpLoading) return;
            if (this.elements.chatMessages.scrollTop <= 5) {
                const children = this.elements.chatMessages.children;
                const total = children.length;
                if (this.visibleCount < total) {
                    isScrolledUpLoading = true;
                    this.visibleCount = Math.min(total, this.visibleCount + 5);
                    this.updateMessageVisibility(true);
                    setTimeout(() => {
                        isScrolledUpLoading = false;
                    }, 50);
                }
            }
        });

        // lazy loading
        const firstDot = this.elements.loadingIndicator.querySelector('.first_dot');
        const secondDot = this.elements.loadingIndicator.querySelector('.second_dot');
        const thirdDot = this.elements.loadingIndicator.querySelector('.third_dot');
        let step = 0;
        setInterval(() => {
            step = (step + 1) % 4;
            if (firstDot) firstDot.style.visibility = step >= 1 ? 'visible' : 'hidden';
            if (secondDot) secondDot.style.visibility = step >= 2 ? 'visible' : 'hidden';
            if (thirdDot) thirdDot.style.visibility = step >= 3 ? 'visible' : 'hidden';
        }, 150);
    }

    activate() {
        this.elements.content.classList.add("active");
        this.editor.resize();
        if (this.minimap) {
            this.minimap.update(true);
        }
        this.updateHistoryButtons();
        this.visibleCount = 10;
        this.updateMessageVisibility(false);

        if (this.fileHandle && typeof folderTreeManager !== 'undefined' && folderTreeManager && folderTreeManager.rootHandle) {
            folderTreeManager.rootHandle.resolve(this.fileHandle).then(parts => {
                if (parts && parts.length > 0) {
                    const resolvedPath = parts.join('/');
                    if (this.relativePath !== resolvedPath) {
                        this.relativePath = resolvedPath;
                        this.updateTitle();
                        this.saveToDB();
                        if (typeof tabManager !== 'undefined') {
                            tabManager.renderTabs();
                        }
                    }
                }
            }).catch(() => {});
        }

        this.updateTitle();
        this.checkExternalChange();
        // Use timeout to prevent scroll-to-focus issues during tab transition
        setTimeout(() => {
          if (this.elements.chatInput) {
            this.elements.chatInput.focus({ preventScroll: true });
          }
          this.elements.chatMessages.scrollTop = this.elements.chatMessages.scrollHeight;
        }, 50);
    }

    updateTitle() {
        const displayName = this.relativePath || this.name;
        if (typeof tabManager !== 'undefined' && tabManager.activeTab === this) {
            const prefix = this.isDirty() ? '● ' : '';
            document.title = `${prefix}${displayName} - rAthena Text Editor`;
        }
        // Always ensure the tab button DOM element has its title attribute matching the tab location
        const btn = document.querySelector(`.tab-button[data-id="${this.id}"]`);
        if (btn) {
            btn.title = displayName;
        }
    }

    setMinimapVisible(visible) {
        if (this.elements.minimapContainer) {
            if (visible) {
                this.elements.minimapContainer.classList.remove("hidden");
                if (this.minimap) {
                    this.minimap.update(true);
                }
            } else {
                this.elements.minimapContainer.classList.add("hidden");
            }
        }
        if (this.editor) {
            this.editor.resize();
        }
    }

    setChatBotHidden(hidden) {
        if (this.elements && this.elements.chatBotContainer) {
            const chatBot = this.elements.chatBotContainer;
            const editorArea = this.elements.editorWrapper || this.elements.editor;
            if (hidden) {
                chatBot.style.display = 'none';
                if (editorArea) {
                    editorArea.style.flex = '1 1 100%';
                    editorArea.style.width = '100%';
                }
            } else {
                chatBot.style.display = 'flex';
                if (editorArea) {
                    editorArea.style.flex = '1 1 70%';
                    editorArea.style.width = '70%';
                }
            }
        }
        if (this.editor) {
            this.editor.resize();
        }
        if (this.minimap) {
            this.minimap.update(true);
        }
    }

    deactivate() {
        if (this.fileHandle && this.isDirty() && typeof autoSaveEnabled !== 'undefined' && autoSaveEnabled) {
            this.autoSaveToFile();
        }
        this.elements.content.classList.remove("active");
    }

    isDirty() {
        return normalizeCode(this.editor.getValue()) !== normalizeCode(this.lastSavedCode);
    }

    updateTabIcon() {
        const dirty = this.isDirty();
        const btn = document.querySelector(`.tab-button[data-id="${this.id}"]`);
        if (btn) {
            const closeIcon = btn.querySelector('.tab-close');
            if (closeIcon) {
                closeIcon.textContent = dirty ? '●' : '✖';
                closeIcon.classList.toggle('dirty', dirty);
            }
        }
        this.updateTitle();
    }

    scheduleSaveToDB() {
        if (this.dbSaveTimeout) clearTimeout(this.dbSaveTimeout);
        this.dbSaveTimeout = setTimeout(() => {
            this.saveToDB();
        }, 300);
    }

    saveToDB() {
        if (typeof tabManager !== 'undefined' && tabManager.tabs && tabManager.tabs.includes(this)) {
            const orderIndex = tabManager.tabs.indexOf(this);
            if (typeof tabDB !== 'undefined') {
                tabDB.saveTab(this, orderIndex);
            }
        }
    }

    async directReauthorize() {
        if (!this.fileHandle) return 'none';
        try {
            if (typeof this.fileHandle.queryPermission === 'function') {
                const perm = await this.fileHandle.queryPermission({ mode: 'readwrite' });
                if (perm === 'granted') {
                    return 'granted';
                }
                if (typeof this.fileHandle.requestPermission === 'function') {
                    try {
                        return await this.fileHandle.requestPermission({ mode: 'readwrite' });
                    } catch (e) {
                        // User activation not yet available; will prompt on next user interaction
                    }
                }
                return perm;
            }
        } catch (e) {
            return 'error';
        }
        return 'unknown';
    }

    scheduleSaveToFile() {
        if (!this.fileHandle || typeof autoSaveEnabled === 'undefined' || !autoSaveEnabled) return;
        if (this.diskSaveTimeout) clearTimeout(this.diskSaveTimeout);
        this.diskSaveTimeout = setTimeout(() => {
            this.autoSaveToFile();
        }, 1500);
    }

    async autoSaveToFile() {
        if (!this.fileHandle || !this.isDirty() || this.isSaving || typeof autoSaveEnabled === 'undefined' || !autoSaveEnabled) return;
        try {
            let perm = 'granted';
            if (typeof this.fileHandle.queryPermission === 'function') {
                perm = await this.fileHandle.queryPermission({ mode: 'readwrite' });
            }
            if (perm === 'granted') {
                await this.writeToDisk(false);
            }
        } catch (err) {
            console.warn("autoSaveToFile error:", err);
        }
    }

    async writeToDisk(showSnack = true, fromSaveToFile = false) {
        if (!this.fileHandle) return false;
        if (this.isSaving && !fromSaveToFile) return false;
        this.isSaving = true;
        try {
            const currentCode = this.editor.getValue();
            const prevSavedCode = this.lastSavedCode;
            const saveDate = new Date();
            const writable = await this.fileHandle.createWritable();

            let dataToWrite;
            if (this.encoding === "windows-1252") {
                dataToWrite = encodeWindows1252(currentCode);
            } else if (this.encoding === "euc-kr") {
                dataToWrite = encodeEucKr(currentCode);
            } else {
                dataToWrite = currentCode;
            }
            await writable.write(dataToWrite);
            await writable.close();

            this.lastSavedCode = currentCode;
            this.lastSavedAt = Date.now();

            try {
                // Microtask pause to ensure disk write is completely committed by OS
                await new Promise(r => setTimeout(r, 60));
                const updatedFile = await this.fileHandle.getFile();
                this.lastModified = updatedFile.lastModified || Date.now();
                if (typeof folderTreeManager !== 'undefined' && folderTreeManager.nodeRegistry) {
                    folderTreeManager.nodeRegistry.forEach((reg) => {
                        if (!reg.isDirectory && (
                            (this.relativePath && reg.path === this.relativePath) ||
                            reg.handle === this.fileHandle ||
                            reg.path.endsWith('/' + this.name) ||
                            reg.path === this.name
                        )) {
                            reg.lastModified = this.lastModified;
                            reg.lastSize = updatedFile.size || 0;
                            reg.isModifiedExternally = false;
                            reg.lastSavedAt = Date.now();
                            if (folderTreeManager.markFileModifiedInTree) {
                                folderTreeManager.markFileModifiedInTree(reg, false);
                            }
                        }
                    });
                }
            } catch (e) {
                this.lastModified = Date.now();
            }

            const diffIndex = this.recordChange(prevSavedCode, currentCode, saveDate);
            this.updateTabIcon();
            this.saveToDB();

            if (showSnack) {
                showSnackbar(`Saved "${this.name}" to file location.`);
            }

            this.visibleCount = 10;
            this.updateMessageVisibility(false);

            if (diffIndex !== null) {
                this.addMessage("I made some changes", 'user');
                const diffData = this.diffHistory[diffIndex] || { additions: 0, removals: 0 };
                const additions = diffData.additions || 0;
                const removals = diffData.removals || 0;
                let aiMessage = `<p>Here are the changes in your code.<br/><br/>
                                <span style="font-size:10px"><b>Time Edited:</b> ${saveDate.toLocaleString()}<br/>
                                <b><span style="color: #2ea043;">+${additions}</span> <span style="color: #f85149;">-${removals}</span> lines changed</b></span></p>`;
                aiMessage += `<div class="diff-actions">
                                <button class="diff-btn view" onclick="openDiff(${diffIndex}, ${this.id})">View Changes</button>
                                <button class="diff-btn restore" onclick="restoreFromDiff(${diffIndex}, 'new', ${this.id})">Restore Code here</button>
                              </div>`;
                this.addMessage(aiMessage, 'ai');
            }
            return true;
        } catch (err) {
            console.error("writeToDisk error:", err);
            if (err && (err.name === 'NotAllowedError' || err.name === 'SecurityError')) {
                showSnackbar(`Write permission needed for "${this.name}". Use Ctrl+S or click Save to authorize.`);
            }
            return false;
        } finally {
            this.isSaving = false;
        }
    }

    async checkExternalChange(force = false) {
        if (!this.fileHandle || this.isCheckingExternal || this.isSaving) return;
        // Ignore self-induced filesystem events if we saved this tab recently
        if (Date.now() - (this.lastSavedAt || 0) < 6000) {
            return;
        }
        this.isCheckingExternal = true;
        try {
            const file = await this.fileHandle.getFile();
            const diskModified = file.lastModified || 0;
            if (!force && this.lastModified && diskModified === this.lastModified) {
                return;
            }

            const fileData = await readFileWithEncoding(file, this.encoding);
            const diskContent = fileData.text;
            const normDisk = normalizeCode(diskContent);
            const normSaved = normalizeCode(this.lastSavedCode || '');
            const normEditor = normalizeCode(this.editor.getValue());

            // 1. If disk content matches what this app saved/loaded OR matches current editor content,
            // NO external conflict occurred!
            if (normDisk === normSaved || normDisk === normEditor) {
                this.lastModified = diskModified;
                if (normDisk === normEditor && normDisk !== normSaved) {
                    this.lastSavedCode = diskContent;
                    this.updateTabIcon();
                }
                return;
            }

            // 2. Disk content actually changed externally!
            // But if the user is currently editing the file in this app (editor has unsaved edits):
            if (normEditor !== normSaved) {
                // There is a conflict: local unsaved edits in app VS external edits on disk!
                // DO NOT REVERT OR OVERWRITE THE USER'S WORK!
                this.lastModified = diskModified;
                openExternalConflictModal(this, diskContent, diskModified);
                return;
            }

            // 3. User's editor is clean (no unsaved edits in this app).
            // Do NOT reload if file was saved within 10 seconds unless forced by outside window focus
            if (Date.now() - (this.lastSavedAt || 0) < 10000 && !force) {
                return;
            }

            // It is safe to reload the genuine external changes into the editor.
            const oldCode = this.editor.getValue();
            const cursor = this.editor.getCursorPosition();
            const scrollTop = this.editor.session.getScrollTop();
            const scrollLeft = this.editor.session.getScrollLeft();

            // Cancel any pending auto-save to disk so external edits aren't overwritten
            if (this.diskSaveTimeout) {
                clearTimeout(this.diskSaveTimeout);
                this.diskSaveTimeout = null;
            }

            // Set lastSavedCode and lastModified first so editor change listener knows it is clean!
            this.lastSavedCode = diskContent;
            this.lastModified = diskModified;

            // Update editor value
            this.editor.setValue(diskContent, -1);
            this.editor.session.setUndoManager(new ace.UndoManager());
            try {
                this.editor.moveCursorToPosition(cursor);
                this.editor.session.setScrollTop(scrollTop);
                this.editor.session.setScrollLeft(scrollLeft);
            } catch (e) {}

            // Ensure it always stays completely clean
            this.updateTabIcon();
            this.updateTitle();
            this.saveCurrentCodeToHistory();
            this.saveToDB();
            closeExternalConflictModal();

            // Record diff history
            const diffIndex = this.recordChange(oldCode, diskContent, new Date(diskModified || Date.now()));
            if (diffIndex !== null) {
                const diffData = this.diffHistory[diffIndex] || { additions: 0, removals: 0 };
                const additions = diffData.additions || 0;
                const removals = diffData.removals || 0;
                let aiMessage = `<p>File was modified externally (e.g. Notepad).<br/><br/>
                                <span style="font-size:10px"><b>Time Edited:</b> ${(new Date(diskModified || Date.now())).toLocaleString()}<br/>
                                <b><span style="color: #2ea043;">+${additions}</span> <span style="color: #f85149;">-${removals}</span> lines changed</b></span></p>`;
                aiMessage += `<div class="diff-actions">
                                <button class="diff-btn view" onclick="openDiff(${diffIndex}, ${this.id})">View Changes</button>
                                <button class="diff-btn restore" onclick="restoreFromDiff(${diffIndex}, 'new', ${this.id})">Restore Code here</button>
                              </div>`;
                this.addMessage(aiMessage, 'ai');
            }

            // Always give a snackbar notification if edited!
            showSnackbar(`"${this.name}" updated with external changes.`);
        } catch (err) {
            // Silently handle if permission not granted or file moved
        } finally {
            this.isCheckingExternal = false;
        }
    }

    recordChange(oldCode, newCode, timestamp = new Date()) {
        if (oldCode === newCode) return null;
        const diffIndex = this.diffHistory.length;
        let additions = 0;
        let removals = 0;
        try {
            if (typeof Diff !== 'undefined' && Diff.diffLines) {
                const diff = Diff.diffLines(oldCode, newCode);
                diff.forEach(part => {
                    if (part.added) additions += part.count;
                    if (part.removed) removals += part.count;
                });
            }
        } catch (e) {
            console.error("Error calculating diff in recordChange:", e);
        }
        this.diffHistory.push({
            old: oldCode,
            new: newCode,
            timestamp: timestamp,
            additions: additions,
            removals: removals
        });
        return diffIndex;
    }

    saveCurrentCodeToHistory() {
        const currentCode = this.editor.getValue();
        if (this.currentHistoryIndex >= 0 && this.codeHistory[this.currentHistoryIndex] === currentCode) {
            this.updateHistoryButtons();
            return;
        }
        if (this.currentHistoryIndex < this.codeHistory.length - 1) {
            this.codeHistory = this.codeHistory.slice(0, this.currentHistoryIndex + 1);
        }
        this.codeHistory.push(currentCode);
        this.currentHistoryIndex = this.codeHistory.length - 1;
        if (this.codeHistory.length > 25) {
            this.codeHistory.shift(); 
            this.currentHistoryIndex--; 
        }
        this.updateHistoryButtons();
    }

    updateHistoryButtons() {
        if (tabManager.activeTab !== this) return;
        const prevBtn = document.getElementById('previousCodeBtn');
        const nextBtn = document.getElementById('nextCodeBtn');
        if (prevBtn) prevBtn.disabled = this.currentHistoryIndex <= 0;
        if (nextBtn) nextBtn.disabled = this.currentHistoryIndex >= this.codeHistory.length - 1;
    }

    previousCode() {
        if (this.currentHistoryIndex <= 0) return;
        this.currentHistoryIndex--;
        this.editor.setValue(this.codeHistory[this.currentHistoryIndex], -1);
        this.editor.session.setUndoManager(new ace.UndoManager()); 
        this.updateHistoryButtons();
        this.scheduleSaveToDB();
    }

    nextCode() {
        if (this.currentHistoryIndex >= this.codeHistory.length - 1) return;
        this.currentHistoryIndex++;
        this.editor.setValue(this.codeHistory[this.currentHistoryIndex], -1);
        this.editor.session.setUndoManager(new ace.UndoManager());
        this.updateHistoryButtons();
        this.scheduleSaveToDB();
    }

    async openFile() {
        try {
            const handles = await window.showOpenFilePicker({
                multiple: true,
                types: [
                    {
                        description: "All Supported Files (*.txt, *.conf, *.yml, *.yaml, *.cpp, *.hpp, *.c, *.h, *.lua, *.inc)",
                        accept: { "text/plain": [".txt", ".conf", ".yml", ".yaml", ".cpp", ".hpp", ".c", ".h", ".cc", ".cxx", ".inl", ".inc", ".lua"] }
                    },
                    { description: "rAthena Script Files (*.txt)", accept: { "text/plain": [".txt"] } },
                    { description: "Lua Script Files (*.lua)", accept: { "text/plain": [".lua"] } },
                    { description: "C / C++ Source Files (*.cpp, *.c, *.cc, *.cxx)", accept: { "text/plain": [".cpp", ".c", ".cc", ".cxx"] } },
                    { description: "C / C++ Header & Include Files (*.hpp, *.h, *.inl, *.inc)", accept: { "text/plain": [".hpp", ".h", ".inl", ".inc"] } },
                    { description: "Configuration Files (*.conf)", accept: { "text/plain": [".conf"] } },
                    { description: "YAML Files (*.yml, *.yaml)", accept: { "text/plain": [".yml", ".yaml"] } }
                ],
                startIn: tabManager.lastDirectoryHandle || "documents"
            });

            if (!handles || handles.length === 0) return;

            let currentTabReusable = !this.fileHandle && this.name === "Untitled" && !this.isDirty() && this.editor.getValue().trim() === "";

            for (const handle of handles) {
                const file = await handle.getFile();

                // Check if any tab already has this file open to avoid duplicates
                let existingTab = null;
                for (const otherTab of tabManager.tabs) {
                    if (otherTab.fileHandle) {
                        try {
                            if (await otherTab.fileHandle.isSameEntry(handle)) {
                                existingTab = otherTab;
                                break;
                            }
                        } catch (e) {}
                    }
                }

                if (existingTab) {
                    tabManager.switchTab(existingTab.id);
                    const fileData = await readFileWithEncoding(file, existingTab.encoding);
                    const diskContent = fileData.text;
                    const diskModified = file.lastModified || Date.now();
                    const oldCode = existingTab.editor.getValue();
                    const normDisk = normalizeCode(diskContent);
                    const normSaved = normalizeCode(existingTab.lastSavedCode || '');
                    const normEditor = normalizeCode(oldCode);
                    const wasDiskEdited = (normDisk !== normSaved && normDisk !== normEditor);

                    if (wasDiskEdited) {
                        if (existingTab.isDirty()) {
                            existingTab.lastModified = diskModified;
                            openExternalConflictModal(existingTab, diskContent, diskModified);
                            continue;
                        }
                        if (existingTab.diskSaveTimeout) {
                            clearTimeout(existingTab.diskSaveTimeout);
                            existingTab.diskSaveTimeout = null;
                        }
                        existingTab.lastSavedCode = diskContent;
                        existingTab.lastModified = diskModified;
                        existingTab.editor.setValue(diskContent, -1);
                        existingTab.editor.session.setUndoManager(new ace.UndoManager());
                        existingTab.editor.scrollToLine(1, true, true);
                        existingTab.editor.gotoLine(1, 0, false);
                        existingTab.updateTabIcon();
                        existingTab.updateTitle();
                        existingTab.saveCurrentCodeToHistory();
                        existingTab.saveToDB();
                        updateStatusBarEncoding(existingTab);

                        const diffIndex = existingTab.recordChange(oldCode, diskContent, new Date(diskModified));
                        if (diffIndex !== null) {
                            const diffData = existingTab.diffHistory[diffIndex] || { additions: 0, removals: 0 };
                            const additions = diffData.additions || 0;
                            const removals = diffData.removals || 0;
                            let aiMessage = `<p>File was modified externally (e.g. Notepad).<br/><br/>
                                            <span style="font-size:10px"><b>Time Edited:</b> ${(new Date(diskModified)).toLocaleString()}<br/>
                                            <b><span style="color: #2ea043;">+${additions}</span> <span style="color: #f85149;">-${removals}</span> lines changed</b></span></p>`;
                            aiMessage += `<div class="diff-actions">
                                            <button class="diff-btn view" onclick="openDiff(${diffIndex}, ${existingTab.id})">View Changes</button>
                                            <button class="diff-btn restore" onclick="restoreFromDiff(${diffIndex}, 'new', ${existingTab.id})">Restore Code here</button>
                                          </div>`;
                            existingTab.addMessage(aiMessage, 'ai');
                        }
                        showSnackbar(`"${existingTab.name}" updated with external changes.`);
                    } else {
                        existingTab.lastModified = diskModified;
                    }
                    continue;
                }

                // Decide where to open: reuse current tab if empty/clean, otherwise open in a new tab
                let targetTab;
                if (currentTabReusable) {
                    targetTab = this;
                    currentTabReusable = false; // Cannot reuse more than once
                } else {
                    targetTab = tabManager.addTab();
                }

                // If it's a different file, clear the chat
                const isSame = targetTab.fileHandle && await targetTab.fileHandle.isSameEntry(handle);
                if (!isSame) {
                    targetTab.clearChat(false);
                }

                // Reset code history for this specific tab on opening a new file
                targetTab.codeHistory = [];
                targetTab.currentHistoryIndex = -1;

                targetTab.fileHandle = handle;
                tabManager.lastDirectoryHandle = handle;
                const fileData = await readFileWithEncoding(file);
                const contents = fileData.text;
                targetTab.encoding = fileData.encoding;
                targetTab.lastSavedCode = contents;
                targetTab.lastModified = file.lastModified || 0;
                targetTab.editor.setValue(contents, -1);
                targetTab.editor.session.setUndoManager(new ace.UndoManager());
                targetTab.editor.scrollToLine(1, true, true);
                targetTab.editor.gotoLine(1, 0, false);
                targetTab.name = file.name;
                if (typeof folderTreeManager !== 'undefined' && folderTreeManager && folderTreeManager.rootHandle) {
                    try {
                        const parts = await folderTreeManager.rootHandle.resolve(handle);
                        if (parts && parts.length > 0) {
                            targetTab.relativePath = parts.join('/');
                        }
                    } catch (e) {}
                }
                targetTab.updateEditorMode();
                targetTab.saveCurrentCodeToHistory();
                targetTab.updateTabIcon();
                targetTab.updateTitle();
                tabManager.renderTabs();
                tabManager.switchTab(targetTab.id);
                targetTab.saveToDB();
            }
        } catch (err) {
            console.error("Open failed:", err);
        }
    }

    async saveToFile() {
        if (this.isSaving) return false;
        this.isSaving = true;
        try {
            if (!this.fileHandle) {
                let suggested = this.name;
                const hasExt = [".txt", ".conf", ".yml", ".yaml", ".cpp", ".hpp", ".c", ".h", ".cc", ".cxx", ".inl", ".inc", ".lua"].some(ext => suggested.toLowerCase().endsWith(ext));
                if (!hasExt) {
                    suggested += ".txt";
                }
                try {
                    this.fileHandle = await window.showSaveFilePicker({
                        suggestedName: suggested,
                        types: [
                            {
                                description: "All Supported Files (*.txt, *.conf, *.yml, *.yaml, *.cpp, *.hpp, *.c, *.h, *.lua, *.inc)",
                                accept: { "text/plain": [".txt", ".conf", ".yml", ".yaml", ".cpp", ".hpp", ".c", ".h", ".cc", ".cxx", ".inl", ".inc", ".lua"] }
                            },
                            { description: "rAthena Script Files (*.txt)", accept: { "text/plain": [".txt"] } },
                            { description: "Lua Script Files (*.lua)", accept: { "text/plain": [".lua"] } },
                            { description: "C / C++ Source Files (*.cpp, *.c, *.cc, *.cxx)", accept: { "text/plain": [".cpp", ".c", ".cc", ".cxx"] } },
                            { description: "C / C++ Header & Include Files (*.hpp, *.h, *.inl, *.inc)", accept: { "text/plain": [".hpp", ".h", ".inl", ".inc"] } },
                            { description: "Configuration Files (*.conf)", accept: { "text/plain": [".conf"] } },
                            { description: "YAML Files (*.yml, *.yaml)", accept: { "text/plain": [".yml", ".yaml"] } }
                        ]
                    });
                    this.name = this.fileHandle.name;
                    this.updateEditorMode();
                    tabManager.renderTabs();
                    this.updateTitle();
                } catch (pickerErr) {
                    console.warn("Save file picker canceled or error:", pickerErr);
                    return false;
                }
            }

            if (this.fileHandle && typeof this.fileHandle.queryPermission === 'function') {
                try {
                    let perm = await this.fileHandle.queryPermission({ mode: 'readwrite' });
                    if (perm !== 'granted') {
                        if (typeof this.fileHandle.requestPermission === 'function') {
                            perm = await this.fileHandle.requestPermission({ mode: 'readwrite' });
                        }
                    }
                    if (perm !== 'granted') {
                        showSnackbar(`Permission denied to save "${this.name}".`);
                        return false;
                    }
                } catch (pe) {
                    console.warn("Direct re-authorization error:", pe);
                    return false;
                }
            }

            return await this.writeToDisk(true, true);
        } finally {
            this.isSaving = false;
        }
    }

    async reloadWithEncoding(newEncoding) {
        if (!newEncoding) return;
        this.encoding = newEncoding;
        if (this.fileHandle) {
            try {
                const file = await this.fileHandle.getFile();
                const fileData = await readFileWithEncoding(file, newEncoding);
                this.editor.setValue(fileData.text, -1);
                this.editor.session.setUndoManager(new ace.UndoManager());
                this.lastSavedCode = fileData.text;
                this.updateTabIcon();
                this.saveCurrentCodeToHistory();
                this.saveToDB();
                updateStatusBarEncoding(this);
                updateMojibakeModalUI();
                showSnackbar(`"${this.name}" reloaded as ${getEncodingLabel(newEncoding)}.`);
                return;
            } catch (err) {
                console.error("reloadWithEncoding error:", err);
            }
        }
        updateStatusBarEncoding(this);
        updateMojibakeModalUI();
        showSnackbar(`Encoding set to ${getEncodingLabel(newEncoding)}.`);
    }

    convertContentMojibakeToKorean() {
        const selected = this.editor.getSelectedText();
        if (selected) {
            const converted = mojibakeToKorean(selected);
            this.editor.insert(converted);
            this.saveCurrentCodeToHistory();
            this.updateTabIcon();
            showSnackbar("Selected Mojibake converted to Korean.");
        } else {
            const fullText = this.editor.getValue();
            const converted = mojibakeToKorean(fullText);
            this.editor.setValue(converted, -1);
            this.saveCurrentCodeToHistory();
            this.updateTabIcon();
            showSnackbar("Full document Mojibake converted to Korean.");
        }
    }

    convertContentKoreanToMojibake() {
        const selected = this.editor.getSelectedText();
        if (selected) {
            const converted = koreanToMojibake(selected);
            this.editor.insert(converted);
            this.saveCurrentCodeToHistory();
            this.updateTabIcon();
            showSnackbar("Selected Korean converted to Mojibake.");
        } else {
            const fullText = this.editor.getValue();
            const converted = koreanToMojibake(fullText);
            this.editor.setValue(converted, -1);
            this.saveCurrentCodeToHistory();
            this.updateTabIcon();
            showSnackbar("Full document Korean converted to Mojibake.");
        }
    }

    downloadEditorContent() {
        const content = this.editor.getValue();
        let blob;
        if (this.encoding === "windows-1252") {
            blob = new Blob([encodeWindows1252(content)], { type: "text/plain" });
        } else if (this.encoding === "euc-kr") {
            blob = new Blob([encodeEucKr(content)], { type: "text/plain" });
        } else {
            blob = new Blob([content], { type: "text/plain;charset=utf-8" });
        }
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        const hasExt = [".txt", ".conf", ".yml", ".yaml", ".cpp", ".hpp", ".c", ".h", ".cc", ".cxx", ".inl", ".inc", ".lua"].some(ext => this.name.toLowerCase().endsWith(ext));
        a.download = hasExt ? this.name : this.name + ".txt";
        a.click();
        URL.revokeObjectURL(url);
    }

    clearChat(showSnack = true) {
        this.visibleCount = 10;
        this.elements.chatMessages.innerHTML = '';
        this.chatHistory = [
            {
                role: "user",
                parts: [
                    { text: `This is your **DOCUMENTATION** that you must follow to provide accurate data to user question: `+ standard_rAthena_script + `.\n\n` },
                    { text: `Strictly follow this **SYSTEM INSTRUCTIONS** all the times: `+ instructionPromt2 + `.\n\n` }
                ]
            }
        ];
        if (showSnack) showSnackbar("Chat cleared.");
    }

    async sendMessage() {
        const userMessage = this.elements.chatInput.value.trim();
        if (!userMessage || !this.typeWriterStatusForChatDone || this.chatSessionNum > 0) return;

        if (/^i made some change(s|d)?\.?$/i.test(userMessage)) {
            this.elements.chatInput.value = '';
            await this.saveToFile();
            return;
        }

        this.visibleCount = 10;
        this.chatSessionNum++;
        this.timerCounterForGlobal = 0;
        let timer = setInterval(() => this.timerCounterForGlobal++, 1000);

        this.addMessage(userMessage, 'user');
        this.elements.chatInput.value = '';
        this.elements.sendButton.disabled = true;
        this.elements.loadingIndicator.classList.add('active');
        this.elements.chatMessages.scrollTop = this.elements.chatMessages.scrollHeight;
        
        this.editor.setReadOnly(true);
        this.editor.container.style.pointerEvents = "none";
        const editorContent = this.editor.getValue();

        const userInstructionalPrompt = `This is the code in the main editor as your context if the user ask: \`\`\`${editorContent}\`\`\`. Just Ignore the main editor if it has no code or value.`.trim();

        this.chatHistory.push({
            role: "user",
            parts: [
                { text: userInstructionalPrompt + `.\n\n` },
                { text: `This is user input/question: ` + userMessage + `. do not repeat the user instructions in your response.` }
            ]
        });

        try {
            const apiKey = document.getElementById("APIKey").value;
            const selectedModel = this.elements.modelSelect.value;
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${selectedModel}:generateContent?key=${apiKey}`;

            const payload = {
                contents: this.chatHistory,
                generationConfig: {
                    temperature: 0.0,
                    maxOutputTokens: 65536,
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: "OBJECT",
                        properties: { thinking: { type: "STRING" }, response: { type: "STRING" } },
                        propertyOrdering: ["thinking", "response"]
                    }
                }
            };

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                let errorDetails = "AI API Error";
                try {
                    const errorJson = await response.json();
                    if (errorJson.error && errorJson.error.message) {
                        errorDetails = errorJson.error.message;
                    } else {
                        errorDetails = `API Error ${response.status}: ${response.statusText}`;
                    }
                } catch (e) {
                    errorDetails = `API Error ${response.status}: ${response.statusText}`;
                }
                throw new Error(errorDetails);
            }

            const result = await response.json();
            const content = result.candidates[0].content.parts[0].text;
            const data = JSON.parse(content);
            const thinking = data.thinking || "";
            const responseText = data.response || "";

            const codeBlockRegexGlobal = /```(\w+)?\s*([\s\S]*?)\s*```/g;
            const matches = [...responseText.matchAll(codeBlockRegexGlobal)];

            let chatDisplayMessageValue = responseText;
            let diffIndex = -1;

            if (matches.length > 0) {
                const allCodeContent = matches.map(m => m[2].trim()).join('\n\n').replace(/\\n/g, "\n").replace(/&Tab;/g, "\t");
                const oldCode = this.editor.getValue();
                this.editor.setValue(allCodeContent, -1);
                this.editor.setReadOnly(false);
                this.editor.container.style.pointerEvents = "auto";
                this.saveCurrentCodeToHistory();
                diffIndex = this.recordChange(oldCode, allCodeContent);
                
                chatDisplayMessageValue = responseText.replace(codeBlockRegexGlobal, '').trim() || "Generated code is displayed in the editor.";
                
                // Add View Changes and Restore buttons if a change was made
                if (diffIndex !== null) {
                    const genTime = new Date();
                    const diffData = this.diffHistory[diffIndex] || { additions: 0, removals: 0 };
                    const additions = diffData.additions || 0;
                    const removals = diffData.removals || 0;
                    chatDisplayMessageValue += `
                        <p style="font-size:10px; margin-top:20px;"><b>Time generated:</b> ${genTime.toLocaleString()}<br/>
                        <b><span style="color: #2ea043;">+${additions}</span> <span style="color: #f85149;">-${removals}</span> lines changed</b></p>
                        <div class="diff-actions">
                            <button class="diff-btn view" onclick="openDiff(${diffIndex}, ${this.id})">View Changes</button>
                            <button class="diff-btn restore" onclick="restoreFromDiff(${diffIndex}, 'new', ${this.id})">Restore Code here</button>
                        </div>
                    `;
                }
            }

            clearInterval(timer);
            let combined = '';
            if (thinking) {
                combined += `<p class="ai_thought_textDesign" onclick="toggleThinking(this)">🤖 Thought in ${this.timerCounterForGlobal} seconds <span class="toggle-arrow" style="display: inline-flex; align-items: center; justify-content: center; width: 12px; height: 12px; transition: transform 0.2s ease; margin-left: 4px; pointer-events: none;"><svg viewBox="0 0 24 24" width="10" height="10" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round" style="pointer-events: none; display: block;"><polyline points="9 18 15 12 9 6"></polyline></svg></span></p>\n<div class="ai_thinking" style="display: none;">\n<thinking>\n${thinking}\n</thinking>\n<p style="color:gray;margin-top:6px;">Done</p>\n</div><br/>`;
            }
            combined += chatDisplayMessageValue;
            this.addMessage(combined, 'ai');
            this.chatHistory.push({ role: "model", parts: [{ text: responseText }] });
        } catch (err) {
            console.error(err);
            this.addMessage("Error communicating with AI: " + (err.message || String(err)), "ai");
        } finally {
            this.chatSessionNum = 0;
            this.elements.loadingIndicator.classList.remove('active');
            this.elements.sendButton.disabled = false;
            this.editor.setReadOnly(false);
            this.editor.container.style.pointerEvents = "auto";
        }
    }

    addMessage(text, sender) {
        const div = document.createElement("div");
        div.className = `message ${sender}`;
        const bubble = document.createElement("div");
        bubble.className = "message-bubble";
        div.appendChild(bubble);
        this.elements.chatMessages.appendChild(div);

        this.updateMessageVisibility(false);

        if (sender === 'ai' || sender === 'restored') {
            this.typeWriterEffect(bubble, text);
        } else {
            const pre = document.createElement("pre");
            pre.style.whiteSpace = "pre-wrap";
            pre.style.wordWrap = "break-word";
            pre.style.margin = "0";
            pre.style.fontFamily = "inherit";
            pre.textContent = text;
            bubble.appendChild(pre);
        }
        this.elements.chatMessages.scrollTop = this.elements.chatMessages.scrollHeight;
    }

    updateMessageVisibility(preserveScroll = false) {
        const children = Array.from(this.elements.chatMessages.children);
        if (children.length === 0) return;

        if (!this.visibleCount) {
            this.visibleCount = 10;
        }

        const total = children.length;
        const hideCount = Math.max(0, total - this.visibleCount);

        let oldScrollHeight = 0;
        let oldScrollTop = 0;
        if (preserveScroll) {
            oldScrollHeight = this.elements.chatMessages.scrollHeight;
            oldScrollTop = this.elements.chatMessages.scrollTop;
        }

        for (let i = 0; i < total; i++) {
            const child = children[i];
            if (i < hideCount) {
                child.style.display = 'none';
            } else {
                child.style.display = '';
            }
        }

        if (preserveScroll) {
            const newScrollHeight = this.elements.chatMessages.scrollHeight;
            this.elements.chatMessages.scrollTop = oldScrollTop + (newScrollHeight - oldScrollHeight);
        }
    }

    typeWriterEffect(element, text) {
        this.typeWriterStatusForChatDone = false;
        let i = 0;
        const speed = 1;
        const chunkSize = 15;
        element.innerHTML = '';
        let typed = '';
        
        const type = () => {
            if (i < text.length) {
                typed += text.slice(i, i + chunkSize);
                i += chunkSize;
                element.innerHTML = markdownToHtmlForChat(typed);
                this.elements.chatMessages.scrollTop = this.elements.chatMessages.scrollHeight;
                setTimeout(type, speed);
            } else {
                element.innerHTML = markdownToHtmlForChat(text);
                this.typeWriterStatusForChatDone = true;
                this.elements.chatMessages.scrollTop = this.elements.chatMessages.scrollHeight;
            }
        };
        type();
    }
}

/* Documentation Tooltips Logic */
const rathenaDocMap = {};

function parseRathenaDocs() {
    if (typeof standard_rAthena_script === 'undefined') return;
    
    const lines = standard_rAthena_script.split('\n');
    let currentCmd = null;
    let currentSignature = "";
    let currentContent = [];

    const saveCommand = () => {
        if (currentCmd) {
            // Trim leading/trailing blank lines or visual separator decorators (like hyphens or equals signs)
            let rawLines = [...currentContent];
            while (rawLines.length > 0) {
                const last = rawLines[rawLines.length - 1].trim();
                if (last === "" || /^[=\-_~#\*]{3,}$/.test(last)) {
                    rawLines.pop();
                } else {
                    break;
                }
            }
            while (rawLines.length > 0) {
                const first = rawLines[0].trim();
                if (first === "" || /^[=\-_~#\*]{3,}$/.test(first)) {
                    rawLines.shift();
                } else {
                    break;
                }
            }

            // Identify section headers underlined by dashes/equals and generic isolated dividers
            const processedLines = [];
            for (let j = 0; j < rawLines.length; j++) {
                const line = rawLines[j];
                const trimmed = line.trim();
                
                if (/^[=\-_~#\*]{3,}$/.test(trimmed)) {
                    // This is a decorative divider line
                    if (processedLines.length > 0 && !processedLines[processedLines.length - 1].isHeading) {
                        // Mark previous line as structured Section Heading
                        processedLines[processedLines.length - 1].isHeading = true;
                    } else {
                        // Otherwise, treat as an internal thin horizontal divider
                        processedLines.push({
                            text: `<div style="border-top: 1px solid var(--tooltipDivider); margin: 10px 0; opacity: 0.15;"></div>`,
                            isDivider: true,
                            originalText: line
                        });
                    }
                } else {
                    processedLines.push({
                        text: line,
                        originalText: line,
                        isHeading: false
                    });
                }
            }

            // Assemble into beautifully formatted HTML blocks
            const content = processedLines.map(item => {
                if (item.isDivider) {
                    return item.text;
                }
                
                // Escape HTML tags while preserving our own structured formatting and removing trailing dash/equals traces
                let text = item.text
                    .replace(/&/g, "&amp;")
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;")
                    .replace(/"/g, "&quot;")
                    .replace(/'/g, "&#039;")
                    .replace(/-{3,}/g, "")
                    .replace(/={3,}/g, "");
                
                const leadingSpaces = item.originalText.match(/^\s+/);
                const indent = leadingSpaces ? leadingSpaces[0].length * 6 : 0;
                
                if (item.isHeading) {
                    return `<div style="padding-left: ${indent}px; color: var(--tooltipHeaderColor); font-size: 11.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-top: 12px; margin-bottom: 6px; font-family: 'Inter', sans-serif;">${text.trim()}</div>`;
                }
                
                if (leadingSpaces) {
                    return `<div style="padding-left: ${indent}px; font-family: 'JetBrains Mono', 'Courier New', monospace; font-size: 11px; opacity: 0.9; margin: 3px 0; white-space: pre-wrap; word-break: break-all; line-height: 1.45;">${text.trim()}</div>`;
                }
                
                return `<div style="margin: 4px 0; font-size: 11.5px; opacity: 0.95; white-space: pre-wrap; word-break: break-word; line-height: 1.5;">${text}</div>`;
            }).join('');
            
            let formattedSignature = currentSignature
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;");
            
            formattedSignature = formattedSignature.replace(new RegExp("^\\*" + currentCmd, "i"), "<strong>*"+currentCmd+"</strong>");

            if (rathenaDocMap[currentCmd]) {
                // Append signature and content if it is a variation
                rathenaDocMap[currentCmd].signature += "<br/>" + formattedSignature;
                // Add a divider if the content behaves as a separate variant description
                if (rathenaDocMap[currentCmd].description.indexOf(content.substring(0, 50)) === -1) {
                    rathenaDocMap[currentCmd].description += `<div style="margin: 12px 0; border-top: 1px dashed var(--tooltipDivider); opacity: 0.4;"></div>` + content;
                }
            } else {
                rathenaDocMap[currentCmd] = {
                    signature: formattedSignature,
                    description: content
                };
            }
        }
    };

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimmed = line.trim();
        if (trimmed.startsWith('*') && !trimmed.startsWith('**') && trimmed.length > 1 && /^\*[a-zA-Z0-9_]/.test(trimmed)) {
            saveCommand();
            const match = trimmed.match(/^\*([a-zA-Z0-9_]+)/);
            if (match) {
                currentCmd = match[1];
                currentSignature = trimmed;
                currentContent = []; 
            } else {
                currentCmd = null;
            }
        } else if (currentCmd) {
            currentContent.push(line);
        }
    }
    saveCommand();
}

function highlightRathenaCode(code) {
    if (!code) return "";
    let i = 0;
    let html = "";
    
    // Create sets for fast lookup of keyword lists from rathena-highlight-rules.js
    const cfSet = new Set(typeof controlFlowKeywords !== 'undefined' ? controlFlowKeywords : []);
    const sfSet = new Set(typeof supportFunctionKeywords !== 'undefined' ? supportFunctionKeywords : []);
    const clSet = new Set(typeof constantLibraryKeywords !== 'undefined' ? constantLibraryKeywords : []);
    const vlSet = new Set(typeof variableLanguageKeywords !== 'undefined' ? variableLanguageKeywords : []);
    const ivSet = new Set(typeof inventoryVarNames !== 'undefined' ? inventoryVarNames : []);
    const claSet = new Set(typeof constantLanguageKeywords !== 'undefined' ? constantLanguageKeywords : []);
    
    // Escape helper for safety inside other tokens
    const escapeHTML = (text) => {
        return text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
    };
    
    while (i < code.length) {
        const remaining = code.substring(i);
        
        // 1. Block comment
        if (remaining.startsWith("/*")) {
            const endIdx = remaining.indexOf("*/");
            if (endIdx !== -1) {
                const commentContent = remaining.substring(0, endIdx + 2);
                html += `<span style="color: var(--syntaxComment); font-style: italic;">${escapeHTML(commentContent)}</span>`;
                i += endIdx + 2;
                continue;
            } else {
                html += `<span style="color: var(--syntaxComment); font-style: italic;">${escapeHTML(remaining)}</span>`;
                break;
            }
        }
        
        // 2. Line comment
        if (remaining.startsWith("//")) {
            const nlIdx = remaining.indexOf("\n");
            const commentContent = nlIdx !== -1 ? remaining.substring(0, nlIdx) : remaining;
            html += `<span style="color: var(--syntaxComment); font-style: italic;">${escapeHTML(commentContent)}</span>`;
            i += commentContent.length;
            continue;
        }
        
        // 3. String literal
        if (remaining.startsWith('"')) {
            let strContent = '"';
            let j = 1;
            let esc = false;
            while (j < remaining.length) {
                const char = remaining[j];
                strContent += char;
                if (char === '\\') {
                    esc = !esc;
                } else if (char === '"' && !esc) {
                    j++;
                    break;
                } else {
                    esc = false;
                }
                j++;
            }
            html += `<span style="color: var(--syntaxString);">${escapeHTML(strContent)}</span>`;
            i += j;
            continue;
        }
        
        // 4. Numbers (hex, numbers)
        const numMatch = remaining.match(/^(?:0x[0-9a-fA-F]+\b|\d+\b)/);
        if (numMatch) {
            const numVal = numMatch[0];
            html += `<span style="color: var(--syntaxNumber);">${escapeHTML(numVal)}</span>`;
            i += numVal.length;
            continue;
        }
        
        // 5. Identifiers with possible rAthena prefixes (.@, @, $, ., #, ', $)
        const idMatch = remaining.match(/^(?:(?:\.@|@|\$|#|'|\.)[a-zA-Z0-9_]+(?:\$|\b)|[a-zA-Z_][a-zA-Z0-9_]*(?:\$|\b))/);
        if (idMatch) {
            const idVal = idMatch[0];
            const cleanId = idVal.replace(/^[\.@$#'.]+/, "").replace(/\$$/, "");
            const cleanIdLower = cleanId.toLowerCase();
            
            if (cfSet.has(cleanId) || cfSet.has(cleanIdLower)) {
                html += `<span style="color: var(--syntaxKeyword); font-weight: bold;">${idVal}</span>`;
            } else if (sfSet.has(cleanId) || sfSet.has(cleanIdLower)) {
                html += `<span style="color: var(--syntaxFunction);">${idVal}</span>`;
            } else if (clSet.has(idVal) || clSet.has(cleanId) || clSet.has(cleanIdLower) || claSet.has(idVal) || claSet.has(cleanId) || claSet.has(cleanIdLower)) {
                html += `<span style="color: var(--syntaxConstant);">${idVal}</span>`;
            } else if (vlSet.has(idVal) || vlSet.has(cleanId) || vlSet.has(cleanIdLower) || ivSet.has(idVal) || ivSet.has(cleanId) || ivSet.has(cleanIdLower) || idVal.startsWith('@') || idVal.startsWith('.@') || idVal.startsWith('$') || idVal.startsWith('.') || idVal.startsWith('#') || idVal.startsWith("'") || idVal.endsWith('$')) {
                html += `<span style="color: var(--syntaxVariable);">${idVal}</span>`;
            } else {
                html += escapeHTML(idVal);
            }
            i += idVal.length;
            continue;
        }
        
        // 6. Multi-character operators
        const opMatch = remaining.match(/^(?:==|!=|<=|>=|&&|\|\||\+\+|--|\+=|-=|\*=|\/=)/);
        if (opMatch) {
            const opVal = opMatch[0];
            html += `<span style="color: var(--tooltipColor); opacity: 0.85;">${escapeHTML(opVal)}</span>`;
            i += opVal.length;
            continue;
        }
        
        // 7. Standard character fallback
        const singleChar = remaining[0];
        html += escapeHTML(singleChar);
        i++;
    }
    
    return html;
}

function parseNewTooltipDocs() {
    if (typeof rathena_tooltip_doc === 'undefined') return;
    
    // Split by structured breakline
    const blocks = rathena_tooltip_doc.split(/---------------------- Breakline ----------------------/);
    
    for (const block of blocks) {
        if (!block || !block.trim()) continue;
        
        const syntaxMatch = block.match(/<syntax>([\s\S]*?)<\/syntax>/i);
        const descriptionMatch = block.match(/<description>([\s\S]*?)<\/description>/i);
        const exampleMatch = block.match(/<example_code>([\s\S]*?)<\/example_code>/i);
        
        if (!syntaxMatch) continue;
        
        const rawSyntax = syntaxMatch[1].trim();
        const cmdMatch = rawSyntax.match(/^\*?([$@.#a-zA-Z0-9_]+)/);
        if (!cmdMatch) continue;
        const cmd = cmdMatch[1];
        
        let syntaxEscaped = rawSyntax
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
            
        // Highlight active command name in syntax bold
        let displaySyntax = syntaxEscaped.startsWith('*')
            ? `<strong>*${cmd}</strong>` + syntaxEscaped.substring(cmd.length + 1)
            : `<strong>${cmd}</strong>` + syntaxEscaped.substring(cmd.length);
            
        displaySyntax = displaySyntax.replace(/\n/g, '<br/>');
            
        // Strip syntax tag and retrieve all description content, removing description tags to remain robust
        let contentBody = block.replace(/<syntax>[\s\S]*?<\/syntax>/i, "").trim();
        contentBody = contentBody
            .replace(/<description>/gi, "")
            .replace(/<\/description>/gi, "")
            .trim();
            
        let htmlOutput = "";
        const tokenRegex = /(<example_code>[\s\S]*?<\/example_code>|<code_explanation>[\s\S]*?<\/code_explanation>|<code_explaination>[\s\S]*?<\/code_explaination>)/gi;
        const parts = contentBody.split(tokenRegex);
        
        for (const part of parts) {
            if (!part) continue;
            
            const partLower = part.toLowerCase();
            if (partLower.startsWith("<example_code>")) {
                const innerMatch = part.match(/<example_code>([\s\S]*?)<\/example_code>/i);
                if (innerMatch) {
                    const rawExample = innerMatch[1].trim();
                    const safeRawExample = rawExample.replace(/<\/script>/gi, "</scrip_t_>");
                    
                    htmlOutput += `
                        <div style="color: var(--tooltipHeaderColor); font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; font-family: 'Inter', sans-serif;">Example:</div>
                        <div class="tooltip-ace-wrapper" style="border: 1px solid var(--tooltipDivider); border-radius: 4px; overflow: hidden; margin: 4px 0; background: rgba(0, 0, 0, 0.1);">
                            <div class="tooltip-ace-editor" style="width: 100%;"></div>
                            <script type="text/plain" class="tooltip-ace-raw-code">${safeRawExample}</script>
                        </div>
                    `;
                }
            } else if (partLower.startsWith("<code_explanation>") || partLower.startsWith("<code_explaination>")) {
                const innerMatch = part.match(/<(code_explanation|code_explaination)>([\s\S]*?)<\/\1>/i);
                if (innerMatch && innerMatch[2].trim() !== "") {
                    const rawExplanation = innerMatch[2].trim();
                    const explanationEscaped = rawExplanation
                        .replace(/&/g, "&amp;")
                        .replace(/</g, "&lt;")
                        .replace(/>/g, "&gt;")
                        .replace(/"/g, "&quot;")
                        .replace(/'/g, "&#039;");
                    
                    const formattedExplanationText = explanationEscaped.replace(/\n/g, '<br/>');
                    htmlOutput += `
                        <div style="color: var(--tooltipHeaderColor); font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; font-family: 'Inter', sans-serif;">Explanation:</div>
                        <div style="font-size: 11.5px; opacity: 0.85; line-height: 1.5; font-family: 'Inter', -apple-system, sans-serif;">
                            ${formattedExplanationText}
                        </div>
                    `;
                }
            } else {
                // This is a plain text portion of the description
                let textEscaped = part
                    .replace(/&/g, "&amp;")
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;")
                    .replace(/"/g, "&quot;")
                    .replace(/'/g, "&#039;");
                
                // Replace consecutive blank lines with a single blank line
                let cleanedText = textEscaped.replace(/\n\s*\n+/g, '\n\n');
                let formattedText = cleanedText.replace(/\n/g, '<br/>');
                
                if (formattedText.trim() !== "") {
                    htmlOutput += `
                        <div style="font-size: 11.5px; opacity: 0.95; line-height: 1.5; font-family: 'Inter', -apple-system, sans-serif;">
                            ${formattedText}
                        </div>
                    `;
                }
            }
        }
        
        const finalDescription = `
            <div class="tooltip-description-content">
                ${htmlOutput}
            </div>
        `;
        
        // Save the override / insertion entry
        rathenaDocMap[cmd] = {
            signature: displaySyntax,
            description: finalDescription,
            isNewStructured: true
        };
        const cleanCmd = cmd.replace(/^[$@.#]+/, "");
        if (cleanCmd !== cmd) {
            rathenaDocMap[cleanCmd] = rathenaDocMap[cmd];
        }
    }
}

const spriteCache = new Map();

const COMMON_RATHENA_CONSTANTS = {
    // Potions
    "red_potion": { id: 501, name: "Red Potion", type: "item" },
    "orange_potion": { id: 502, name: "Orange Potion", type: "item" },
    "yellow_potion": { id: 503, name: "Yellow Potion", type: "item" },
    "white_potion": { id: 504, name: "White Potion", type: "item" },
    "blue_potion": { id: 505, name: "Blue Potion", type: "item" },
    "green_potion": { id: 506, name: "Green Potion", type: "item" },
    // Common fruits & supplies
    "apple": { id: 512, name: "Apple", type: "item" },
    "banana": { id: 513, name: "Banana", type: "item" },
    "grape": { id: 514, name: "Grape", type: "item" },
    "carrot": { id: 515, name: "Carrot", type: "item" },
    "sweet_potato": { id: 516, name: "Sweet Potato", type: "item" },
    "meat": { id: 517, name: "Meat", type: "item" },
    "yggdrasilberry": { id: 607, name: "Yggdrasil Berry", type: "item" },
    "yggdrasil_berry": { id: 607, name: "Yggdrasil Berry", type: "item" },
    "yggdrasilseed": { id: 608, name: "Yggdrasil Seed", type: "item" },
    "yggdrasil_seed": { id: 608, name: "Yggdrasil Seed", type: "item" },
    "wing_of_fly": { id: 601, name: "Fly Wing", type: "item" },
    "fly_wing": { id: 601, name: "Fly Wing", type: "item" },
    "wing_of_butterfly": { id: 602, name: "Butterfly Wing", type: "item" },
    "butterfly_wing": { id: 602, name: "Butterfly Wing", type: "item" },
    "magnifier": { id: 610, name: "Magnifier", type: "item" },
    "empty_bottle": { id: 713, name: "Empty Bottle", type: "item" },
    "jellopy": { id: 909, name: "Jellopy", type: "item" },
    "knife": { id: 1201, name: "Knife", type: "item" },
    "cutter": { id: 1202, name: "Cutter", type: "item" },
    "main_gauche": { id: 1207, name: "Main Gauche", type: "item" },
    "poring_card": { id: 4001, name: "Poring Card", type: "item" },
    
    // Common Mobs
    "poring": { id: 1002, name: "Poring", type: "monster" },
    "fabre": { id: 1007, name: "Fabre", type: "monster" },
    "lunatic": { id: 1063, name: "Lunatic", type: "monster" },
    "pecopeco": { id: 1019, name: "Peco Peco", type: "monster" },
    "peco_peco": { id: 1019, name: "Peco Peco", type: "monster" },
    "baphomet": { id: 1039, name: "Baphomet", type: "monster" },
    "angeling": { id: 1096, name: "Angeling", type: "monster" },
    "deviling": { id: 1582, name: "Deviling", type: "monster" },
    "ghostring": { id: 1120, name: "Ghostring", type: "monster" },
    "maya": { id: 1147, name: "Maya", type: "monster" },
    "drake": { id: 1112, name: "Drake", type: "monster" },
    "eddga": { id: 1115, name: "Eddga", type: "monster" },
    "moonlight": { id: 1150, name: "Moonlight Flower", type: "monster" },
    "phreeoni": { id: 1159, name: "Phreeoni", type: "monster" },
    "doppelganger": { id: 1046, name: "Doppelganger", type: "monster" },
    "orc_hero": { id: 1087, name: "Orc Hero", type: "monster" },
    "orc_lord": { id: 1190, name: "Orc Lord", type: "monster" },

    // Common NPCs
    "4_m_jobguide": { id: 100, name: "Job Guide (Male)", type: "npc" },
    "4_f_kafra1": { id: 115, name: "Kafra 1", type: "npc" },
    "4_f_kafra2": { id: 116, name: "Kafra 2", type: "npc" },
    "4_f_kafra3": { id: 117, name: "Kafra 3", type: "npc" },
    "4_f_kafra4": { id: 118, name: "Kafra 4", type: "npc" },
    "4_f_kafra5": { id: 119, name: "Kafra 5", type: "npc" },
    "4_f_kafra6": { id: 120, name: "Kafra 6", type: "npc" },
    "4_f_kafra7": { id: 844, name: "Kafra 7", type: "npc" },
    "4_f_nurse": { id: 45, name: "Nurse", type: "npc" },
    "4_m_soldier": { id: 46, name: "Soldier", type: "npc" },
    "4_m_pront_soldier": { id: 47, name: "Prontera Soldier", type: "npc" }
};

class TokenTooltip {
    constructor(editor) {
        if (editor.tokenTooltip) return;
        editor.tokenTooltip = this;
        this.editor = editor;
        this.activeEmbeddedEditors = [];
        this.isMouseOverTooltip = false;
        
        let Tooltip;
        try {
            Tooltip = ace.require("ace/tooltip").Tooltip;
        } catch (e) {
            console.warn("Ace tooltip not found");
            return;
        }
        
        this.tooltip = new Tooltip(editor.container);
        
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseOut = this.onMouseOut.bind(this);
        this.hideTooltip = this.hideTooltip.bind(this);
        
        editor.on("mousemove", this.onMouseMove);
        editor.on("mouseout", this.onMouseOut);
        if (editor.container) {
            editor.container.addEventListener("mouseleave", () => this.hideTooltip(true));
        }
    }

    destroyActiveEmbeddedEditors() {
        if (this.activeEmbeddedEditors) {
            this.activeEmbeddedEditors.forEach(ed => {
                try {
                    ed.destroy();
                } catch (e) {
                    console.warn("Error destroying embedded editor:", e);
                }
            });
        }
        this.activeEmbeddedEditors = [];
    }

    hideTooltip(force = false) {
        if (!force && this.isMouseOverTooltip) return;
        if (this.hoverTimeout) {
            clearTimeout(this.hoverTimeout);
            this.hoverTimeout = null;
        }
        this.pendingToken = null;
        this.cachedEvent = null;
        this.destroyActiveEmbeddedEditors();
        this.currentToken = null;
        const element = this.tooltip.getElement ? this.tooltip.getElement() : this.tooltip.element;
        if (element) {
            element.classList.remove("sprite_tooltip");
        }
        this.tooltip.hide();
    }

    loadTransparentSprite(url, options, callback) {
        if (typeof options === 'function') {
            callback = options;
            options = {};
        }
        options = options || {};

        if (!options.bypassCache && spriteCache.has(url)) {
            callback(null, spriteCache.get(url));
            return;
        }

        const tryNextFallback = (err) => {
            const fallbackList = [].concat(options.fallbackUrls || []).concat(options.fallbackUrl ? [options.fallbackUrl] : []);
            if (fallbackList.length > 0) {
                const nextUrl = fallbackList[0];
                const restUrls = fallbackList.slice(1);
                const isNextGif = nextUrl.toLowerCase().endsWith(".gif") && !options.isNpc && !options.isItem;
                this.loadTransparentSprite(nextUrl, {
                    isGif: isNextGif,
                    isNpc: options.isNpc,
                    isItem: options.isItem,
                    fallbackUrls: restUrls,
                    bypassCache: options.bypassCache
                }, callback);
                return;
            }
            callback(err || new Error("Failed to load sprite from all sources"));
        };

        // If it is an animated monster GIF, load directly to preserve animation frames & native transparency
        if (options.isGif && !options.isNpc) {
            const img = new Image();
            img.onload = () => {
                const result = {
                    dataUrl: url,
                    width: img.naturalWidth || 60,
                    height: img.naturalHeight || 60,
                    isGif: true,
                    sourceUrl: url
                };
                spriteCache.set(url, result);
                callback(null, result);
            };
            img.onerror = () => {
                tryNextFallback(new Error("Failed to load monster GIF"));
            };
            img.src = url;
            return;
        }

        // Apply canvas transparent background extraction (same method for itemID and NPC ID)
        const applyCanvasTransparency = (imageElement, sourceRefUrl) => {
            try {
                const canvas = document.createElement("canvas");
                const w = imageElement.naturalWidth || imageElement.width || 40;
                const h = imageElement.naturalHeight || imageElement.height || 40;
                canvas.width = w;
                canvas.height = h;
                const ctx = canvas.getContext("2d", { willReadFrequently: true });
                ctx.drawImage(imageElement, 0, 0);

                const imgData = ctx.getImageData(0, 0, w, h);
                const data = imgData.data;

                const getPixel = (x, y) => {
                    const idx = (y * w + x) * 4;
                    return [data[idx], data[idx + 1], data[idx + 2], data[idx + 3]];
                };

                const tl = getPixel(0, 0);
                const tr = getPixel(w - 1, 0);
                const bl = getPixel(0, h - 1);
                const br = getPixel(w - 1, h - 1);

                // Check if any corner is already transparent
                const isCornerTransparent = tl[3] === 0 || tr[3] === 0 || bl[3] === 0 || br[3] === 0;

                if (!isCornerTransparent) {
                    const isMatching = (p1, p2, tol = 16) => {
                        return Math.abs(p1[0] - p2[0]) <= tol &&
                               Math.abs(p1[1] - p2[1]) <= tol &&
                               Math.abs(p1[2] - p2[2]) <= tol;
                    };

                    let bgCol = null;
                    if (isMatching(tl, tr) && isMatching(tl, bl)) bgCol = tl;
                    else if (isMatching(tl, tr) || isMatching(tl, br)) bgCol = tl;
                    else if (isMatching(tr, br)) bgCol = tr;
                    else if (isMatching(bl, br)) bgCol = bl;
                    else bgCol = tl;

                    if (bgCol) {
                        const visited = new Uint8Array(w * h);
                        const queue = [];

                        const isBg = (x, y) => {
                            const idx = (y * w + x) * 4;
                            return Math.abs(data[idx] - bgCol[0]) <= 22 &&
                                   Math.abs(data[idx + 1] - bgCol[1]) <= 22 &&
                                   Math.abs(data[idx + 2] - bgCol[2]) <= 22;
                        };

                        for (let x = 0; x < w; x++) {
                            if (isBg(x, 0)) { queue.push(x, 0); visited[x] = 1; }
                            if (isBg(x, h - 1)) { queue.push(x, h - 1); visited[(h - 1) * w + x] = 1; }
                        }
                        for (let y = 0; y < h; y++) {
                            if (isBg(0, y) && !visited[y * w]) { queue.push(0, y); visited[y * w] = 1; }
                            if (isBg(w - 1, y) && !visited[y * w + (w - 1)]) { queue.push(w - 1, y); visited[y * w + (w - 1)] = 1; }
                        }

                        let qHead = 0;
                        while (qHead < queue.length) {
                            const qx = queue[qHead++];
                            const qy = queue[qHead++];
                            const pIdx = (qy * w + qx) * 4;
                            data[pIdx + 3] = 0;

                            const neighbors = [[qx + 1, qy], [qx - 1, qy], [qx, qy + 1], [qx, qy - 1]];
                            for (let n = 0; n < 4; n++) {
                                const nx = neighbors[n][0];
                                const ny = neighbors[n][1];
                                if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
                                    const vIdx = ny * w + nx;
                                    if (!visited[vIdx] && isBg(nx, ny)) {
                                        visited[vIdx] = 1;
                                        queue.push(nx, ny);
                                    }
                                }
                            }
                        }

                        ctx.putImageData(imgData, 0, 0);
                    }
                }

                const result = {
                    dataUrl: canvas.toDataURL("image/png"),
                    width: w,
                    height: h,
                    isGif: false,
                    sourceUrl: sourceRefUrl || url
                };
                spriteCache.set(url, result);
                callback(null, result);
            } catch (err) {
                tryNextFallback(err);
            }
        };

        const img = new Image();
        img.crossOrigin = "anonymous";
        const proxyUrl = (url.includes("file5s.ratemyserver.net") || url.includes("ratemyserver.net"))
            ? `/api/proxy-sprite?url=${encodeURIComponent(url)}`
            : url;

        img.onload = () => {
            applyCanvasTransparency(img, url);
        };

        img.onerror = () => {
            if (img.src && img.src.includes("/api/proxy-sprite")) {
                const directImg = new Image();
                directImg.crossOrigin = "anonymous";
                directImg.onload = () => {
                    applyCanvasTransparency(directImg, url);
                };
                directImg.onerror = (err) => {
                    tryNextFallback(err || new Error("Failed to load sprite"));
                };
                directImg.src = url;
                return;
            }
            tryNextFallback(new Error("Failed to load sprite"));
        };

        img.src = proxyUrl;
    }

    detectSpriteTarget(line, col, token) {
        if (!line || col < 0) return null;
        if (token && token.type && token.type.indexOf("comment") !== -1) {
            return null;
        }

        let start = col;
        while (start > 0 && /[a-zA-Z0-9_]/.test(line[start - 1])) start--;
        let end = col;
        while (end < line.length && /[a-zA-Z0-9_]/.test(line[end])) end++;
        const word = line.substring(start, end).trim();
        if (!word) return null;

        const isNum = /^\d+$/.test(word);
        let numId = isNum ? parseInt(word, 10) : 0;
        let constName = "";

        if (!isNum) {
            const lowerWord = word.toLowerCase();
            if (COMMON_RATHENA_CONSTANTS[lowerWord]) {
                const mapped = COMMON_RATHENA_CONSTANTS[lowerWord];
                numId = mapped.id;
                constName = mapped.name;
                return { type: mapped.type, id: numId, name: constName, context: "Constant" };
            }
            return null;
        }

        if (numId <= 0) return null;

        const after = line.substring(end).trim();
        const before = line.substring(0, start).trim();

        // 1. NPC Structure detection:
        // Format: <map>,<x>,<y>,<facing> <type> <name> <NPCID>[,<xs>,<ys>],{
        // Sample: prontera,155,180,5 script SkillPointMaster 100,{
        // or:     - script SkillPointMaster 100,{
        // or:     prontera,155,180,5 duplicate(SkillPointMaster) DuplicateName 100
        // or:     prontera,155,180,5 shop ToolDealer 100,501:100
        const npcHeaderRegex = /^(?:([a-zA-Z0-9_@#-]+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*(\d+))?|-)\s+(script|duplicate(?:\s*\([^)]*\))?|shop|itemshop|pointshop|market|cashshop|trader)\s+([^\s,]+|"[^"]*"|'[^']*')\s*$/i;
        const npcMatch = before.match(npcHeaderRegex);
        if (npcMatch) {
            const map = npcMatch[1] || "";
            const x = npcMatch[2] || "";
            const y = npcMatch[3] || "";
            const dir = npcMatch[4] || "";
            const structureType = npcMatch[5] || "script";
            const npcName = (npcMatch[6] || "").replace(/^["']|["']$/g, "");
            const locationStr = map ? `${map} (${x}, ${y})` : "Floating NPC";
            return {
                type: "npc",
                id: numId,
                name: npcName,
                map: map,
                coords: map ? `${x}, ${y}` : "",
                structure: structureType,
                context: `${locationStr} • ${structureType}`
            };
        }

        // Shop item pattern: e.g. 501:100 or -1,501:100
        if (/^:\d+/.test(after)) {
            const known = Object.values(COMMON_RATHENA_CONSTANTS).find(c => c.type === "item" && c.id === numId);
            return { type: "item", id: numId, name: known ? known.name : "", context: "Shop Item" };
        }

        let stmtStart = start - 1;
        while (stmtStart >= 0 && line[stmtStart] !== ";" && line[stmtStart] !== "{" && line[stmtStart] !== "}") {
            stmtStart--;
        }
        const stmt = line.substring(stmtStart + 1, start).trim();

        let parenDepth = 0;
        let lastOpenParenIdx = -1;
        for (let i = stmt.length - 1; i >= 0; i--) {
            if (stmt[i] === ")") parenDepth++;
            else if (stmt[i] === "(") {
                if (parenDepth === 0) {
                    lastOpenParenIdx = i;
                    break;
                }
                parenDepth--;
            }
        }

        let cmd = "";
        let argsStr = "";

        if (lastOpenParenIdx !== -1) {
            const beforeParen = stmt.substring(0, lastOpenParenIdx).trim();
            const cmdMatch = beforeParen.match(/([a-zA-Z0-9_]+)$/);
            if (cmdMatch) {
                cmd = cmdMatch[1].toLowerCase();
                argsStr = stmt.substring(lastOpenParenIdx + 1);
            }
        } else {
            const cmdMatch = stmt.match(/^([a-zA-Z0-9_]+)\b([\s\S]*)$/);
            if (cmdMatch) {
                cmd = cmdMatch[1].toLowerCase();
                argsStr = cmdMatch[2];
            }
        }

        if (!cmd) {
            if (/(item|equip|card)/i.test(stmt) && (/=|\bset\b/i.test(stmt))) {
                const known = Object.values(COMMON_RATHENA_CONSTANTS).find(c => c.type === "item" && c.id === numId);
                return { type: "item", id: numId, name: known ? known.name : "", context: "Variable Assignment" };
            }
            if (/(mob|monster)/i.test(stmt) && (/=|\bset\b/i.test(stmt))) {
                const known = Object.values(COMMON_RATHENA_CONSTANTS).find(c => c.type === "monster" && c.id === numId);
                return { type: "monster", id: numId, name: known ? known.name : "", context: "Variable Assignment" };
            }
            return null;
        }

        let commas = 0;
        let inQuotes = false;
        let quoteChar = "";
        for (let i = 0; i < argsStr.length; i++) {
            const ch = argsStr[i];
            if ((ch === "\"" || ch === "\'") && (i === 0 || argsStr[i-1] !== "\\")) {
                if (!inQuotes) { inQuotes = true; quoteChar = ch; }
                else if (quoteChar === ch) { inQuotes = false; }
            } else if (!inQuotes && ch === ",") {
                commas++;
            }
        }
        const argIndex = commas;

        const itemArg0 = [
            "getitem", "getitembound", "rentitem", "delitem", "delitem2", "rentitem2",
            "countitem", "countitem2", "checkweight", "checkweight2", "equip", "makeitem",
            "itemskill", "consumeitem", "additem", "delitemfromcart", "cartdelitem",
            "storage_delitem", "guildstorage_delitem", "failedrefitem", "successrefitem",
            "downrefitem", "searchitem", "checkitem", "getiteminfo", "getitemname"
        ];

        if (itemArg0.includes(cmd) && argIndex === 0) {
            const known = Object.values(COMMON_RATHENA_CONSTANTS).find(c => c.type === "item" && c.id === numId);
            return { type: "item", id: numId, name: known ? known.name : "", command: cmd, argIndex: 0 };
        }

        if (cmd === "getitem2" || cmd === "getitembound2") {
            if (argIndex === 0) {
                const known = Object.values(COMMON_RATHENA_CONSTANTS).find(c => c.type === "item" && c.id === numId);
                return { type: "item", id: numId, name: known ? known.name : "", command: cmd, argIndex: 0 };
            }
            if (argIndex >= 5 && argIndex <= 8) {
                const known = Object.values(COMMON_RATHENA_CONSTANTS).find(c => c.type === "item" && c.id === numId);
                return { type: "item", id: numId, name: known ? known.name : "", command: cmd, argIndex, isCard: true };
            }
        }

        if ((cmd === "monster" || cmd === "strmonster") && argIndex === 4) {
            let mobName = "";
            const parts = argsStr.split(",");
            if (parts.length > 3) {
                mobName = parts[3].trim().replace(/^["']|["']$/g, "");
            }
            if (!mobName) {
                const known = Object.values(COMMON_RATHENA_CONSTANTS).find(c => c.type === "monster" && c.id === numId);
                if (known) mobName = known.name;
            }
            return { type: "monster", id: numId, command: cmd, argIndex: 4, name: mobName };
        }

        if (cmd === "areamonster" && argIndex === 6) {
            let mobName = "";
            const parts = argsStr.split(",");
            if (parts.length > 5) {
                mobName = parts[5].trim().replace(/^["']|["']$/g, "");
            }
            if (!mobName) {
                const known = Object.values(COMMON_RATHENA_CONSTANTS).find(c => c.type === "monster" && c.id === numId);
                if (known) mobName = known.name;
            }
            return { type: "monster", id: numId, command: cmd, argIndex: 6, name: mobName };
        }

        if (cmd === "summon" && argIndex === 1) {
            let mobName = "";
            const parts = argsStr.split(",");
            if (parts.length > 0) {
                mobName = parts[0].trim().replace(/^["']|["']$/g, "");
            }
            if (!mobName) {
                const known = Object.values(COMMON_RATHENA_CONSTANTS).find(c => c.type === "monster" && c.id === numId);
                if (known) mobName = known.name;
            }
            return { type: "monster", id: numId, command: cmd, argIndex: 1, name: mobName };
        }

        if ((cmd === "makepet" || cmd === "spawn" || cmd === "unitspawn") && argIndex === 0) {
            const known = Object.values(COMMON_RATHENA_CONSTANTS).find(c => c.type === "monster" && c.id === numId);
            return { type: "monster", id: numId, command: cmd, argIndex: 0, name: known ? known.name : "" };
        }

        if (cmd === "clone" && argIndex === 5) {
            const known = Object.values(COMMON_RATHENA_CONSTANTS).find(c => c.type === "monster" && c.id === numId);
            return { type: "monster", id: numId, command: cmd, argIndex: 5, name: known ? known.name : "" };
        }

        if (cmd === "setnpcdisplay" && (argIndex === 1 || argIndex === 3) && numId > 0) {
            let npcName = "";
            const parts = argsStr.split(",");
            if (parts.length > 0) {
                npcName = parts[0].trim().replace(/^["']|["']$/g, "");
            }
            return {
                type: "npc",
                id: numId,
                name: npcName || `NPC #${numId}`,
                command: "setnpcdisplay",
                argIndex: argIndex,
                context: "setnpcdisplay() command"
            };
        }

        if (/(item|equip|card)/i.test(cmd) && (/=|\bset\b/i.test(stmt))) {
            const known = Object.values(COMMON_RATHENA_CONSTANTS).find(c => c.type === "item" && c.id === numId);
            return { type: "item", id: numId, name: known ? known.name : "", context: "Variable Assignment" };
        }
        if (/(mob|monster)/i.test(cmd) && (/=|\bset\b/i.test(stmt))) {
            const known = Object.values(COMMON_RATHENA_CONSTANTS).find(c => c.type === "monster" && c.id === numId);
            return { type: "monster", id: numId, name: known ? known.name : "", context: "Variable Assignment" };
        }

        return null;
    }

    onMouseMove(e) {
        if (!documentationTooltipEnabled) {
            this.hideTooltip();
            return;
        }
        const editor = this.editor;
        const element = this.tooltip.getElement ? this.tooltip.getElement() : this.tooltip.element;

        if (element && element.contains(e.domEvent.target)) {
            return;
        }

        const pos = e.getDocumentPosition();
        const token = editor.session.getTokenAt(pos.row, pos.column);
        const line = editor.session.getLine(pos.row);
        
        let isValidToken = false;
        let tokenVal = null;
        let docData = null;
        let spriteData = null;

        // 1. Check if hovering over an itemID or monsterID in script
        const spriteTarget = this.detectSpriteTarget(line, pos.column, token);
        if (spriteTarget) {
            spriteData = spriteTarget;
            tokenVal = "sprite:" + spriteTarget.type + ":" + spriteTarget.id;
            isValidToken = true;
        } else if (token && (token.type.indexOf("support.function") !== -1 || 
                             token.type.indexOf("keyword") !== -1 || 
                             token.type.indexOf("identifier") !== -1 || 
                             token.type.indexOf("constant") !== -1 ||
                             token.type.indexOf("variable") !== -1)) {
            tokenVal = token.value;
            docData = rathenaDocMap[tokenVal];
            if (!docData && (tokenVal.startsWith('$') || tokenVal.startsWith('@'))) {
                docData = rathenaDocMap[tokenVal.substring(1)];
            }
            if (docData) {
                isValidToken = true;
            }
        }

        let mojibakeData = null;
        if (!isValidToken && token && token.value) {
            const rawVal = token.value.replace(/^["']|["']$/g, '').trim();
            if (isMojibakeString(rawVal)) {
                const korean = mojibakeToKorean(rawVal);
                if (korean && /[\uAC00-\uD7A3]/.test(korean)) {
                    mojibakeData = {
                        mojibake: rawVal,
                        korean: korean
                    };
                    tokenVal = "mojibake:" + rawVal;
                    isValidToken = true;
                }
            }
        }

        if (isValidToken) {
            if (this.currentToken === tokenVal) {
                return;
            }

            if (this.pendingToken === tokenVal) {
                this.cachedEvent = {
                    clientX: e.clientX,
                    clientY: e.clientY,
                    pos: pos,
                    docData: docData,
                    spriteData: spriteData,
                    mojibakeData: mojibakeData,
                    tokenVal: tokenVal
                };
                return;
            }

            if (this.hoverTimeout) {
                clearTimeout(this.hoverTimeout);
            }
            
            this.destroyActiveEmbeddedEditors();
            this.currentToken = null;
            this.tooltip.hide();

            this.pendingToken = tokenVal;
            this.cachedEvent = {
                clientX: e.clientX,
                clientY: e.clientY,
                pos: pos,
                docData: docData,
                spriteData: spriteData,
                mojibakeData: mojibakeData,
                tokenVal: tokenVal
            };

            this.hoverTimeout = setTimeout(() => {
                if (!this.cachedEvent) return;
                const cached = this.cachedEvent;
                
                this.currentToken = cached.tokenVal;
                this.pendingToken = null;
                this.hoverTimeout = null;

                const element = this.tooltip.getElement ? this.tooltip.getElement() : this.tooltip.element;

                if (cached.spriteData) {
                    const spriteTarget = cached.spriteData;
                    const isItem = spriteTarget.type === "item";
                    const isMonster = spriteTarget.type === "monster";
                    const isNpc = spriteTarget.type === "npc";
                    const typeLabel = isItem ? "Item" : (isMonster ? "Monster" : "NPC");
                    
                    // NPCs and Monsters use animated GIF from RateMyServer
                    // Items use iRO Wiki PNG with fallback to Divine Pride
                    const primaryUrl = isNpc
                        ? `https://file5s.ratemyserver.net/quests/npcs/${spriteTarget.id}.gif`
                        : (isItem 
                            ? `https://db.irowiki.org/image/item/${spriteTarget.id}.png`
                            : `https://file5s.ratemyserver.net/mobs/${spriteTarget.id}.gif`);
                    const fallbackUrls = isNpc
                        ? [
                            `https://static.divine-pride.net/images/npcs/png/${spriteTarget.id}.png`,
                            `https://static.divine-pride.net/images/npcs/collection/${spriteTarget.id}.png`
                          ]
                        : (isItem 
                            ? [
                                `https://static.divine-pride.net/images/items/item/${spriteTarget.id}.png`,
                                `https://static.divine-pride.net/images/items/collection/${spriteTarget.id}.png`
                              ]
                            : [
                                `https://static.divine-pride.net/images/mobs/png/${spriteTarget.id}.png`,
                                `https://db.irowiki.org/image/monster/${spriteTarget.id}.png`
                              ]);

                    const badgeColor = isNpc ? "#34d399" : (isItem ? "#38bdf8" : "#c084fc");
                    const badgeBg = isNpc ? "rgba(52, 211, 153, 0.15)" : (isItem ? "rgba(56, 189, 248, 0.15)" : "rgba(192, 132, 252, 0.15)");
                    const badgeBorder = isNpc ? "rgba(52, 211, 153, 0.35)" : (isItem ? "rgba(56, 189, 248, 0.35)" : "rgba(192, 132, 252, 0.35)");

                    const displayName = isNpc
                        ? (spriteTarget.name ? `NPC #${spriteTarget.id} (${spriteTarget.name})` : `NPC #${spriteTarget.id}`)
                        : (spriteTarget.name ? `${typeLabel} #${spriteTarget.id} (${spriteTarget.name})` : `${typeLabel} #${spriteTarget.id}`);

                    const subDetail = isNpc
                        ? (spriteTarget.context || "NPC Structure")
                        : (spriteTarget.isCard 
                            ? "Socketed Card Reference" 
                            : (spriteTarget.command ? `Command: ${spriteTarget.command}()` : (spriteTarget.context || "Script Reference")));

                    const html = `
                        <div class="sprite-tooltip-container" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; min-width: ${isMonster || isNpc ? '180px' : '250px'}; max-width: 320px;">
                            ${isMonster ? `
                            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
                                <span style="font-size: 11.5px; font-weight: 700; color: var(--tooltipHeaderColor, #c084fc); font-family: 'JetBrains Mono', monospace; letter-spacing: 0.3px;">
                                    Animated Monster GIF
                                </span>
                                <div style="display: flex; align-items: center; gap: 6px;">
                                    <button id="sprite-reload-btn" type="button" title="Refresh sprite (bypass cache)" style="background: transparent; border: 1px solid var(--tooltipDivider, rgba(255,255,255,0.15)); color: var(--searchCounterColor, #9aa0a6); cursor: pointer; padding: 1px 5px; font-size: 11px; border-radius: 4px; line-height: 1.2; transition: all 0.15s ease;">
                                        ↻
                                    </button>
                                    <span style="font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; padding: 2px 7px; border-radius: 4px; background: ${badgeBg}; color: ${badgeColor}; border: 1px solid ${badgeBorder};">
                                        Monster
                                    </span>
                                </div>
                            </div>
                            ` : (isNpc ? `
                            <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--tooltipDivider, rgba(255,255,255,0.1)); padding-bottom: 7px; margin-bottom: 8px;">
                                <div>
                                    <div style="font-size: 13px; font-weight: 700; color: var(--tooltipHeaderColor, #34d399); font-family: 'JetBrains Mono', monospace;">
                                        ${displayName}
                                    </div>
                                    ${subDetail ? `
                                    <div style="font-size: 11px; color: var(--searchCounterColor, #9aa0a6); margin-top: 1px;">
                                        ${subDetail}
                                    </div>
                                    ` : ''}
                                </div>
                                <div style="display: flex; align-items: center; gap: 6px;">
                                    <button id="sprite-reload-btn" type="button" title="Refresh sprite (bypass cache)" style="background: transparent; border: 1px solid var(--tooltipDivider, rgba(255,255,255,0.15)); color: var(--searchCounterColor, #9aa0a6); cursor: pointer; padding: 1px 5px; font-size: 11px; border-radius: 4px; line-height: 1.2; transition: all 0.15s ease;">
                                        ↻
                                    </button>
                                    <span style="font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; padding: 2px 7px; border-radius: 4px; background: ${badgeBg}; color: ${badgeColor}; border: 1px solid ${badgeBorder}; display: inline-flex; align-items: center; gap: 4px;">
                                        NPC ID
                                    </span>
                                </div>
                            </div>
                            ` : `
                            <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--tooltipDivider, rgba(255,255,255,0.1)); padding-bottom: 7px; margin-bottom: 8px;">
                                <div>
                                    <div style="font-size: 13px; font-weight: 700; color: var(--tooltipHeaderColor, #60a5fa); font-family: 'JetBrains Mono', monospace;">
                                        ${displayName}
                                    </div>
                                    ${subDetail && !subDetail.startsWith('Command:') ? `
                                    <div style="font-size: 11px; color: var(--searchCounterColor, #9aa0a6); margin-top: 1px;">
                                        ${subDetail}
                                    </div>
                                    ` : ''}
                                </div>
                                <div style="display: flex; align-items: center; gap: 6px;">
                                    <button id="sprite-reload-btn" type="button" title="Refresh sprite (bypass cache)" style="background: transparent; border: 1px solid var(--tooltipDivider, rgba(255,255,255,0.15)); color: var(--searchCounterColor, #9aa0a6); cursor: pointer; padding: 1px 5px; font-size: 11px; border-radius: 4px; line-height: 1.2; transition: all 0.15s ease;">
                                        ↻
                                    </button>
                                    <span style="font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; padding: 2px 7px; border-radius: 4px; background: ${badgeBg}; color: ${badgeColor}; border: 1px solid ${badgeBorder}; display: inline-flex; align-items: center; gap: 4px;">
                                        ${typeLabel}
                                    </span>
                                </div>
                            </div>
                            `)}

                            <div class="sprite-preview-stage" style="min-height: ${isItem ? '80px' : '110px'};">
                                <div id="sprite-preview-loader" style="font-size: 11.5px; color: var(--searchCounterColor, #888); display: flex; align-items: center; gap: 7px;">
                                    <span style="display: inline-block; width: 12px; height: 12px; border: 2px solid ${badgeColor}; border-top-color: transparent; border-radius: 50%; animation: spin 0.8s linear infinite;"></span>
                                    ${isNpc ? 'Loading transparent NPC sprite...' : (isMonster ? 'Loading animated monster GIF...' : 'Loading transparent item sprite...')}
                                </div>
                                <img id="sprite-preview-img" class="sprite-preview-img" style="display: none;" alt="${displayName}" title="${displayName}" />
                                <div id="sprite-preview-error" style="display: none; color: #ef4444; font-size: 11px; text-align: center; padding: 12px 6px;">
                                    <div style="font-weight: 600; margin-bottom: 2px;">Image not found for ${typeLabel} #${spriteTarget.id}</div>
                                    <div style="color: var(--searchCounterColor, #888); font-size: 10px; margin-bottom: 8px;">
                                        (Custom ID or temporarily unavailable)
                                    </div>
                                    <button id="sprite-error-retry-btn" type="button" style="background: rgba(255,255,255,0.08); border: 1px solid var(--tooltipDivider, #555); color: var(--tooltipHeaderColor, #38bdf8); font-size: 11px; font-weight: 600; padding: 4px 12px; border-radius: 4px; cursor: pointer; display: inline-flex; align-items: center; gap: 4px; margin: 0 auto;">
                                        <span>↻</span> Retry Refresh
                                    </button>
                                </div>
                            </div>

                            <div style="display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-top: 6px; font-size: 10.5px; color: var(--searchCounterColor, #888);">
                                <span id="sprite-preview-dim" style="font-family: 'JetBrains Mono', monospace; font-size: 10px; white-space: nowrap;"></span>
                                <a id="sprite-preview-link" href="${primaryUrl}" target="_blank" rel="noopener noreferrer" style="color: var(--tooltipHeaderColor, #38bdf8); text-decoration: none; font-size: 10.5px; white-space: nowrap; flex-shrink: 0;">
                                    ${isNpc ? "RateMyServer NPC GIF ↗" : (isMonster ? "RateMyServer GIF ↗" : "iRO Wiki Image ↗")}
                                </a>
                            </div>
                        </div>
                    `;

                    this.tooltip.show("", cached.clientX, cached.clientY);
                    if (element) {
                        element.classList.add("sprite_tooltip");
                        element.innerHTML = html;
                        element.scrollTop = 0;
                        element.style.display = "block";

                        if (!element._hasWheelEvent) {
                            element.addEventListener('wheel', (evt) => {
                                evt.stopPropagation();
                            }, { passive: false });
                            element._hasWheelEvent = true;
                        }

                        if (!element._hasMouseListeners) {
                            element._hasMouseListeners = true;
                            element.addEventListener("mouseenter", () => {
                                this.isMouseOverTooltip = true;
                            });
                            element.addEventListener("mouseleave", () => {
                                this.isMouseOverTooltip = false;
                                this.hideTooltip(true);
                            });
                        }

                        const targetTokenVal = cached.tokenVal;
                        const triggerLoad = (bypassCache = false) => {
                            if (bypassCache) {
                                spriteCache.delete(primaryUrl);
                                fallbackUrls.forEach(u => spriteCache.delete(u));
                            }
                            const loader = element.querySelector("#sprite-preview-loader");
                            const imgEl = element.querySelector("#sprite-preview-img");
                            const errEl = element.querySelector("#sprite-preview-error");
                            const dimEl = element.querySelector("#sprite-preview-dim");
                            const linkEl = element.querySelector("#sprite-preview-link");

                            if (loader) loader.style.display = "flex";
                            if (imgEl) imgEl.style.display = "none";
                            if (errEl) errEl.style.display = "none";

                            this.loadTransparentSprite(primaryUrl, {
                                isGif: isMonster,
                                isNpc: isNpc,
                                fallbackUrls: fallbackUrls,
                                isItem: isItem,
                                bypassCache: bypassCache
                            }, (err, res) => {
                                if (this.currentToken !== targetTokenVal) return;

                                if (loader) loader.style.display = "none";

                                if (err || !res) {
                                    if (errEl) errEl.style.display = "block";
                                    if (dimEl) dimEl.textContent = "Offline / 404";
                                } else {
                                    if (imgEl) {
                                        imgEl.src = res.dataUrl;
                                        if (isItem) {
                                            const scale = res.width <= 32 ? 2 : 1;
                                            imgEl.style.width = (res.width * scale) + "px";
                                            imgEl.style.height = (res.height * scale) + "px";
                                            if (dimEl) dimEl.textContent = `${res.width}×${res.height}px` + (scale > 1 ? ` (${scale}×)` : "");
                                        } else if (isNpc) {
                                            // NPC GIF
                                            if (res.width <= 44 && res.height <= 55) {
                                                const scale = 2;
                                                imgEl.style.width = (res.width * scale) + "px";
                                                imgEl.style.height = (res.height * scale) + "px";
                                                if (dimEl) dimEl.textContent = `${res.width}×${res.height}px (2×)`;
                                            } else {
                                                imgEl.style.width = "auto";
                                                imgEl.style.height = "auto";
                                                imgEl.style.maxWidth = "200px";
                                                imgEl.style.maxHeight = "180px";
                                                if (dimEl) dimEl.textContent = `${res.width}×${res.height}px`;
                                            }
                                        } else {
                                            // Monster GIF / Sprite
                                            if (res.width <= 44 && res.height <= 44) {
                                                const scale = 2;
                                                imgEl.style.width = (res.width * scale) + "px";
                                                imgEl.style.height = (res.height * scale) + "px";
                                                if (dimEl) dimEl.textContent = `${res.width}×${res.height}px (2×)`;
                                            } else {
                                                imgEl.style.width = "auto";
                                                imgEl.style.height = "auto";
                                                imgEl.style.maxWidth = "200px";
                                                imgEl.style.maxHeight = "165px";
                                                if (dimEl) dimEl.textContent = `${res.width}×${res.height}px`;
                                            }
                                        }
                                        imgEl.style.display = "block";
                                        if (linkEl) {
                                            if (isNpc) {
                                                linkEl.href = `https://file5s.ratemyserver.net/quests/npcs/${spriteTarget.id}.gif`;
                                                linkEl.textContent = "RateMyServer NPC GIF ↗";
                                            } else if (res.sourceUrl) {
                                                linkEl.href = res.sourceUrl;
                                                const isRMS = res.sourceUrl.includes("ratemyserver");
                                                const isDP = res.sourceUrl.includes("divine-pride");
                                                linkEl.textContent = isRMS ? "RateMyServer GIF ↗" : (isDP ? "Divine Pride ↗" : "iRO Wiki Image ↗");
                                            }
                                        }
                                    }
                                }
                            });
                        };

                        const reloadBtn = element.querySelector("#sprite-reload-btn");
                        if (reloadBtn) {
                            reloadBtn.onclick = (ev) => {
                                ev.stopPropagation();
                                triggerLoad(true);
                            };
                        }
                        const errorRetryBtn = element.querySelector("#sprite-error-retry-btn");
                        if (errorRetryBtn) {
                            errorRetryBtn.onclick = (ev) => {
                                ev.stopPropagation();
                                triggerLoad(true);
                            };
                        }

                        triggerLoad(false);
                    }
                } else if (cached.docData) {
                    if (element) {
                        element.classList.remove("sprite_tooltip");
                    }
                    const html = `
                        <div style="border-bottom: 1px solid var(--tooltipDivider); padding-bottom: 6px; margin-bottom: 10px; color: var(--tooltipHeaderColor); font-size: 13px; font-weight: 600; font-family: 'JetBrains Mono', monospace; line-height: 1.4;">
                            ${cached.docData.signature}
                        </div>
                        <div style="line-height: 1.5; font-size: 11.5px; font-family: 'Inter', -apple-system, sans-serif;">
                            ${cached.docData.description}
                        </div>
                    `;
                    
                    this.tooltip.show("", cached.clientX, cached.clientY);
                    if (element) {
                        element.innerHTML = html;
                        element.scrollTop = 0;
                        element.style.display = "block";
                        
                        if (!element._hasWheelEvent) {
                            element.addEventListener('wheel', (evt) => {
                                evt.stopPropagation();
                            }, { passive: false });
                            element._hasWheelEvent = true;
                        }

                        const editorContainers = element.querySelectorAll(".tooltip-ace-editor");
                        const rawCodeScripts = element.querySelectorAll(".tooltip-ace-raw-code");
                        for (let i = 0; i < editorContainers.length; i++) {
                            const container = editorContainers[i];
                            const scriptTag = rawCodeScripts[i];
                            if (container && scriptTag) {
                                const codeText = scriptTag.textContent || scriptTag.innerText;
                                try {
                                    const embeddedEditor = ace.edit(container);
                                    embeddedEditor.setValue(codeText, -1);
                                    embeddedEditor.setTheme(currentTheme);
                                    embeddedEditor.session.setMode("ace/mode/rathena");
                                    embeddedEditor.setReadOnly(true);
                                    embeddedEditor.setShowPrintMargin(false);
                                    embeddedEditor.renderer.setShowGutter(true);
                                    embeddedEditor.setShowFoldWidgets(false);
                                    embeddedEditor.setOption("scrollPastEnd", 0);
                                    embeddedEditor.setOptions({
                                        maxLines: 12,
                                        minLines: 3,
                                        fontSize: "11px",
                                        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                                        highlightActiveLine: false,
                                        highlightGutterLine: false,
                                        showLineNumbers: true,
                                        showGutter: true,
                                        showFoldWidgets: false,
                                        fadeFoldWidgets: false
                                    });
                                    embeddedEditor.renderer.$cursorLayer.element.style.opacity = 0;
                                    this.activeEmbeddedEditors.push(embeddedEditor);
                                } catch (err) {
                                    console.error("Error creating embedded Ace editor inside tooltip:", err);
                                }
                            }
                        }
                    }
                }

                if (element) {
                    const rect = element.getBoundingClientRect();
                    const tooltipWidth = rect.width || (cached.spriteData ? 280 : 450);
                    const tooltipHeight = rect.height || (cached.spriteData ? 180 : 280);

                    const spaceAbove = cached.clientY;
                    const spaceBelow = window.innerHeight - cached.clientY;

                    let x = cached.clientX + 15;
                    let y = cached.clientY + 15;

                    if (spaceBelow >= tooltipHeight + 25) {
                        y = cached.clientY + 15;
                    } else if (spaceAbove >= tooltipHeight + 25) {
                        y = cached.clientY - tooltipHeight - 15;
                    } else {
                        const spaceRight = window.innerWidth - cached.clientX;
                        const spaceLeft = cached.clientX;

                        if (spaceRight >= tooltipWidth + 30) {
                            x = cached.clientX + 20;
                            y = Math.max(10, Math.min(window.innerHeight - tooltipHeight - 10, cached.clientY - tooltipHeight / 2));
                        } else if (spaceLeft >= tooltipWidth + 30) {
                            x = cached.clientX - tooltipWidth - 20;
                            y = Math.max(10, Math.min(window.innerHeight - tooltipHeight - 10, cached.clientY - tooltipHeight / 2));
                        } else {
                            if (spaceBelow > spaceAbove) {
                                y = cached.clientY + 15;
                            } else {
                                y = Math.max(10, cached.clientY - tooltipHeight - 15);
                            }
                        }
                    }

                    if (y === cached.clientY + 15 || y === cached.clientY - tooltipHeight - 15) {
                        if (x + tooltipWidth > window.innerWidth - 10) {
                            x = cached.clientX - tooltipWidth - 15;
                        }
                        if (x < 10) {
                            x = 10;
                        }
                    }

                    x = Math.max(10, Math.min(window.innerWidth - tooltipWidth - 10, x));
                    y = Math.max(10, Math.min(window.innerHeight - tooltipHeight - 10, y));

                    element.style.left = x + "px";
                    element.style.top = y + "px";
                } else if (cached.mojibakeData) {
                    if (element) {
                        element.classList.remove("sprite_tooltip");
                    }
                    const html = `
                        <div class="mojibake-tooltip-card">
                            <div class="mojibake-tooltip-header">
                                <span>🌐 RO Mojibake / Korean Translation</span>
                            </div>
                            <div class="mojibake-tooltip-body">
                                <div style="margin-bottom: 4px;">
                                    <span style="opacity: 0.7; font-size: 11px;">Mojibake:</span> 
                                    <code style="font-family: monospace; font-size: 12px; color: var(--syntaxString);">${cached.mojibakeData.mojibake}</code>
                                </div>
                                <div>
                                    <span style="opacity: 0.7; font-size: 11px;">Korean (EUC-KR):</span> 
                                    <b style="font-size: 13.5px; color: #2ea043;">${cached.mojibakeData.korean}</b>
                                </div>
                            </div>
                        </div>
                    `;
                    this.tooltip.show("", cached.clientX, cached.clientY);
                    if (element) {
                        element.innerHTML = html;
                        element.scrollTop = 0;
                        element.style.display = "block";
                        element.style.left = (cached.clientX + 15) + "px";
                        element.style.top = (cached.clientY + 15) + "px";
                    }
                }
            }, 600);

            return;
        }

        if (this.isMouseOverTooltip) {
            return;
        }

        if (element && this.currentToken) {
            const rect = element.getBoundingClientRect();
            const buffer = 10;
            if (e.clientX >= rect.left - buffer && e.clientX <= rect.right + buffer &&
                e.clientY >= rect.top - buffer && e.clientY <= rect.bottom + buffer) {
                return;
            }
        }

        this.hideTooltip();
    }

    onMouseOut(e) {
        if (this.isMouseOverTooltip) return;
        const element = this.tooltip.getElement ? this.tooltip.getElement() : this.tooltip.element;
        if (element && e && e.domEvent && element.contains(e.domEvent.relatedTarget)) {
            return;
        }
        this.hideTooltip();
    }
}


// Set theme on load
if (currentTheme) {
    if (currentTheme === "ace/theme/github_light_default") {
        // Apply light mode (but theme is already set, just need to set variables)
        // Need to simulate switching to light mode or just setting properties
        const root = document.documentElement;
        root.style.setProperty('--tabBarBg', '#d8ccc6');
        root.style.setProperty('--toolbarBg', '#f8f1ef');
        root.style.setProperty('--textColor', '#333');
        root.style.setProperty('--activeTabColor', '#000');
        root.style.setProperty('--tabCloseColor', '#777');
        root.style.setProperty('--darkmodeColor', '#d9d9d9');
        root.style.setProperty('--tooltipBg', '#fff');
        root.style.setProperty('--tooltipColor', '#333');
        root.style.setProperty('--tooltipBorder', '#ccc');
        root.style.setProperty('--tooltipHeaderColor', '#0056b3');
        root.style.setProperty('--tooltipDivider', '#eee');
        root.style.setProperty('--diffAddedBg', '#e6ffec');
        root.style.setProperty('--diffAddedColor', '#155724');
        root.style.setProperty('--diffAddedHighlightBg', '#68ffa0');
        root.style.setProperty('--diffRemovedBg', '#ffebe9');
        root.style.setProperty('--diffRemovedColor', '#721c24');
        root.style.setProperty('--diffRemovedHighlightBg', '#ffc5c2');
        root.style.setProperty('--scrollbarTrack', '#f1f1f1');
        root.style.setProperty('--scrollbarThumb', '#888');
        root.style.setProperty('--scrollbarThumbHover', '#555');
        root.style.setProperty('--btnBg', '#e9ecef');
        root.style.setProperty('--btnText', '#333');
        root.style.setProperty('--closeBtnColor', '#777');
        
        // rAthena Syntax Highlighting for Light Mode
        root.style.setProperty('--syntaxString', '#032f62');
        root.style.setProperty('--syntaxComment', '#6a737d');
        root.style.setProperty('--syntaxNumber', '#005cc5');
        root.style.setProperty('--syntaxKeyword', '#d73a49');
        root.style.setProperty('--syntaxFunction', '#6f42c1');
        root.style.setProperty('--syntaxVariable', '#e36209');
        root.style.setProperty('--syntaxConstant', '#b07d00');
        root.style.setProperty('--sidebarResizerBg', '#d0c4bd');
        root.style.setProperty('--sidebarResizerBorder', 'rgba(0, 0, 0, 0.12)');
        root.style.setProperty('--sidebarResizerHoverBg', '#3b82f6');
    } else {
        // Already dark mode (monokai)
        const root = document.documentElement;
        root.style.setProperty('--tabBarBg', '#2e2e2e');
        root.style.setProperty('--toolbarBg', '#3e3e3e');
        root.style.setProperty('--textColor', '#ddd');
        root.style.setProperty('--activeTabColor', '#fff');
        root.style.setProperty('--tabCloseColor', '#bbb');
        root.style.setProperty('--darkmodeColor', '#686868');
        root.style.setProperty('--tooltipBg', '#1e1e1e');
        root.style.setProperty('--tooltipColor', '#d4d4d4');
        root.style.setProperty('--tooltipBorder', '#454545');
        root.style.setProperty('--tooltipHeaderColor', '#66d9ef');
        root.style.setProperty('--tooltipDivider', '#444');
        root.style.setProperty('--diffAddedBg', '#1e3a1e');
        root.style.setProperty('--diffAddedColor', '#a3d9a3');
        root.style.setProperty('--diffAddedHighlightBg', 'rgba(46, 160, 67, 0.5)');
        root.style.setProperty('--diffRemovedBg', '#4a1e1e');
        root.style.setProperty('--diffRemovedColor', '#e6a3a3');
        root.style.setProperty('--diffRemovedHighlightBg', '#7a3232');
        root.style.setProperty('--scrollbarTrack', '#252525');
        root.style.setProperty('--scrollbarThumb', '#666');
        root.style.setProperty('--scrollbarThumbHover', '#555');
        root.style.setProperty('--btnBg', '#444');
        root.style.setProperty('--btnText', '#fff');
        root.style.setProperty('--closeBtnColor', '#bbb');
        
        // rAthena Syntax Highlighting for Dark Mode
        root.style.setProperty('--syntaxString', '#e6db74');
        root.style.setProperty('--syntaxComment', '#75715e');
        root.style.setProperty('--syntaxNumber', '#ae81ff');
        root.style.setProperty('--syntaxKeyword', '#f92672');
        root.style.setProperty('--syntaxFunction', '#66d9ef');
        root.style.setProperty('--syntaxVariable', '#a6e22e');
        root.style.setProperty('--syntaxConstant', '#fd971f');
        root.style.setProperty('--sidebarResizerBg', '#252525');
        root.style.setProperty('--sidebarResizerBorder', 'rgba(255, 255, 255, 0.08)');
        root.style.setProperty('--sidebarResizerHoverBg', '#3b82f6');
    }
}
parseRathenaDocs();
parseNewTooltipDocs();


// API Key persistence
const apiKeyInput = document.getElementById("APIKey");
if (apiKeyInput) {
    const savedApiKey = localStorage.getItem("geminiApiKey");
    if (savedApiKey) {
        apiKeyInput.value = savedApiKey;
    }
    apiKeyInput.addEventListener("input", (e) => {
        localStorage.setItem("geminiApiKey", e.target.value);
    });
}

// IndexedDB persistence for open files / tabs
const DB_NAME = "rathena_editor_db";
const DB_VERSION = 1;
const STORE_TABS = "open_tabs";
const STORE_META = "session_meta";

const tabDB = {
    db: null,

    async open() {
        if (this.db) return this.db;
        return new Promise((resolve, reject) => {
            if (!window.indexedDB) {
                return reject(new Error("IndexedDB is not supported"));
            }
            const request = indexedDB.open(DB_NAME, DB_VERSION);
            request.onupgradeneeded = (e) => {
                const db = e.target.result;
                if (!db.objectStoreNames.contains(STORE_TABS)) {
                    db.createObjectStore(STORE_TABS, { keyPath: "id" });
                }
                if (!db.objectStoreNames.contains(STORE_META)) {
                    db.createObjectStore(STORE_META, { keyPath: "key" });
                }
            };
            request.onsuccess = (e) => {
                this.db = e.target.result;
                this.db.onversionchange = () => {
                    try { this.db.close(); } catch(err) {}
                    this.db = null;
                };
                this.db.onclose = () => {
                    this.db = null;
                };
                resolve(this.db);
            };
            request.onerror = (e) => {
                console.error("IndexedDB open error:", e);
                reject(e);
            };
        });
    },

    createTabRecord(tab, orderIndex) {
        const cursor = tab.editor ? tab.editor.getCursorPosition() : null;
        const scrollTop = tab.editor && tab.editor.session ? tab.editor.session.getScrollTop() : 0;
        const scrollLeft = tab.editor && tab.editor.session ? tab.editor.session.getScrollLeft() : 0;
        const code = tab.editor ? tab.editor.getValue() : (tab.lastSavedCode || "");

        const record = {
            id: tab.id,
            name: tab.name || "Untitled",
            code: code,
            lastSavedCode: (tab.lastSavedCode !== undefined) ? tab.lastSavedCode : "",
            lastModified: tab.lastModified || 0,
            orderIndex: typeof orderIndex === 'number' ? orderIndex : 0,
            cursorPosition: cursor,
            scrollTop: scrollTop,
            scrollLeft: scrollLeft,
            currentHistoryIndex: typeof tab.currentHistoryIndex === 'number' ? tab.currentHistoryIndex : -1,
            codeHistory: Array.isArray(tab.codeHistory) ? tab.codeHistory.slice(-25) : [],
            diffHistory: Array.isArray(tab.diffHistory) ? tab.diffHistory.slice(-25) : [],
            chatHistory: Array.isArray(tab.chatHistory) ? tab.chatHistory.slice(-50) : [],
            chatMessagesHTML: tab.elements && tab.elements.chatMessages ? tab.elements.chatMessages.innerHTML : "",
            encoding: tab.encoding || "windows-1252",
            savedAt: Date.now()
        };

        if (tab.fileHandle) {
            record.fileHandle = tab.fileHandle;
        }

        if (tab.relativePath) {
            record.relativePath = tab.relativePath;
        }

        return record;
    },

    async saveTab(tab, orderIndex) {
        if (!tab || !tab.id) return;
        try {
            const db = await this.open();
            const record = this.createTabRecord(tab, orderIndex);
            return new Promise((resolve, reject) => {
                const tx = db.transaction([STORE_TABS], "readwrite");
                const store = tx.objectStore(STORE_TABS);

                try {
                    store.put(record);
                } catch (putErr) {
                    if (putErr && putErr.name === 'DataCloneError') {
                        delete record.fileHandle;
                        store.put(record);
                    } else {
                        throw putErr;
                    }
                }

                tx.oncomplete = () => {
                    this.updateBackup();
                    resolve();
                };
                tx.onerror = (err) => {
                    reject(err);
                };
            });
        } catch (err) {
            console.warn("tabDB.saveTab error:", err);
            this.updateBackup();
        }
    },

    async removeTab(tabId) {
        if (tabId === undefined || tabId === null) return;
        try {
            const db = await this.open();
            return new Promise((resolve, reject) => {
                const tx = db.transaction([STORE_TABS], "readwrite");
                const store = tx.objectStore(STORE_TABS);
                store.delete(tabId);
                if (typeof tabId === 'string' && !isNaN(Number(tabId))) {
                    store.delete(Number(tabId));
                } else if (typeof tabId === 'number') {
                    store.delete(String(tabId));
                }
                tx.oncomplete = () => {
                    this.updateBackup();
                    resolve();
                };
                tx.onerror = (err) => {
                    this.updateBackup();
                    reject(err);
                };
            });
        } catch (err) {
            console.warn("tabDB.removeTab error:", err);
            this.updateBackup();
        }
    },

    async syncTabs(tabs, activeTabId) {
        if (!Array.isArray(tabs)) return;
        try {
            const db = await this.open();
            return new Promise((resolve, reject) => {
                const tx = db.transaction([STORE_TABS, STORE_META], "readwrite");
                const tabStore = tx.objectStore(STORE_TABS);
                const metaStore = tx.objectStore(STORE_META);

                const activeIds = new Set(tabs.map(t => t.id));
                const activeIdStrings = new Set(tabs.map(t => String(t.id)));

                const reqKeys = tabStore.getAllKeys();
                reqKeys.onsuccess = () => {
                    const keys = reqKeys.result || [];
                    keys.forEach(k => {
                        if (!activeIds.has(k) && !activeIdStrings.has(String(k))) {
                            tabStore.delete(k);
                        }
                    });

                    tabs.forEach((tab, index) => {
                        const record = this.createTabRecord(tab, index);
                        try {
                            tabStore.put(record);
                        } catch (e) {
                            if (e && e.name === 'DataCloneError') {
                                delete record.fileHandle;
                                tabStore.put(record);
                            }
                        }
                    });

                    if (activeTabId !== undefined && activeTabId !== null) {
                        metaStore.put({ key: "activeTabId", value: activeTabId });
                    }
                };

                tx.oncomplete = () => {
                    this.updateBackup();
                    resolve();
                };
                tx.onerror = (err) => reject(err);
            });
        } catch (err) {
            console.warn("tabDB.syncTabs error:", err);
            this.updateBackup();
        }
    },

    async getAllTabs() {
        try {
            const db = await this.open();
            return new Promise((resolve) => {
                const tx = db.transaction([STORE_TABS], "readonly");
                const store = tx.objectStore(STORE_TABS);
                const request = store.getAll();
                request.onsuccess = () => {
                    let list = request.result || [];
                    list.sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0));
                    if (list.length > 0) {
                        resolve(list);
                    } else {
                        resolve(this.getBackupTabs());
                    }
                };
                request.onerror = () => {
                    resolve(this.getBackupTabs());
                };
            });
        } catch (err) {
            console.warn("tabDB.getAllTabs error, checking backup:", err);
            return this.getBackupTabs();
        }
    },

    getBackupTabs() {
        try {
            const raw = localStorage.getItem("rathena_open_tabs_backup");
            if (raw) {
                const parsed = JSON.parse(raw);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    return parsed;
                }
            }
        } catch (e) {}
        return [];
    },

    updateBackup() {
        if (typeof tabManager === 'undefined' || !Array.isArray(tabManager.tabs)) return;
        try {
            const backupList = tabManager.tabs.map((tab, idx) => {
                return {
                    id: tab.id,
                    name: tab.name || "Untitled",
                    code: tab.editor ? tab.editor.getValue() : (tab.lastSavedCode || ""),
                    lastSavedCode: (tab.lastSavedCode !== undefined) ? tab.lastSavedCode : "",
                    lastModified: tab.lastModified || 0,
                    orderIndex: idx,
                    cursorPosition: tab.editor ? tab.editor.getCursorPosition() : null,
                    scrollTop: tab.editor && tab.editor.session ? tab.editor.session.getScrollTop() : 0,
                    scrollLeft: tab.editor && tab.editor.session ? tab.editor.session.getScrollLeft() : 0,
                    currentHistoryIndex: typeof tab.currentHistoryIndex === 'number' ? tab.currentHistoryIndex : -1,
                    codeHistory: Array.isArray(tab.codeHistory) ? tab.codeHistory.slice(-10) : [],
                    diffHistory: Array.isArray(tab.diffHistory) ? tab.diffHistory.slice(-10) : [],
                    chatHistory: Array.isArray(tab.chatHistory) ? tab.chatHistory.slice(-20) : [],
                    chatMessagesHTML: tab.elements && tab.elements.chatMessages ? tab.elements.chatMessages.innerHTML : ""
                };
            });
            localStorage.setItem("rathena_open_tabs_backup", JSON.stringify(backupList));
            if (tabManager.activeTab) {
                localStorage.setItem("rathena_active_tab_backup", String(tabManager.activeTab.id));
            }
        } catch (e) {
            // Ignore quota errors
        }
    },

    async saveActiveTabId(activeId) {
        if (!activeId) return;
        try {
            localStorage.setItem("rathena_active_tab_backup", String(activeId));
            const db = await this.open();
            return new Promise((resolve, reject) => {
                const tx = db.transaction([STORE_META], "readwrite");
                const store = tx.objectStore(STORE_META);
                store.put({ key: "activeTabId", value: activeId });
                tx.oncomplete = () => resolve();
                tx.onerror = (err) => reject(err);
            });
        } catch (err) {
            console.warn("tabDB.saveActiveTabId error:", err);
        }
    },

    async getActiveTabId() {
        try {
            const db = await this.open();
            return new Promise((resolve) => {
                const tx = db.transaction([STORE_META], "readonly");
                const store = tx.objectStore(STORE_META);
                const req = store.get("activeTabId");
                req.onsuccess = () => {
                    const val = req.result ? req.result.value : null;
                    resolve(val || localStorage.getItem("rathena_active_tab_backup"));
                };
                req.onerror = () => resolve(localStorage.getItem("rathena_active_tab_backup"));
            });
        } catch (err) {
            return localStorage.getItem("rathena_active_tab_backup");
        }
    }
};

const tabManager = {
    tabs: [],
    closedTabs: [],
    activeTab: null,
    nextId: 1,
    lastDirectoryHandle: null,
    draggedTabIndex: null,
    latestSelectedText: "",
    menuX: 0,
    menuY: 0,

    addTab() {
        const tab = new Tab(this.nextId++, "Untitled");
        this.tabs.push(tab);
        this.renderTabs();
        this.switchTab(tab.id);
        tabDB.saveTab(tab, this.tabs.indexOf(tab));
        tabDB.saveActiveTabId(tab.id);
        return tab;
    },

    switchTab(id) {
        const tab = this.tabs.find(t => t.id === id);
        if (!tab) return;
        if (this.activeTab) this.activeTab.deactivate();
        this.activeTab = tab;
        tab.activate();
        
        // Reattach global status bar to active tab's editor
        if (typeof ace.require("ace/ext/statusbar") !== "undefined") {
            const StatusBar = ace.require("ace/ext/statusbar").StatusBar;
            const statusBarElem = document.getElementById("statusBar");
            statusBarElem.innerHTML = ""; // Clear old one
            new StatusBar(tab.editor, statusBarElem);
        }
        updateStatusBarEncoding(tab);
        updateMojibakeModalUI();

        this.renderTabs();
        tabDB.saveActiveTabId(tab.id);
        if (typeof folderTreeManager !== 'undefined' && folderTreeManager) {
            folderTreeManager.syncActiveTabWithTree(tab);
        }

        const activeBtn = document.querySelector(`.tab-button[data-id="${tab.id}"]`);
        if (activeBtn) {
            activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
        }
    },

    closeTab(id, e) {
        if (e) e.stopPropagation();
        const index = this.tabs.findIndex(t => t.id === id);
        if (index === -1) return;
        
        const tab = this.tabs[index];
        if (tab.isDirty()) {
            const isUntitled = (tab.name === "Untitled");
            openCloseTabConfirmModal(tab.id, tab.name, isUntitled);
            return;
        }

        this.forceCloseTab(id);
    },

    forceCloseTab(id) {
        const index = this.tabs.findIndex(t => t.id === id);
        if (index === -1) return;
        
        const tab = this.tabs[index];
        if (!this.closedTabs) {
            this.closedTabs = [];
        }
        this.closedTabs.push({
            name: tab.name,
            code: tab.editor.getValue(),
            fileHandle: tab.fileHandle,
            chatHistory: JSON.parse(JSON.stringify(tab.chatHistory || [])),
            diffHistory: JSON.parse(JSON.stringify(tab.diffHistory || [])),
            codeHistory: [...(tab.codeHistory || [])],
            currentHistoryIndex: tab.currentHistoryIndex,
            lastSavedCode: tab.lastSavedCode,
            chatMessagesHTML: tab.elements && tab.elements.chatMessages ? tab.elements.chatMessages.innerHTML : ""
        });
        if (this.closedTabs.length > 20) {
            this.closedTabs.shift();
        }

        // Remove from IndexedDB immediately upon closing file
        tabDB.removeTab(id);

        const container = document.getElementById("tabsContainer");
        const closingBtn = container ? container.querySelector(`.tab-button[data-id="${id}"]`) : null;

        // Immediately start the closing collapse & fade animation before DOM state changes
        if (closingBtn) {
            closingBtn.classList.remove("active");
            closingBtn.classList.add("tab-closing");
        }

        this.tabs.splice(index, 1);
        tab.elements.content.remove();
        
        if (this.tabs.length === 0) {
            // When closing the last remaining tab, smoothly animate in a new Untitled tab
            const newTab = new Tab(this.nextId++, "Untitled");
            this.tabs.push(newTab);
            this.renderTabs(true);
            this.switchTab(newTab.id);
            tabDB.saveTab(newTab, 0);
            tabDB.saveActiveTabId(newTab.id);

            if (closingBtn) {
                setTimeout(() => {
                    if (closingBtn && closingBtn.parentNode) {
                        closingBtn.remove();
                    }
                    this.renderTabs();
                }, 240);
            }
        } else {
            const nextActiveId = (this.activeTab && this.activeTab.id === id)
                ? this.tabs[Math.max(0, index - 1)].id
                : (this.activeTab ? this.activeTab.id : this.tabs[0].id);

            if (this.activeTab && this.activeTab.id === id) {
                this.switchTab(nextActiveId);
            } else {
                this.renderTabs();
            }

            // Immediately trigger compression/recompression update for the remaining tabs
            this.updateTabCompression();

            if (closingBtn) {
                setTimeout(() => {
                    if (closingBtn && closingBtn.parentNode) {
                        closingBtn.remove();
                    }
                    this.renderTabs();
                }, 240);
            }
        }
        this.saveAllTabsToDB();
    },

    saveAllTabsToDB() {
        tabDB.syncTabs(this.tabs, this.activeTab ? this.activeTab.id : null);
    },

    flushAllTabsToDB() {
        this.tabs.forEach(tab => {
            if (tab.dbSaveTimeout) {
                clearTimeout(tab.dbSaveTimeout);
                tab.dbSaveTimeout = null;
            }
        });

        tabDB.updateBackup();

        if (tabDB.db) {
            try {
                const tx = tabDB.db.transaction([STORE_TABS, STORE_META], "readwrite");
                const tabStore = tx.objectStore(STORE_TABS);
                const metaStore = tx.objectStore(STORE_META);

                this.tabs.forEach((tab, index) => {
                    const record = tabDB.createTabRecord(tab, index);
                    try {
                        tabStore.put(record);
                    } catch (e) {
                        if (e && e.name === 'DataCloneError') {
                            delete record.fileHandle;
                            tabStore.put(record);
                        }
                    }
                });

                if (this.activeTab) {
                    metaStore.put({ key: "activeTabId", value: this.activeTab.id });
                }
            } catch (err) {
                console.warn("flushAllTabsToDB error:", err);
            }
        }
    },

    async initSession() {
        try {
            const savedTabs = await tabDB.getAllTabs();
            if (savedTabs && savedTabs.length > 0) {
                let maxId = 0;
                savedTabs.forEach(data => {
                    if (data.id && typeof data.id === 'number') {
                        maxId = Math.max(maxId, data.id);
                    }
                });
                this.nextId = Math.max(this.nextId, maxId + 1);

                const activeTabId = await tabDB.getActiveTabId();
                let tabToActivate = null;

                for (let i = 0; i < savedTabs.length; i++) {
                    const tabData = savedTabs[i];
                    const tabId = (typeof tabData.id === 'number' || typeof tabData.id === 'string') && tabData.id !== ""
                        ? tabData.id
                        : this.nextId++;
                    const tab = new Tab(tabId, tabData.name || "Untitled");
                    tab.encoding = tabData.encoding || "windows-1252";
                    tab.fileHandle = tabData.fileHandle || null;
                    tab.relativePath = tabData.relativePath || "";
                    tab.lastSavedCode = (tabData.lastSavedCode !== undefined) ? tabData.lastSavedCode : (tabData.code || "");
                    tab.chatHistory = tabData.chatHistory || [];
                    tab.diffHistory = tabData.diffHistory || [];
                    tab.codeHistory = tabData.codeHistory || [];
                    tab.currentHistoryIndex = typeof tabData.currentHistoryIndex === 'number' ? tabData.currentHistoryIndex : -1;
                    tab.lastModified = tabData.lastModified || 0;

                    if (tab.editor && tabData.code !== undefined) {
                        tab.editor.setValue(tabData.code, -1);
                        tab.editor.clearSelection();
                        tab.editor.session.setUndoManager(new ace.UndoManager());

                        if (tabData.cursorPosition) {
                            try {
                                tab.editor.moveCursorToPosition(tabData.cursorPosition);
                            } catch (e) {}
                        }
                        if (tabData.scrollTop !== undefined) {
                            try {
                                tab.editor.session.setScrollTop(tabData.scrollTop);
                            } catch (e) {}
                        }
                        if (tabData.scrollLeft !== undefined) {
                            try {
                                tab.editor.session.setScrollLeft(tabData.scrollLeft);
                            } catch (e) {}
                        }
                    }

                    if (tab.elements && tab.elements.chatMessages && tabData.chatMessagesHTML) {
                        tab.elements.chatMessages.innerHTML = tabData.chatMessagesHTML;
                    }

                    tab.updateEditorMode();
                    tab.updateTabIcon();
                    this.tabs.push(tab);

                    if (String(tabData.id) === String(activeTabId)) {
                        tabToActivate = tab;
                    }
                }

                this.renderTabs();
                if (!tabToActivate && this.tabs.length > 0) {
                    tabToActivate = this.tabs[0];
                }
                if (tabToActivate) {
                    this.switchTab(tabToActivate.id);
                }

                this.saveAllTabsToDB();

                const isDefaultSession = savedTabs.length === 1 &&
                    savedTabs[0].name === "Untitled" &&
                    !savedTabs[0].fileHandle &&
                    (!savedTabs[0].code || savedTabs[0].code.trim() === "");

                if (!isDefaultSession) {
                    setTimeout(() => {
                        showSnackbar(`Restored ${savedTabs.length} open file${savedTabs.length > 1 ? 's' : ''} from previous session.`);
                    }, 300);
                }
                return;
            }
        } catch (e) {
            console.warn("Failed to restore session from IndexedDB:", e);
        }

        // If no saved session in IndexedDB, open default initial tab
        this.addTab();
    },

    restoreTab(tabData) {
        // Recycle the active tab if it's completely empty, untitled, and clean
        let active = this.activeTab;
        if (active && !active.fileHandle && active.name === "Untitled" && !active.isDirty() && active.editor.getValue().trim() === "") {
            const idx = this.tabs.indexOf(active);
            if (idx !== -1) {
                this.tabs.splice(idx, 1);
                active.elements.content.remove();
            }
        }

        const tab = new Tab(this.nextId++, tabData.name);
        tab.encoding = tabData.encoding || "windows-1252";
        
        tab.fileHandle = tabData.fileHandle;
        tab.lastSavedCode = tabData.lastSavedCode;
        tab.chatHistory = tabData.chatHistory || [];
        tab.diffHistory = tabData.diffHistory || [];
        tab.codeHistory = tabData.codeHistory || [];
        tab.currentHistoryIndex = tabData.currentHistoryIndex;
        
        if (tab.editor && tabData.code !== undefined) {
            tab.editor.setValue(tabData.code, -1);
            tab.editor.clearSelection();
        }
        
        if (tab.elements && tab.elements.chatMessages && tabData.chatMessagesHTML) {
            tab.elements.chatMessages.innerHTML = tabData.chatMessagesHTML;
        }
        
        this.tabs.push(tab);
        this.renderTabs();
        this.switchTab(tab.id);
        
        tab.updateTabIcon();
        tabDB.saveTab(tab, this.tabs.indexOf(tab));
        tabDB.saveActiveTabId(tab.id);
        showSnackbar(`Restored tab: ${tabData.name}`);
        return tab;
    },

    async findExistingTab(tabData) {
        if (!tabData) return null;
        if (tabData.name && tabData.name !== "Untitled") {
            for (const otherTab of this.tabs) {
                if (otherTab.name === tabData.name) {
                    return otherTab;
                }
            }
        }
        if (tabData.fileHandle) {
            for (const otherTab of this.tabs) {
                if (otherTab.fileHandle) {
                    if (otherTab.fileHandle === tabData.fileHandle) {
                        return otherTab;
                    }
                    try {
                        if (typeof otherTab.fileHandle.isSameEntry === "function" &&
                            typeof tabData.fileHandle.isSameEntry === "function" &&
                            await otherTab.fileHandle.isSameEntry(tabData.fileHandle)) {
                            return otherTab;
                        }
                    } catch (e) {}
                }
            }
        }
        return null;
    },

    async revertClosedTab() {
        if (!this.closedTabs || this.closedTabs.length === 0) {
            showSnackbar("No recently closed tabs to restore.");
            return;
        }

        // Search from the end of the stack for a closed tab that is NOT already currently open
        let targetIndex = -1;
        for (let i = this.closedTabs.length - 1; i >= 0; i--) {
            const closed = this.closedTabs[i];
            const existing = await this.findExistingTab(closed);
            if (!existing) {
                targetIndex = i;
                break;
            }
        }

        if (targetIndex !== -1) {
            const removed = this.closedTabs.splice(targetIndex, 1)[0];
            this.restoreTab(removed);
        } else {
            // All closed tabs are already open! Switch to the most recently closed one and alert
            const lastData = this.closedTabs.pop();
            const existing = await this.findExistingTab(lastData);
            if (existing) {
                this.switchTab(existing.id);
                showSnackbar(`"${lastData.name}" is already open.`);
            } else {
                this.restoreTab(lastData);
            }
        }
    },

    getTabNaturalWidth(name) {
        if (!this._measureCanvas) {
            this._measureCanvas = document.createElement("canvas");
            this._measureCtx = this._measureCanvas.getContext("2d");
        }
        if (this._measureCtx) {
            this._measureCtx.font = "14px sans-serif";
            const textWidth = this._measureCtx.measureText(name || "").width;
            // 36px padding (18px left + 18px right) + 15px gap + 18px close button + 2px safety
            return Math.max(150, Math.ceil(textWidth + 71));
        }
        return 150;
    },

    updateTabCompression() {
        const container = document.getElementById("tabsContainer");
        const tabBar = document.getElementById("tabBar");
        if (!container || !tabBar) return;

        if (this.tabs.length <= 1) {
            if (container.classList.contains("is-compressed")) {
                container.style.setProperty("--tab-width", "150px");
                if (this._uncompressTimeout) clearTimeout(this._uncompressTimeout);
                this._uncompressTimeout = setTimeout(() => {
                    if (this.tabs.length <= 1) {
                        container.classList.remove("is-compressed");
                        container.style.removeProperty("--tab-width");
                    }
                }, 240);
            } else {
                container.classList.remove("is-compressed");
                container.style.removeProperty("--tab-width");
            }
            return;
        }

        const addTabBtn = document.getElementById("addTabBtn");
        const addBtnWidth = addTabBtn ? addTabBtn.offsetWidth + 8 : 45;
        // Total available space for tabs inside tabBar
        const availableWidth = tabBar.clientWidth - addBtnWidth - 24;

        // Calculate sum of natural uncompressed widths of all tabs (with 4px gap)
        const totalNaturalWidth = this.tabs.reduce((sum, tab) => sum + this.getTabNaturalWidth(tab.name), 0) + (this.tabs.length - 1) * 4;

        // Only compress if it is near to be full or exceeds the max-width of the tab container
        if (totalNaturalWidth >= availableWidth - 10) {
            if (this._uncompressTimeout) {
                clearTimeout(this._uncompressTimeout);
                this._uncompressTimeout = null;
            }
            container.classList.add("is-compressed");
            const responsiveWidth = Math.max(36, Math.floor((availableWidth - (this.tabs.length - 1) * 4) / this.tabs.length));
            container.style.setProperty("--tab-width", `${responsiveWidth}px`);
        } else {
            if (container.classList.contains("is-compressed")) {
                container.style.setProperty("--tab-width", "150px");
                if (this._uncompressTimeout) clearTimeout(this._uncompressTimeout);
                this._uncompressTimeout = setTimeout(() => {
                    const currentTabs = tabManager ? tabManager.tabs : [];
                    const currentTotal = currentTabs.reduce((sum, t) => sum + (tabManager ? tabManager.getTabNaturalWidth(t.name) : 150), 0) + (currentTabs.length - 1) * 4;
                    if (currentTotal < availableWidth - 10) {
                        container.classList.remove("is-compressed");
                        container.style.removeProperty("--tab-width");
                    }
                }, 240);
            } else {
                container.classList.remove("is-compressed");
                container.style.removeProperty("--tab-width");
            }
        }
    },

    renderTabs(animateNewTabs = false) {
        const container = document.getElementById("tabsContainer");
        if (!container) return;

        const existingButtons = Array.from(container.querySelectorAll('.tab-button:not(.tab-closing)'));
        
        // Record initial positions of all existing buttons for FLIP animation (during drag-and-drop)
        const firstPositions = new Map();
        existingButtons.forEach(btn => {
            const id = btn.dataset.id;
            if (id) {
                firstPositions.set(id, btn.getBoundingClientRect());
            }
        });

        // 1. Remove buttons for tabs that are no longer in this.tabs and not closing
        existingButtons.forEach(btn => {
            const id = btn.dataset.id;
            if (!this.tabs.some(t => String(t.id) === id)) {
                btn.remove();
            }
        });

        // 2. Reconcile buttons for each current tab
        const hasClosing = container.querySelector('.tab-button.tab-closing') !== null;
        this.tabs.forEach((tab, index) => {
            let btn = container.querySelector(`.tab-button[data-id="${tab.id}"]:not(.tab-closing)`);
            if (!btn) {
                btn = this.createTabButton(tab, index);
                if (existingButtons.length > 0 || hasClosing || animateNewTabs) {
                    btn.classList.add("tab-opening");
                    requestAnimationFrame(() => {
                        requestAnimationFrame(() => {
                            if (btn) btn.classList.remove("tab-opening");
                        });
                    });
                }
                container.appendChild(btn);
            } else {
                btn.className = `tab-button ${this.activeTab && this.activeTab.id === tab.id ? 'active' : ''}`;
                if (tabManager.draggedTabIndex === index) btn.classList.add("dragging");
                
                // Update text if changed
                const label = btn.querySelector(".tab-title") || btn.querySelector("span");
                if (label && label.textContent !== tab.name) label.textContent = tab.name;
                btn.title = tab.relativePath || tab.name;
                
                // Update close icon
                const closeIcon = btn.querySelector(".tab-close");
                if (closeIcon) {
                    const isDirty = tab.isDirty();
                    closeIcon.textContent = isDirty ? '●' : '✖';
                    closeIcon.classList.toggle('dirty', isDirty);
                }
                
                btn.dataset.index = index;
                
                // Move to correct position in DOM if necessary
                const nonClosingChildren = Array.from(container.children).filter(el => !el.classList.contains('tab-closing'));
                if (nonClosingChildren[index] !== btn) {
                    container.insertBefore(btn, nonClosingChildren[index] || null);
                }
            }
        });

        // 3. FLIP animation exclusively for Drag and Drop swaps (preserves exact drag & drop behavior)
        if (tabManager.draggedTabIndex !== null) {
            const updatedButtons = Array.from(container.querySelectorAll('.tab-button:not(.tab-closing)'));
            updatedButtons.forEach(btn => {
                const id = btn.dataset.id;
                const firstRect = firstPositions.get(id);
                if (!firstRect) return;

                if (btn._cleanupTransition) {
                    btn._cleanupTransition();
                }

                const lastRect = btn.getBoundingClientRect();
                const deltaX = firstRect.left - lastRect.left;
                const deltaY = firstRect.top - lastRect.top;

                if (deltaX !== 0 || deltaY !== 0) {
                    btn.style.transition = 'none';
                    btn.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
                    
                    btn.offsetWidth; 

                    btn.style.transition = 'transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)';
                    btn.style.transform = 'translate(0, 0)';

                    const cleanup = (e) => {
                        if (!e || e.propertyName === 'transform') {
                            btn.style.transition = '';
                            btn.style.transform = '';
                            btn.removeEventListener('transitionend', cleanup);
                            btn._cleanupTransition = null;
                        }
                    };
                    btn.addEventListener('transitionend', cleanup);
                    btn._cleanupTransition = cleanup;
                }
            });
        }

        this.updateTabCompression();
    },

    createTabButton(tab, index) {
        const btn = document.createElement("div");
        btn.className = `tab-button ${this.activeTab && this.activeTab.id === tab.id ? 'active' : ''}`;
        btn.setAttribute("draggable", "true");
        btn.dataset.id = tab.id;
        btn.dataset.index = index;
        btn.title = tab.relativePath || tab.name;
        
        const isDirty = tab.isDirty();
        btn.innerHTML = `<span class="tab-title">${tab.name}</span><span class="tab-close">${isDirty ? '●' : '✖'}</span>`;
        
        const closeIcon = btn.querySelector(".tab-close");
        if(isDirty) closeIcon.classList.add('dirty');
        
        closeIcon.onmouseover = () => {
            if (tab.isDirty()) closeIcon.textContent = '✖';
        };
        closeIcon.onmouseout = () => {
            if (tab.isDirty()) closeIcon.textContent = '●';
        };

        btn.onclick = () => this.switchTab(tab.id);
        closeIcon.onclick = (e) => {
            e.stopPropagation();
            this.closeTab(tab.id, e);
        };

        // Drag and Drop handlers
        btn.ondragstart = (e) => {
            e.dataTransfer.setData("text/plain", btn.dataset.index);
            tabManager.draggedTabIndex = parseInt(btn.dataset.index);
            setTimeout(() => btn.classList.add("dragging"), 0);
            e.dataTransfer.effectAllowed = "move";
        };

        btn.ondragenter = (e) => {
            e.preventDefault();
        };

        btn.ondragover = (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = "move";
            
            const fromIndex = tabManager.draggedTabIndex;
            const toIndex = parseInt(btn.dataset.index);
            
            if (fromIndex !== null && fromIndex !== toIndex) {
                const rect = btn.getBoundingClientRect();
                const mouseX = e.clientX;
                
                if (typeof mouseX === 'number' && mouseX > 0) {
                    const midpoint = rect.left + rect.width / 2;
                    let shouldSwap = false;
                    
                    if (fromIndex < toIndex) {
                        // Dragging left-to-right: only swap if cursor is past the midpoint
                        if (mouseX > midpoint) {
                            shouldSwap = true;
                        }
                    } else {
                        // Dragging right-to-left: only swap if cursor is before the midpoint
                        if (mouseX < midpoint) {
                            shouldSwap = true;
                        }
                    }
                    
                    if (shouldSwap) {
                        const movedTab = this.tabs.splice(fromIndex, 1)[0];
                        this.tabs.splice(toIndex, 0, movedTab);
                        tabManager.draggedTabIndex = toIndex;
                        this.renderTabs();
                    }
                }
            }
        };

        btn.ondrop = (e) => {
            e.preventDefault();
            this.renderTabs();
        };

        btn.ondragend = () => {
            btn.classList.remove("dragging");
            tabManager.draggedTabIndex = null;
            this.renderTabs();
            this.saveAllTabsToDB();
        };

        return btn;
    }
};

// Auto-adjust tab compression on tabBar resize
if (typeof ResizeObserver !== 'undefined') {
    const tabBarElem = document.getElementById("tabBar");
    if (tabBarElem) {
        new ResizeObserver(() => {
            if (typeof tabManager !== 'undefined' && tabManager.updateTabCompression) {
                tabManager.updateTabCompression();
            }
        }).observe(tabBarElem);
    }
}
window.addEventListener('resize', () => {
    if (typeof tabManager !== 'undefined' && tabManager.updateTabCompression) {
        tabManager.updateTabCompression();
    }
});

// Global helper: clearChat (called by index.html modal button)
function clearChat() {
    if (tabManager.activeTab) tabManager.activeTab.clearChat();
    closeClearChatModal();
}

// Global hotkey logic (e.g. Ctrl+S, reopen closed tab)
document.addEventListener("keydown", (e) => {
    const isCtrlOrCmd = e.ctrlKey || e.metaKey;
    const isShift = e.shiftKey;
    const isAlt = e.altKey;
    const isKeyT = e.key && (e.key.toLowerCase() === 't' || e.key.toUpperCase() === 'T');
    const isKeyS = e.key && (e.key.toLowerCase() === 's' || e.key.toUpperCase() === 'S');
    const isKeyO = e.key && (e.key.toLowerCase() === 'o' || e.key.toUpperCase() === 'O');
    const isKeyN = e.key && (e.key.toLowerCase() === 'n' || e.key.toUpperCase() === 'N');

    // Global Ctrl+S handler
    if (isCtrlOrCmd && !isAlt && !isShift && isKeyS) {
        e.preventDefault();
        e.stopPropagation();
        if (typeof tabManager !== 'undefined' && tabManager.activeTab) {
            if (!tabManager.activeTab.isSaving) {
                tabManager.activeTab.saveToFile();
            }
        }
        return;
    }

    // Global Ctrl+O handler (Open File)
    if (isCtrlOrCmd && !isAlt && !isShift && isKeyO) {
        e.preventDefault();
        e.stopPropagation();
        if (typeof tabManager !== 'undefined' && tabManager.activeTab) {
            tabManager.activeTab.openFile();
        }
        return;
    }

    // Global Ctrl+Alt+N or Ctrl+Shift+N (New Tab)
    if ((isCtrlOrCmd && isAlt && isKeyN) || (isCtrlOrCmd && isShift && isKeyN)) {
        e.preventDefault();
        e.stopPropagation();
        if (typeof tabManager !== 'undefined') {
            tabManager.addTab();
        }
        return;
    }
    
    // Check for Alt+Shift+T, Ctrl+Alt+T or Ctrl+Shift+T (best-effort)
    const shouldRevert = (isAlt && isShift && isKeyT) || 
                         (isCtrlOrCmd && isAlt && isKeyT) || 
                         (isCtrlOrCmd && isShift && isKeyT);
                         
    if (shouldRevert) {
        e.preventDefault();
        e.stopPropagation();
        if (typeof tabManager !== 'undefined' && tabManager.revertClosedTab) {
            tabManager.revertClosedTab();
        }
    }
}, true);

// External File Change Detection (Syncing external edits from Notepad / other editors)
window.addEventListener("focus", () => {
    if (typeof tabManager !== 'undefined') {
        if (tabManager.activeTab) {
            tabManager.activeTab.checkExternalChange(true);
        }
        tabManager.tabs.forEach(tab => {
            if (tab !== tabManager.activeTab && tab.fileHandle) {
                tab.checkExternalChange();
            }
        });
    }
});

// Auto-save on window blur (when switching to Notepad, terminal, RO server, etc.)
window.addEventListener("blur", () => {
    if (typeof tabManager !== 'undefined' && tabManager.activeTab) {
        if (tabManager.activeTab.fileHandle && tabManager.activeTab.isDirty()) {
            tabManager.activeTab.autoSaveToFile();
        }
    }
});

// Accidental browser close protection & tab persistence:
window.addEventListener("beforeunload", () => {
    if (typeof tabManager !== 'undefined') {
        if (tabManager.activeTab && tabManager.activeTab.fileHandle && tabManager.activeTab.isDirty()) {
            tabManager.activeTab.autoSaveToFile();
        }
        tabManager.flushAllTabsToDB();
    }
});

window.addEventListener("pagehide", () => {
    if (typeof tabManager !== 'undefined') {
        if (tabManager.activeTab && tabManager.activeTab.fileHandle && tabManager.activeTab.isDirty()) {
            tabManager.activeTab.autoSaveToFile();
        }
        tabManager.flushAllTabsToDB();
    }
});

document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
        if (typeof tabManager !== 'undefined') {
            if (tabManager.activeTab && tabManager.activeTab.fileHandle && tabManager.activeTab.isDirty()) {
                tabManager.activeTab.autoSaveToFile();
            }
            tabManager.flushAllTabsToDB();
        }
    } else if (document.visibilityState === "visible") {
        if (typeof tabManager !== 'undefined') {
            if (tabManager.activeTab) {
                tabManager.activeTab.checkExternalChange(true);
            }
            tabManager.tabs.forEach(tab => {
                if (tab !== tabManager.activeTab && tab.fileHandle) {
                    tab.checkExternalChange();
                }
            });
        }
    }
});

// Periodic lightweight polling when the window has focus and active tab has a file handle
setInterval(() => {
    if (document.hasFocus() && typeof tabManager !== 'undefined' && tabManager.activeTab && tabManager.activeTab.fileHandle) {
        tabManager.activeTab.checkExternalChange();
    }
}, 2000);

document.addEventListener("click", () => {
    document.getElementById("contextMenu").style.display = "none";
    document.getElementById("askAIForm").style.display = "none";
});

document.getElementById("explainThis").addEventListener("click", (e) => {
    document.getElementById("contextMenu").style.display = "none";
    ensureChatBotVisible();
    if (tabManager.activeTab) {
        tabManager.activeTab.elements.chatInput.value = `Explain this: ${tabManager.latestSelectedText}`;
        tabManager.activeTab.sendMessage();
    }
});

document.getElementById("askAI").addEventListener("click", (e) => {
    e.stopPropagation();
    document.getElementById("contextMenu").style.display = "none";
    const form = document.getElementById("askAIForm");
    const maxLeft = Math.max(10, window.innerWidth - 270);
    form.style.left = `${Math.min(tabManager.menuX, maxLeft)}px`;
    form.style.top = `${tabManager.menuY}px`;
    form.style.display = "block";
    document.getElementById("askAIInput").focus();
});

document.getElementById("askAIFormElement").addEventListener("submit", (e) => {
    e.preventDefault();
    ensureChatBotVisible();
    const input = document.getElementById("askAIInput");
    const question = input.value.trim();
    if (question && tabManager.activeTab) {
        tabManager.activeTab.elements.chatInput.value = `${question}: ${tabManager.latestSelectedText}`;
        tabManager.activeTab.sendMessage();
    }
    input.value = "";
    document.getElementById("askAIForm").style.display = "none";
});

// Ported markdown parser (from line 417 of original init.js)
function markdownToHtmlForChat(markdownText) {
    let outputHtml = [];
    let lines = markdownText.split('\n');
    let listStack = [];
    let inBlockquote = false;
    let inParagraph = false;
    let currentParagraphLines = [];
    let inCodeBlock = false;

    const processInlineMarkdown = (text) => {
        text = text.replace(/`([^`]+)`/g, (_, code) => {
            const escapedCode = code.replace(/</g, '&lt;').replace(/>/g, '&gt;');
            return `<code>${escapedCode}</code>`;
        });
        text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
        text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
        text = text.replace(/\*(.+?)\*/g, '<em>$1</em>');
        return text;
    };

    const flushParagraph = () => {
        const paragraphText = currentParagraphLines.join('').trim();
        if (inParagraph && paragraphText !== '') {
            outputHtml.push('<p>' + processInlineMarkdown(paragraphText) + '</p>');
        }
        currentParagraphLines = [];
        inParagraph = false;
    };

    const flushBlockquote = () => { if (inBlockquote) { outputHtml.push('</blockquote>'); inBlockquote = false; } };

    const closeListsAndItems = (targetIndent, forceCloseAll = false) => {
        while (listStack.length > 0) {
            const topList = listStack[listStack.length - 1];
            if (forceCloseAll || topList.indent >= targetIndent) {
                if (topList.lastItemOpen) outputHtml.push('</li>');
                outputHtml.push(`</${topList.type}>`);
                listStack.pop();
            } else break;
        }
    };

    const closeAllOpenElements = () => { flushParagraph(); closeListsAndItems(0, true); flushBlockquote(); };

    for (let i = 0; i < lines.length; i++) {
        const originalLine = lines[i];
        const trimmedLine = originalLine.trim();
        const leadingSpaces = (originalLine.match(/^\s*/) || [""])[0].length;

        if (originalLine.startsWith('```')) { closeAllOpenElements(); inCodeBlock = !inCodeBlock; continue; }
        if (inCodeBlock) continue;
        if (trimmedLine === '') { closeAllOpenElements(); continue; }

        if (trimmedLine.startsWith('<') && trimmedLine.endsWith('>')) {
            closeAllOpenElements();
            outputHtml.push(processInlineMarkdown(originalLine));
            continue;
        }

        const headingMatch = trimmedLine.match(/^(#{1,6})\s(.+)/);
        if (headingMatch) {
            closeAllOpenElements();
            const level = headingMatch[1].length;
            outputHtml.push(`<h${level}>${processInlineMarkdown(headingMatch[2])}</h${level}>`);
            continue;
        }

        if (trimmedLine === '---' || trimmedLine === '***') { closeAllOpenElements(); outputHtml.push('<hr>'); continue; }

        const blockquoteMatch = trimmedLine.match(/^>\s*(.*)/);
        if (blockquoteMatch) {
            flushParagraph(); closeListsAndItems(0, true);
            if (!inBlockquote) { outputHtml.push('<blockquote>'); inBlockquote = true; }
            outputHtml.push(`<p>${processInlineMarkdown(blockquoteMatch[1].trim())}</p>`);
            continue;
        }

        const olMatch = trimmedLine.match(/^(\d+)\.\s(.+)/);
        const ulMatch = trimmedLine.match(/^[-*]\s(.+)/);
        if (olMatch || ulMatch) {
            flushParagraph(); flushBlockquote();
            const currentListType = olMatch ? 'ol' : 'ul';
            const listItemContent = olMatch ? olMatch[2] : ulMatch[1];
            const itemIndent = leadingSpaces;
            closeListsAndItems(itemIndent);
            let topList = listStack.length > 0 ? listStack[listStack.length - 1] : null;
            if (!topList || topList.indent < itemIndent) {
                outputHtml.push(`<${currentListType}>`);
                listStack.push({ type: currentListType, indent: itemIndent, lastItemOpen: false });
                topList = listStack[listStack.length - 1];
            }
            if (topList.lastItemOpen) outputHtml.push('</li>');
            outputHtml.push(`<li>${processInlineMarkdown(listItemContent)}`);
            topList.lastItemOpen = true;
            continue;
        }
        inParagraph = true;
        currentParagraphLines.push(originalLine);
    }
    closeAllOpenElements();
    return outputHtml.join('\n');
}

const instructionPromt2 = `
You are an expert AI assistant specializing in rAthena scripting. Your primary goal is to provide users with accurate data and well-structured, efficient rAthena scripts.
**Your knowledge base is strictly limited to the provided rAthena documentation. Do not assume or invent information beyond this scope.**

Follow these guidelines at all times:
1. Core Principles:
  1. Response in English.
  2. Only answer questions and provide assistance related to rAthena scripting. Politely decline any requests outside this scope.
  2. Base all scripts and information strictly on the provided rAthena documentation. Do not invent item IDs or variable constants. When possible, use known numerical IDs or defined constants for clarity.
  3. Maintain a friendly, helpful, and conversational tone. Keep responses concise and to the point. Do not repeat these instructions in your responses.

2. Code Editor Context Rule: 
  1. The user's current code from their editor will be provided within \`\`\`...\`\`\` in their prompt. Use this for context.

3. JSON Object Structure Rule:
  1. Your response must be a JSON object with two fields: \`thinking\` and \`response\`.

4. Response Formatting Rule:
  General Rules:
    1. **Never use HTML tags** like <ul>, <ol>, or others — except:
        1. <h4> headers for clarity if just needed.
        2. <p> tags only in "response" for key remarks (e.g., pointing to the code in editor or for final follow-up).
    2. Use **clean ordered structure** (e.g., 1. → 1.1 → 1.1.1) when necessary for clarity.
    3. Escape angle brackets **inside <code>** using \`&lt;\` and \`&gt;\` only when present in HTML-like code. Do not use them in the triple backtick (\`\`\`) codeblock.
    4. **Do not include any hyperlinks.**
    5. Emojis may be used **minimally and meaningfully** to express your emotion as AI — never overuse.

  Code Formatting Rule:
    1. **Start with Script Header:** When creating a new NPC script structure, you must start a comment header block at the beginning. Each new NPC should have a distinct script header:
        //===== rAthena Script =======================================
        //= Name of the NPC
        //===== By: rAthena AI Assistant ============================
        //= Function of the Script
        //= Optional: Additional function description
        //============================================================
        The rest of the code here ...\n
    2. **Always wrap the script in codeblock eg. \`\`\`...\`\`\`.** No specific name of codeblock just wrap in triple backtick.\n
    3. Do not modify, revise, or repeat the user's provided code unless they explicitly ask for a revision of that specific code.\n
    4. When revising existing code. Do not remove or alter anything from the current code. keep all script intact and written in the editor and only change the target parts.\n
    6. Follow rAthena scripting standards and variable types (permanent, temporary, global, NPC, scope, account, character).\n
    7. Use \`$\` for strings as per rAthena documentation.\n
    8. Use literal tab characters '&Tab;' for tabs. Change the %TAB% to literal tab character ('&Tab;').\n
    9. Properly render the literal Tab in script editor.
    10. For complete scripts or NPCs intended for the editor, wrap the output in codeblock to trigger the script editor.\n
    11. Use single backticks anytime for inline or short code references or variable names within chat.\n
    12. Absolutely do **not** use double backticks under any circumstances.\n
    13. If the user asks to remove the code, return only: \`\`\`// Code remove\`\`\`\n
    14. Use single backticks ( \`...\` ) for all inline code references, such as commands, keywords, or variable names. In showing syntax code do not use triple backticks!\n
    15. Use triple backticks or wrap it in 1 codeblock ( \`\`\`...\`\`\` ) only for complete, multi-line code blocks intended for the script editor inside the JSON Object "response" field. Never use triple backticks anywhere else.\n
    16. Do not wrap the entire explanation in triple backticks — only the actual code/script.\n
    17. Use breakline and render it properly.\n
    18. When providing a full script, do not say "Here is the script." Instead, write or revise this: \`<p>Please kindly look for the generated script inside editor.</p>\`\n

5. \`thinking\` field Rule:
  1. Provide a summarized plan detailing how the user's input was interpreted. Present this in a clearly organized ordered or unordered list, using nested lists when necessary to show hierarchical reasoning.
  2. Use **<ul> or <ol>** to explain in summary the step-by-step guides or concepts if necessary.

6. \`response\` field Rule:
    1. **Response Execution**:
      1. Execute the thinking plan. Start with a brief answer to user first followed by answer to user input/question. Use proper NPC structure code script if requested.
    2. **Detailed Format Summarize Explanation**:
      1. <p>Start with short introduction sentence</p>.\n
      2. Use **paragraphs** to explain the answer.\n
      3. Use <h4> (without <ul> or <ol>) to break down sections, with emojis for visual clarity.\n
      4. Provide a summarized explanation of the code in plain text afterwards using bullet points or ordered nested lists.\n
      5. When explaining specific script command just purely explain it. Do not revise the existing codeblock.\n
    3. **End with a Follow-up**:
      1. <p>Always conclude a polite follow-up question or invitation based on the user's input.</p> Do not include this inside the nested list.

7. Special Rules/Instructions:
      1. Use single backticks \` \` to refer to single **commands, code keywords**, or **parameters** during explanation.
      2. If the user's request is **unclear**, include a clarification question instead of assuming their intent.
      3. Strictly complete your explanation.
`.trim();

// ==========================================
// Folder Tree & Open Dropdown Manager
// ==========================================
class FolderTreeManager {
    constructor() {
        this.rootHandle = null;
        this.rootName = "";
        this.nodeRegistry = new Map(); // path -> { nodeElem, handle, isDirectory, isExpanded, ... }
        this.activePath = "";
        this.filterText = "";
        this.isResizing = false;

        let initialWidth = 270;
        try {
            const savedLocal = parseInt(localStorage.getItem("sidebarWidth"), 10);
            if (!isNaN(savedLocal) && savedLocal >= 180 && savedLocal <= 1200) {
                initialWidth = savedLocal;
            }
        } catch (e) {}
        this.savedSidebarWidth = initialWidth;

        this.isCheckingForChanges = false;
        this.fsObserver = null;
        this.autoRefreshTimer = null;
        this.boundWindowFocus = null;
        this.suppressTreeScroll = false;
        this.workspaceFiles = [];
        this.isIndexing = false;
        this.currentSearchResults = [];
        this.selectedSearchIndex = -1;
        this.initialized = false;
        this.isOpeningFile = false;
        this.treeClipboard = null;
        this.selectedTreeItem = null;
        this.selectedTreeItems = [];
        this.contextMenuItem = null;
        this.pendingDeleteItem = null;
        this.pendingDeleteItems = [];
    }

    init() {
        if (this.initialized) return;
        this.initialized = true;

        this.initContextMenu();

        const sidebar = document.getElementById("sidebarArea");
        if (sidebar && this.savedSidebarWidth) {
            sidebar.style.width = `${this.savedSidebarWidth}px`;
        }

        const openBtn = document.getElementById("openBtn");
        const openMenu = document.getElementById("openMenu");
        const openDropdownContainer = document.getElementById("openDropdownContainer");

        if (openBtn && openMenu) {
            openBtn.onclick = (e) => {
                e.stopPropagation();
                this.toggleDropdown();
            };

            document.addEventListener("click", (e) => {
                if (openDropdownContainer && !openDropdownContainer.contains(e.target)) {
                    this.closeDropdown();
                }
            });

            document.addEventListener("keydown", (e) => {
                if (e.key === "Escape") {
                    this.closeDropdown();
                }
            });
        }

        const menuNewTab = document.getElementById("menuItemNewTab");
        if (menuNewTab) {
            menuNewTab.onclick = () => {
                this.closeDropdown();
                if (typeof tabManager !== 'undefined') {
                    tabManager.addTab();
                }
            };
        }

        const menuOpenFile = document.getElementById("menuItemOpenFile");
        if (menuOpenFile) {
            menuOpenFile.onclick = () => {
                this.closeDropdown();
                if (typeof tabManager !== 'undefined' && tabManager.activeTab) {
                    tabManager.activeTab.openFile();
                }
            };
        }

        const menuOpenFolder = document.getElementById("menuItemOpenFolder");
        if (menuOpenFolder) {
            menuOpenFolder.onclick = () => {
                this.closeDropdown();
                this.promptOpenFolder();
            };
        }

        const menuToggleSidebar = document.getElementById("menuItemToggleSidebar");
        if (menuToggleSidebar) {
            menuToggleSidebar.onclick = () => {
                this.closeDropdown();
                this.toggleSidebar();
            };
        }

        // Sidebar action buttons
        const collapseBtn = document.getElementById("sidebarCollapseBtn");
        if (collapseBtn) {
            collapseBtn.onclick = () => this.collapseAll();
        }

        const closeBtn = document.getElementById("sidebarCloseBtn");
        if (closeBtn) {
            closeBtn.onclick = () => this.closeFolderWorkspace();
        }

        // Search dropdown setup
        const searchInput = document.getElementById("sidebarSearchInput");
        const searchClear = document.getElementById("sidebarSearchClear");
        const searchContainer = document.getElementById("sidebarSearchContainer");

        if (searchInput) {
            let debounceTimer = null;
            searchInput.addEventListener("input", (e) => {
                const val = e.target.value.trim();
                this.filterText = val;
                if (searchClear) {
                    searchClear.style.display = val ? "inline-block" : "none";
                }
                clearTimeout(debounceTimer);
                debounceTimer = setTimeout(() => {
                    this.searchFiles(val);
                }, 80);
            });

            searchInput.addEventListener("focus", () => {
                if (this.filterText) {
                    this.searchFiles(this.filterText);
                }
            });

            searchInput.addEventListener("keydown", (e) => {
                if (e.key === "ArrowDown") {
                    e.preventDefault();
                    this.moveSearchSelection(1);
                } else if (e.key === "ArrowUp") {
                    e.preventDefault();
                    this.moveSearchSelection(-1);
                } else if (e.key === "Enter") {
                    e.preventDefault();
                    e.stopPropagation();
                    if (this.currentSearchResults && this.currentSearchResults.length > 0) {
                        const targetIdx = this.selectedSearchIndex >= 0 ? this.selectedSearchIndex : 0;
                        const targetItem = this.currentSearchResults[targetIdx];
                        if (targetItem) {
                            searchInput.blur();
                            this.openFileFromSearch(targetItem);
                        }
                    }
                } else if (e.key === "Escape") {
                    this.closeSearchDropdown();
                    searchInput.blur();
                }
            });
        }

        if (searchClear) {
            searchClear.onclick = () => {
                if (searchInput) {
                    searchInput.value = "";
                    this.filterText = "";
                    searchClear.style.display = "none";
                    this.closeSearchDropdown();
                    searchInput.focus();
                }
            };
        }

        // Click outside closes search dropdown
        document.addEventListener("click", (e) => {
            if (searchContainer && !searchContainer.contains(e.target)) {
                this.closeSearchDropdown();
            }
        });

        // Resizer setup
        this.initResizer();

        // Drag to root workspace folder via sidebar header
        const sidebarTitle = document.getElementById("sidebarTitle");
        if (sidebarTitle && !sidebarTitle._hasDropListener) {
            sidebarTitle._hasDropListener = true;
            sidebarTitle.ondragover = (e) => {
                if (!this.draggedTreeItem) return;
                e.preventDefault();
                e.dataTransfer.dropEffect = "move";
                sidebarTitle.classList.add("tree-drop-target");
            };
            sidebarTitle.ondragleave = () => {
                sidebarTitle.classList.remove("tree-drop-target");
            };
            sidebarTitle.ondrop = async (e) => {
                e.preventDefault();
                e.stopPropagation();
                sidebarTitle.classList.remove("tree-drop-target");
                if (!this.draggedTreeItem) return;
                const source = this.draggedTreeItem;
                this.draggedTreeItem = null;
                await this.moveItemToFolder(source, {
                    isDirectory: true,
                    handle: this.rootHandle,
                    path: "",
                    isRoot: true
                });
            };
        }

        // Restore workspace folder from IndexedDB if previously saved
        this.restoreWorkspaceFromDB();
    }

    toggleDropdown() {
        const menu = document.getElementById("openMenu");
        if (!menu) return;
        const isVisible = menu.style.display === "block";
        menu.style.display = isVisible ? "none" : "block";
    }

    closeDropdown() {
        const menu = document.getElementById("openMenu");
        if (menu) menu.style.display = "none";
    }

    async promptOpenFolder() {
        if (typeof window.showDirectoryPicker !== "function") {
            showSnackbar("Folder picker is not supported in this browser. Please use Chrome or Edge.");
            return;
        }
        try {
            const dirHandle = await window.showDirectoryPicker({
                mode: "readwrite",
                startIn: "documents"
            });
            if (!dirHandle) return;

            this.rootHandle = dirHandle;
            this.rootName = dirHandle.name;
            if (typeof tabManager !== 'undefined') {
                tabManager.workspaceDirectoryHandle = dirHandle;
            }

            this.showSidebar();
            const folderNameElem = document.getElementById("sidebarFolderName");
            if (folderNameElem) {
                folderNameElem.textContent = dirHandle.name;
                folderNameElem.title = dirHandle.name;
            }

            // Update dropdown menu
            const toggleItem = document.getElementById("menuItemToggleSidebar");
            const divider = document.getElementById("menuFolderDivider");
            if (toggleItem) toggleItem.style.display = "flex";
            if (divider) divider.style.display = "block";

            await this.loadRoot();
            this.saveWorkspaceToDB(dirHandle);
            this.startWatcher();
            this.syncActiveTabWithTree();
            showSnackbar(`Opened folder "${dirHandle.name}".`);
        } catch (err) {
            if (err && err.name !== "AbortError") {
                console.error("Open folder error:", err);
                showSnackbar("Could not open folder.");
            }
        }
    }

    toggleSidebar() {
        const sidebar = document.getElementById("sidebarArea");
        if (!sidebar) return;
        if (sidebar.classList.contains("sidebar-hidden")) {
            this.showSidebar();
        } else {
            this.hideSidebar();
        }
    }

    showSidebar() {
        const sidebar = document.getElementById("sidebarArea");
        const resizer = document.getElementById("sidebarResizer");
        const inner = document.getElementById("sidebarInner");
        const targetWidth = this.savedSidebarWidth || 270;
        if (sidebar) {
            sidebar.style.width = `${targetWidth}px`;
            if (inner) inner.style.width = "100%";
            sidebar.classList.remove("sidebar-hidden");
        }
        if (resizer) resizer.style.display = "block";
        const toggleText = document.getElementById("menuToggleSidebarText");
        if (toggleText) toggleText.textContent = "Hide Folder Tree";
        this.animateEditorResize();
        this.syncActiveTabWithTree();
    }

    hideSidebar() {
        const sidebar = document.getElementById("sidebarArea");
        const resizer = document.getElementById("sidebarResizer");
        if (sidebar) {
            const currentW = sidebar.getBoundingClientRect().width;
            if (currentW > 50) {
                this.savedSidebarWidth = currentW;
                this.saveSidebarWidth(currentW);
            }
            sidebar.classList.add("sidebar-hidden");
        }
        if (resizer) resizer.style.display = "none";
        const toggleText = document.getElementById("menuToggleSidebarText");
        if (toggleText) toggleText.textContent = "Show Folder Tree";
        this.animateEditorResize();
    }

    animateEditorResize() {
        const startTime = performance.now();
        const duration = 320;
        const step = (now) => {
            if (typeof tabManager !== 'undefined' && tabManager.activeTab && tabManager.activeTab.editor) {
                tabManager.activeTab.editor.resize();
                if (tabManager.activeTab.minimap) {
                    tabManager.activeTab.minimap.update(true);
                }
            }
            if (now - startTime < duration) {
                requestAnimationFrame(step);
            }
        };
        requestAnimationFrame(step);
    }

    async loadRoot() {
        const container = document.getElementById("folderTreeContainer");
        if (!container || !this.rootHandle) return;
        container.innerHTML = "";
        this.nodeRegistry.clear();

        try {
            await this.renderDirectoryChildren(this.rootHandle, "", container, 0);
            this.indexWorkspaceFiles();
        } catch (e) {
            console.error("Error loading directory root:", e);
            container.innerHTML = `<div class="tree-empty-message">Unable to read folder contents.</div>`;
        }
    }

    async renderDirectoryChildren(dirHandle, parentPath, containerElem, depth = 0) {
        containerElem.innerHTML = `<div class="tree-loading" style="padding: 6px 12px; font-size: 11px; opacity: 0.6;">Loading...</div>`;
        
        const subdirs = [];
        const files = [];

        try {
            for await (const [name, entry] of dirHandle.entries()) {
                if (name.startsWith(".") || name === "node_modules" || name === ".git") continue;
                
                const relativePath = parentPath ? `${parentPath}/${name}` : name;
                if (entry.kind === "directory") {
                    subdirs.push({ name, handle: entry, relativePath });
                } else if (entry.kind === "file") {
                    files.push({ name, handle: entry, relativePath });
                }
            }
        } catch (err) {
            containerElem.innerHTML = `<div class="tree-empty-message">Access restricted or folder moved.</div>`;
            return;
        }

        subdirs.sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: "base" }));
        files.sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: "base" }));

        containerElem.innerHTML = "";

        if (subdirs.length === 0 && files.length === 0) {
            const emptyElem = document.createElement("div");
            emptyElem.className = "tree-empty-message";
            emptyElem.textContent = "(Empty folder)";
            emptyElem.style.paddingLeft = `${depth * 14 + 20}px`;
            containerElem.appendChild(emptyElem);
            return;
        }

        // Render subdirectories
        for (const item of subdirs) {
            const folderWrapper = document.createElement("div");
            folderWrapper.className = "tree-folder-group";

            const folderNode = document.createElement("div");
            folderNode.className = "tree-node tree-folder";
            folderNode.style.paddingLeft = `${depth * 14 + 6}px`;
            folderNode.title = item.relativePath;
            folderNode.dataset.path = item.relativePath;

            const arrow = document.createElement("span");
            arrow.className = "tree-arrow";
            arrow.textContent = "▶";

            const icon = document.createElement("span");
            icon.className = "tree-icon";
            icon.textContent = "📁";

            const label = document.createElement("span");
            label.className = "tree-label";
            label.textContent = item.name;

            folderNode.appendChild(arrow);
            folderNode.appendChild(icon);
            folderNode.appendChild(label);

            const childrenContainer = document.createElement("div");
            childrenContainer.className = "tree-children";

            const regItem = {
                handle: item.handle,
                path: item.relativePath,
                isDirectory: true,
                isExpanded: false,
                childrenLoaded: false,
                nodeElem: folderNode,
                arrowElem: arrow,
                iconElem: icon,
                childrenElem: childrenContainer,
                depth: depth + 1,
                parentHandle: dirHandle,
                parentPath: parentPath
            };
            this.nodeRegistry.set(item.relativePath, regItem);

            folderNode.setAttribute("draggable", "true");
            folderNode.ondragstart = (e) => {
                e.stopPropagation();
                this.draggedTreeItem = regItem;
                folderNode.classList.add("tree-node-dragging");
                e.dataTransfer.setData("text/plain", regItem.path);
                e.dataTransfer.effectAllowed = "move";
            };
            folderNode.ondragend = () => {
                folderNode.classList.remove("tree-node-dragging");
                document.querySelectorAll(".tree-drop-target").forEach(el => el.classList.remove("tree-drop-target"));
                this.draggedTreeItem = null;
            };
            folderNode.ondragover = (e) => {
                if (!this.draggedTreeItem || this.draggedTreeItem === regItem) return;
                if (this.draggedTreeItem.isDirectory && (regItem.path === this.draggedTreeItem.path || regItem.path.startsWith(this.draggedTreeItem.path + "/"))) return;
                e.preventDefault();
                e.stopPropagation();
                e.dataTransfer.dropEffect = "move";
                folderNode.classList.add("tree-drop-target");
            };
            folderNode.ondragleave = () => {
                folderNode.classList.remove("tree-drop-target");
            };
            folderNode.ondrop = async (e) => {
                e.preventDefault();
                e.stopPropagation();
                folderNode.classList.remove("tree-drop-target");
                if (!this.draggedTreeItem || this.draggedTreeItem === regItem) return;
                const source = this.draggedTreeItem;
                this.draggedTreeItem = null;
                await this.moveItemToFolder(source, regItem);
            };

            folderNode.onclick = async (e) => {
                e.stopPropagation();
                if (e.ctrlKey || e.metaKey) {
                    this.toggleTreeItemSelection(regItem);
                } else {
                    this.setSelectedTreeItem(regItem);
                    await this.toggleFolderNode(regItem);
                }
            };

            folderNode.oncontextmenu = (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.showContextMenu(e, regItem);
            };

            folderWrapper.appendChild(folderNode);
            folderWrapper.appendChild(childrenContainer);
            containerElem.appendChild(folderWrapper);
        }

        // Render files
        for (const item of files) {
            const fileNode = document.createElement("div");
            fileNode.className = "tree-node tree-file";
            fileNode.style.paddingLeft = `${depth * 14 + 6}px`;
            fileNode.title = item.relativePath;
            fileNode.dataset.path = item.relativePath;

            const spacer = document.createElement("span");
            spacer.className = "tree-arrow empty";
            spacer.textContent = " ";

            const icon = document.createElement("span");
            icon.className = "tree-icon";
            icon.innerHTML = this.getFileIcon(item.name);

            const label = document.createElement("span");
            label.className = "tree-label";
            label.textContent = item.name;

            fileNode.appendChild(spacer);
            fileNode.appendChild(icon);
            fileNode.appendChild(label);

            const regItem = {
                handle: item.handle,
                path: item.relativePath,
                isDirectory: false,
                nodeElem: fileNode,
                lastModified: 0,
                lastSize: 0,
                isModifiedExternally: false,
                depth: depth,
                parentHandle: dirHandle,
                parentPath: parentPath
            };
            this.nodeRegistry.set(item.relativePath, regItem);

            // Read initial file metadata asynchronously
            if (typeof item.handle.getFile === "function") {
                item.handle.getFile().then(f => {
                    if (f) {
                        regItem.lastModified = f.lastModified || 0;
                        regItem.lastSize = f.size || 0;
                    }
                }).catch(() => {});
            }

            fileNode.setAttribute("draggable", "true");
            fileNode.ondragstart = (e) => {
                e.stopPropagation();
                this.draggedTreeItem = regItem;
                fileNode.classList.add("tree-node-dragging");
                e.dataTransfer.setData("text/plain", regItem.path);
                e.dataTransfer.effectAllowed = "move";
            };
            fileNode.ondragend = () => {
                fileNode.classList.remove("tree-node-dragging");
                document.querySelectorAll(".tree-drop-target").forEach(el => el.classList.remove("tree-drop-target"));
                this.draggedTreeItem = null;
            };
            fileNode.ondragover = (e) => {
                if (!this.draggedTreeItem || this.draggedTreeItem === regItem) return;
                e.preventDefault();
                e.stopPropagation();
                e.dataTransfer.dropEffect = "move";
                fileNode.classList.add("tree-drop-target");
            };
            fileNode.ondragleave = () => {
                fileNode.classList.remove("tree-drop-target");
            };
            fileNode.ondrop = async (e) => {
                e.preventDefault();
                e.stopPropagation();
                fileNode.classList.remove("tree-drop-target");
                if (!this.draggedTreeItem || this.draggedTreeItem === regItem) return;
                const source = this.draggedTreeItem;
                this.draggedTreeItem = null;
                await this.moveItemToFolder(source, {
                    isDirectory: true,
                    handle: regItem.parentHandle || this.rootHandle,
                    path: regItem.parentPath || "",
                    isRoot: !regItem.parentPath
                });
            };

            fileNode.onclick = async (e) => {
                e.stopPropagation();
                if (e.ctrlKey || e.metaKey) {
                    this.toggleTreeItemSelection(regItem);
                } else {
                    this.setSelectedTreeItem(regItem);
                    if (!treeDoubleClickOpen) {
                        this.clearFileModifiedInTree(regItem);
                        await this.openFileFromTree(item.handle, item.relativePath);
                    }
                }
            };

            fileNode.ondblclick = async (e) => {
                e.stopPropagation();
                if (e.ctrlKey || e.metaKey) return;
                this.setSelectedTreeItem(regItem);
                if (treeDoubleClickOpen) {
                    this.clearFileModifiedInTree(regItem);
                    await this.openFileFromTree(item.handle, item.relativePath);
                }
            };

            fileNode.oncontextmenu = (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.showContextMenu(e, regItem);
            };

            containerElem.appendChild(fileNode);
        }

        if (depth === 0) {
            containerElem.ondragover = (e) => {
                if (!this.draggedTreeItem) return;
                if (e.target === containerElem || e.target.classList.contains("tree-empty-message") || e.target.id === "folderTreeContainer") {
                    e.preventDefault();
                    e.dataTransfer.dropEffect = "move";
                    containerElem.classList.add("tree-drop-target");
                }
            };
            containerElem.ondragleave = (e) => {
                if (e.target === containerElem) {
                    containerElem.classList.remove("tree-drop-target");
                }
            };
            containerElem.ondrop = async (e) => {
                containerElem.classList.remove("tree-drop-target");
                if (e.target === containerElem || e.target.classList.contains("tree-empty-message") || e.target.id === "folderTreeContainer") {
                    e.preventDefault();
                    e.stopPropagation();
                    if (!this.draggedTreeItem) return;
                    const source = this.draggedTreeItem;
                    this.draggedTreeItem = null;
                    await this.moveItemToFolder(source, {
                        isDirectory: true,
                        handle: this.rootHandle,
                        path: "",
                        isRoot: true
                    });
                }
            };
            containerElem.onclick = (e) => {
                if (!e.target.closest || !e.target.closest(".tree-node")) {
                    this.clearTreeSelection();
                }
            };
            containerElem.oncontextmenu = (e) => {
                if (e.target === containerElem || e.target.classList.contains("tree-empty-message")) {
                    e.preventDefault();
                    this.showContextMenu(e, {
                        handle: this.rootHandle,
                        path: "",
                        isDirectory: true,
                        isRoot: true,
                        nodeElem: null
                    });
                }
            };
        }
        
        // Mark active file in tree if it was rendered in this directory, without scrolling or re-expanding
        if (this.activePath) {
            for (const item of files) {
                if (item.relativePath === this.activePath || item.relativePath.endsWith('/' + this.activePath) || this.activePath.endsWith('/' + item.relativePath)) {
                    const reg = this.nodeRegistry.get(item.relativePath);
                    if (reg && reg.nodeElem) {
                        reg.nodeElem.classList.add("active");
                    }
                }
            }
        }
    }

    getFileIcon(filename) {
        const lower = (filename || "").toLowerCase();
        const blueCppSvg = '<svg class="file-icon-svg" xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 256 288" preserveAspectRatio="xMidYMid"><path fill="#649AD2" d="M255.987 84.59c-.002-4.837-1.037-9.112-3.13-12.781-2.054-3.608-5.133-6.632-9.261-9.023-34.08-19.651-68.195-39.242-102.264-58.913-9.185-5.303-18.09-5.11-27.208.27-13.565 8-81.48 46.91-101.719 58.632C4.071 67.6.015 74.984.013 84.58 0 124.101.013 163.62 0 203.141c0 4.73.993 8.923 2.993 12.537 2.056 3.717 5.177 6.824 9.401 9.269 20.24 11.722 88.164 50.63 101.726 58.631 9.121 5.382 18.027 5.575 27.215.27 34.07-19.672 68.186-39.262 102.272-58.913 4.224-2.444 7.345-5.553 9.401-9.267 1.997-3.614 2.992-7.806 2.992-12.539 0 0 0-79.018-.013-118.539"/><path fill="#004482" d="m128.392 143.476-125.4 72.202c2.057 3.717 5.178 6.824 9.402 9.269 20.24 11.722 88.164 50.63 101.726 58.631 9.121 5.382 18.027 5.575 27.215.27 34.07-19.672 68.186-39.262 102.272-58.913 4.224-2.444 7.345-5.553 9.401-9.267l-124.616-72.192"/><path fill="#1A4674" d="M91.25 164.863c7.297 12.738 21.014 21.33 36.75 21.33 15.833 0 29.628-8.7 36.888-21.576l-36.496-21.141-37.142 21.387"/><path fill="#01589C" d="M255.987 84.59c-.002-4.837-1.037-9.112-3.13-12.781l-124.465 71.667 124.616 72.192c1.997-3.614 2.99-7.806 2.992-12.539 0 0 0-79.018-.013-118.539"/><path fill="#FFF" d="M249.135 148.636h-9.738v9.74h-9.74v-9.74h-9.737V138.9h9.737v-9.738h9.74v9.738h9.738v9.737ZM128 58.847c31.135 0 58.358 16.74 73.17 41.709l.444.759-37.001 21.307c-7.333-12.609-20.978-21.094-36.613-21.094-23.38 0-42.333 18.953-42.333 42.332a42.13 42.13 0 0 0 5.583 21.003c7.297 12.738 21.014 21.33 36.75 21.33 15.659 0 29.325-8.51 36.647-21.153l.241-.423 36.947 21.406c-14.65 25.597-42.228 42.851-73.835 42.851-31.549 0-59.084-17.185-73.754-42.707-7.162-12.459-11.26-26.904-11.26-42.307 0-46.95 38.061-85.013 85.014-85.013Zm75.865 70.314v9.738h9.737v9.737h-9.737v9.74h-9.738v-9.74h-9.738V138.9h9.738v-9.738h9.738Z"/></svg>';
        const violetCppSvg = '<svg class="file-icon-svg" xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 256 288" preserveAspectRatio="xMidYMid"><path fill="#B18CE2" d="M255.987 84.59c-.002-4.837-1.037-9.112-3.13-12.781-2.054-3.608-5.133-6.632-9.261-9.023-34.08-19.651-68.195-39.242-102.264-58.913-9.185-5.303-18.09-5.11-27.208.27-13.565 8-81.48 46.91-101.719 58.632C4.071 67.6.015 74.984.013 84.58 0 124.101.013 163.62 0 203.141c0 4.73.993 8.923 2.993 12.537 2.056 3.717 5.177 6.824 9.401 9.269 20.24 11.722 88.164 50.63 101.726 58.631 9.121 5.382 18.027 5.575 27.215.27 34.07-19.672 68.186-39.262 102.272-58.913 4.224-2.444 7.345-5.553 9.401-9.267 1.997-3.614 2.992-7.806 2.992-12.539 0 0 0-79.018-.013-118.539"/><path fill="#4C1D95" d="m128.392 143.476-125.4 72.202c2.057 3.717 5.178 6.824 9.402 9.269 20.24 11.722 88.164 50.63 101.726 58.631 9.121 5.382 18.027 5.575 27.215.27 34.07-19.672 68.186-39.262 102.272-58.913 4.224-2.444 7.345-5.553 9.401-9.267l-124.616-72.192"/><path fill="#3B1A66" d="M91.25 164.863c7.297 12.738 21.014 21.33 36.75 21.33 15.833 0 29.628-8.7 36.888-21.576l-36.496-21.141-37.142 21.387"/><path fill="#7C3AED" d="M255.987 84.59c-.002-4.837-1.037-9.112-3.13-12.781l-124.465 71.667 124.616 72.192c1.997-3.614 2.99-7.806 2.992-12.539 0 0 0-79.018-.013-118.539"/><path fill="#FFF" d="M249.135 148.636h-9.738v9.74h-9.74v-9.74h-9.737V138.9h9.737v-9.738h9.74v9.738h9.738v9.737ZM128 58.847c31.135 0 58.358 16.74 73.17 41.709l.444.759-37.001 21.307c-7.333-12.609-20.978-21.094-36.613-21.094-23.38 0-42.333 18.953-42.333 42.332a42.13 42.13 0 0 0 5.583 21.003c7.297 12.738 21.014 21.33 36.75 21.33 15.659 0 29.325-8.51 36.647-21.153l.241-.423 36.947 21.406c-14.65 25.597-42.228 42.851-73.835 42.851-31.549 0-59.084-17.185-73.754-42.707-7.162-12.459-11.26-26.904-11.26-42.307 0-46.95 38.061-85.013 85.014-85.013Zm75.865 70.314v9.738h9.737v9.737h-9.737v9.74h-9.738v-9.74h-9.738V138.9h9.738v-9.738h9.738Z"/></svg>';

        if (lower.endsWith(".cpp") || lower.endsWith(".c") || lower.endsWith(".cc") || lower.endsWith(".cxx") || lower.endsWith(".c++")) {
            return blueCppSvg;
        }
        if (lower.endsWith(".hpp") || lower.endsWith(".h") || lower.endsWith(".inl") || lower.endsWith(".inc") || lower.endsWith(".h++")) {
            return violetCppSvg;
        }
        if (lower.endsWith(".txt")) return "📜";
        if (lower.endsWith(".conf")) return "⚙️";
        if (lower.endsWith(".yml") || lower.endsWith(".yaml")) return "📋";
        if (lower.endsWith(".lua")) return "🌙";
        if (lower.endsWith(".json")) return "🟡";
        if (lower.endsWith(".md")) return "📝";
        return "📄";
    }

    async toggleFolderNode(regItem) {
        if (!regItem.isDirectory) return;
        regItem.isExpanded = !regItem.isExpanded;
        
        if (regItem.isExpanded) {
            regItem.arrowElem.textContent = "▼";
            regItem.arrowElem.classList.add("expanded");
            regItem.iconElem.textContent = "📂";
            regItem.childrenElem.classList.add("expanded");
            regItem.childrenElem.style.display = "block";

            if (!regItem.childrenLoaded) {
                await this.renderDirectoryChildren(regItem.handle, regItem.path, regItem.childrenElem, regItem.depth);
                regItem.childrenLoaded = true;
            }
        } else {
            regItem.arrowElem.textContent = "▶";
            regItem.arrowElem.classList.remove("expanded");
            regItem.iconElem.textContent = "📁";
            regItem.childrenElem.classList.remove("expanded");
            regItem.childrenElem.style.display = "none";
        }
    }

    markFileModifiedInTree(regItem, modified = true) {
        if (!regItem || !regItem.nodeElem) return;
        regItem.isModifiedExternally = modified;
        let dot = regItem.nodeElem.querySelector(".tree-modified-dot");
        if (modified) {
            if (!dot) {
                dot = document.createElement("span");
                dot.className = "tree-modified-dot";
                dot.title = "Modified externally in Notepad / external editor";
                regItem.nodeElem.appendChild(dot);
            }
            regItem.nodeElem.classList.add("file-externally-modified");
            regItem.nodeElem.title = `${regItem.path} (Modified externally)`;
        } else {
            if (dot) dot.remove();
            regItem.nodeElem.classList.remove("file-externally-modified");
            regItem.nodeElem.title = regItem.path;
        }
    }

    clearFileModifiedInTree(regItem) {
        this.markFileModifiedInTree(regItem, false);
    }

    setSelectedTreeItem(regItem) {
        this.selectedTreeItem = regItem || null;
        this.selectedTreeItems = regItem ? [regItem] : [];
        this.updateTreeSelectionUI();
    }

    toggleTreeItemSelection(regItem) {
        if (!regItem || regItem.isRoot) return;
        if (!this.selectedTreeItems) {
            this.selectedTreeItems = [];
        }

        const idx = this.selectedTreeItems.findIndex(it => it === regItem || (it.path === regItem.path && it.isDirectory === regItem.isDirectory));
        if (idx >= 0) {
            this.selectedTreeItems.splice(idx, 1);
            this.selectedTreeItem = this.selectedTreeItems.length > 0 ? this.selectedTreeItems[this.selectedTreeItems.length - 1] : null;
        } else {
            this.selectedTreeItems.push(regItem);
            this.selectedTreeItem = regItem;
        }
        this.updateTreeSelectionUI();
    }

    clearTreeSelection() {
        this.selectedTreeItem = null;
        this.selectedTreeItems = [];
        this.updateTreeSelectionUI();
    }

    updateTreeSelectionUI() {
        document.querySelectorAll(".tree-node.tree-selected").forEach(el => el.classList.remove("tree-selected"));
        if (this.selectedTreeItems && this.selectedTreeItems.length > 0) {
            for (const item of this.selectedTreeItems) {
                if (item && item.nodeElem) {
                    item.nodeElem.classList.add("tree-selected");
                }
            }
        }
    }

    hasTreeClipboard() {
        if (!this.treeClipboard) return false;
        if (this.treeClipboard.items && this.treeClipboard.items.length > 0) return true;
        if (this.treeClipboard.item) return true;
        return false;
    }

    getClipboardItems() {
        if (!this.treeClipboard) return [];
        if (this.treeClipboard.items && this.treeClipboard.items.length > 0) return this.treeClipboard.items;
        if (this.treeClipboard.item) return [this.treeClipboard.item];
        return [];
    }

    getClipboardCount() {
        return this.getClipboardItems().length;
    }

    initContextMenu() {
        const menu = document.getElementById("treeContextMenu");
        if (menu && !menu._hasListener) {
            menu._hasListener = true;
            menu.addEventListener("click", (e) => {
                const item = e.target.closest(".tree-menu-item");
                if (!item || item.classList.contains("disabled")) return;
                const action = item.dataset.action;
                const target = this.contextMenuItem || this.selectedTreeItem || { isDirectory: true, handle: this.rootHandle, isRoot: true, path: "" };

                if (action === "new-file") {
                    this.startInlineCreate(target, "file");
                } else if (action === "new-folder") {
                    this.startInlineCreate(target, "folder");
                } else if (action === "cut") {
                    this.cutItem(target);
                } else if (action === "copy") {
                    this.copyItem(target);
                } else if (action === "paste") {
                    this.pasteItem(target);
                } else if (action === "rename") {
                    this.startInlineRename(target);
                } else if (action === "delete") {
                    this.promptDelete(target);
                }
            });
        }

        if (!this._contextMenuOutsideBound) {
            this._contextMenuOutsideBound = true;
            const handleOutside = (e) => {
                const menu = document.getElementById("treeContextMenu");
                if (!menu || menu.style.display === "none") return;
                if (e.target && e.target.closest && e.target.closest("#treeContextMenu")) return;
                this.closeContextMenu();
            };

            window.addEventListener("pointerdown", handleOutside, true);
            window.addEventListener("mousedown", handleOutside, true);
            window.addEventListener("click", handleOutside, true);
            window.addEventListener("contextmenu", (e) => {
                const menu = document.getElementById("treeContextMenu");
                if (!menu || menu.style.display === "none") return;
                if (e.target && e.target.closest && e.target.closest("#treeContextMenu")) return;
                this.closeContextMenu();
            }, true);
            window.addEventListener("blur", () => this.closeContextMenu());
            window.addEventListener("resize", () => this.closeContextMenu());
            document.addEventListener("scroll", (e) => {
                const menu = document.getElementById("treeContextMenu");
                if (!menu || menu.style.display === "none") return;
                if (e.target && e.target.closest && e.target.closest("#treeContextMenu")) return;
                this.closeContextMenu();
            }, true);
        }

        if (!this._treeSelectionOutsideBound) {
            this._treeSelectionOutsideBound = true;
            const handleOutsideSelection = (e) => {
                // If nothing is selected in the tree, avoid unnecessary work
                if (!this.selectedTreeItem && (!this.selectedTreeItems || this.selectedTreeItems.length === 0)) {
                    if (!document.querySelector(".tree-node.tree-selected")) return;
                }

                // If clicking directly on a tree file or folder, allow tree node handlers to process it
                if (e.target && e.target.closest && e.target.closest(".tree-node")) return;

                // If clicking inside the tree context menu, preserve selection so menu actions (copy/cut/delete) work
                if (e.target && e.target.closest && e.target.closest("#treeContextMenu")) return;

                // If clicking inside any modal or dialog overlay, preserve selection
                if (e.target && e.target.closest && (e.target.closest(".modal") || e.target.closest(".modal-overlay"))) return;

                // User clicked outside the folder tree (or on empty space in tree container) -> clear selection
                this.clearTreeSelection();
            };

            window.addEventListener("pointerdown", handleOutsideSelection, true);
            window.addEventListener("mousedown", handleOutsideSelection, true);
            window.addEventListener("click", handleOutsideSelection, true);
        }

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                this.closeContextMenu();
                this.closeDeleteModal();
                if (this.treeClipboard && this.treeClipboard.action === 'cut') {
                    document.querySelectorAll('.tree-item-cut').forEach(el => el.classList.remove('tree-item-cut'));
                    this.treeClipboard = null;
                }
                this.clearTreeSelection();
            }

            if (e.key === "Enter") {
                const modal = document.getElementById("deleteItemConfirmModal");
                if (modal && modal.style.display !== "none") {
                    e.preventDefault();
                    this.confirmDelete();
                    return;
                }
            }

            const isCtrl = e.ctrlKey || e.metaKey;
            const isAlt = e.altKey;
            const isShift = e.shiftKey;
            const key = e.key ? e.key.toLowerCase() : "";

            const activeEl = document.activeElement;
            const isInputFocused = activeEl && (
                activeEl.tagName === "INPUT" ||
                activeEl.tagName === "TEXTAREA" ||
                activeEl.classList.contains("ace_text-input")
            );

            const hasTreeSelection = (this.selectedTreeItem || (this.selectedTreeItems && this.selectedTreeItems.length > 0));
            if (!isInputFocused) {
                if (hasTreeSelection) {
                    if (isCtrl && !isAlt && !isShift && key === "c") {
                        e.preventDefault();
                        this.copyItem(this.selectedTreeItem);
                    } else if (isCtrl && !isAlt && !isShift && key === "x") {
                        e.preventDefault();
                        this.cutItem(this.selectedTreeItem);
                    } else if (isCtrl && !isAlt && !isShift && key === "v") {
                        e.preventDefault();
                        this.pasteItem(this.selectedTreeItem);
                    } else if (e.key === "F2" && this.selectedTreeItem && (!this.selectedTreeItems || this.selectedTreeItems.length <= 1)) {
                        e.preventDefault();
                        this.startInlineRename(this.selectedTreeItem);
                    } else if (e.key === "Delete") {
                        e.preventDefault();
                        this.promptDelete();
                    } else if (e.key === "Enter" && this.selectedTreeItem && !this.selectedTreeItem.isDirectory) {
                        e.preventDefault();
                        this.clearFileModifiedInTree(this.selectedTreeItem);
                        this.openFileFromTree(this.selectedTreeItem.handle, this.selectedTreeItem.path);
                    } else if (e.key === "Enter" && this.selectedTreeItem && this.selectedTreeItem.isDirectory) {
                        e.preventDefault();
                        this.toggleFolderNode(this.selectedTreeItem);
                    }
                } else if (isCtrl && !isAlt && !isShift && key === "v" && this.hasTreeClipboard()) {
                    e.preventDefault();
                    this.pasteItem(this.selectedTreeItem || { isDirectory: true, handle: this.rootHandle, path: "", isRoot: true });
                }
            }
        });
    }

    showContextMenu(e, regItem) {
        const menu = document.getElementById("treeContextMenu");
        if (!menu) return;
        this.contextMenuItem = regItem;

        const inMulti = this.selectedTreeItems && this.selectedTreeItems.length > 1 &&
            this.selectedTreeItems.some(it => it === regItem || (it.path === regItem.path && it.isDirectory === regItem.isDirectory));
        if (!inMulti) {
            this.setSelectedTreeItem(regItem);
        }

        const isDir = regItem && regItem.isDirectory;
        const isRoot = !!(regItem && regItem.isRoot);
        const isMulti = this.selectedTreeItems && this.selectedTreeItems.length > 1;

        const newFileItem = document.getElementById("treeMenuNewFile");
        const newFolderItem = document.getElementById("treeMenuNewFolder");
        const div1 = document.getElementById("treeMenuDivider1");
        const cutItem = document.getElementById("treeMenuCut");
        const copyItem = document.getElementById("treeMenuCopy");
        const pasteItem = document.getElementById("treeMenuPaste");
        const div2 = document.getElementById("treeMenuDivider2");
        const renameItem = document.getElementById("treeMenuRename");
        const deleteItem = document.getElementById("treeMenuDelete");

        const updateItemLabel = (el, text) => {
            if (!el) return;
            const labelSpan = el.querySelector(".tree-menu-label");
            if (labelSpan) {
                labelSpan.textContent = text;
            }
        };

        const hasClipboard = this.hasTreeClipboard();
        const clipCount = this.getClipboardCount();

        if (isMulti) {
            if (newFileItem) newFileItem.style.display = "none";
            if (newFolderItem) newFolderItem.style.display = "none";
            if (div1) div1.style.display = "none";

            const count = this.selectedTreeItems.length;

            if (cutItem) {
                cutItem.style.display = "flex";
                updateItemLabel(cutItem, `Cut (${count})`);
            }
            if (copyItem) {
                copyItem.style.display = "flex";
                updateItemLabel(copyItem, `Copy (${count})`);
            }
            if (pasteItem) {
                pasteItem.style.display = "flex";
                if (hasClipboard) {
                    pasteItem.classList.remove("disabled");
                } else {
                    pasteItem.classList.add("disabled");
                }
                updateItemLabel(pasteItem, clipCount > 1 ? `Paste (${clipCount})` : "Paste");
            }
            if (div2) div2.style.display = "block";
            if (renameItem) renameItem.style.display = "none";
            if (deleteItem) {
                deleteItem.style.display = "flex";
                updateItemLabel(deleteItem, `Delete (${count})`);
            }
        } else {
            if (cutItem) updateItemLabel(cutItem, "Cut");
            if (copyItem) updateItemLabel(copyItem, "Copy");
            if (deleteItem) updateItemLabel(deleteItem, "Delete");

            if (isDir) {
                if (newFileItem) newFileItem.style.display = "flex";
                if (newFolderItem) newFolderItem.style.display = "flex";
                if (div1) div1.style.display = "block";
            } else {
                if (newFileItem) newFileItem.style.display = "none";
                if (newFolderItem) newFolderItem.style.display = "none";
                if (div1) div1.style.display = "none";
            }

            if (isRoot) {
                if (cutItem) cutItem.style.display = "none";
                if (copyItem) copyItem.style.display = "none";
                if (renameItem) renameItem.style.display = "none";
                if (deleteItem) deleteItem.style.display = "none";
                if (div2) div2.style.display = "none";
            } else {
                if (cutItem) cutItem.style.display = "flex";
                if (copyItem) copyItem.style.display = "flex";
                if (renameItem) renameItem.style.display = "flex";
                if (deleteItem) deleteItem.style.display = "flex";
                if (div2) div2.style.display = "block";
            }

            if (pasteItem) {
                pasteItem.style.display = "flex";
                if (hasClipboard) {
                    pasteItem.classList.remove("disabled");
                } else {
                    pasteItem.classList.add("disabled");
                }
                updateItemLabel(pasteItem, clipCount > 1 ? `Paste (${clipCount})` : "Paste");
            }
        }

        menu.style.display = "block";
        const menuW = menu.offsetWidth || 180;
        const menuH = menu.offsetHeight || 220;
        const x = Math.min(e.pageX, window.innerWidth - menuW - 10);
        const y = Math.min(e.pageY, window.innerHeight - menuH - 10);
        menu.style.left = `${Math.max(5, x)}px`;
        menu.style.top = `${Math.max(5, y)}px`;
    }

    closeContextMenu() {
        const menu = document.getElementById("treeContextMenu");
        if (menu) menu.style.display = "none";
        this.contextMenuItem = null;
    }

    async startInlineCreate(parentReg, type = 'file') {
        this.closeContextMenu();
        if (!this.rootHandle) return;

        if (parentReg && parentReg.isDirectory && !parentReg.isExpanded && !parentReg.isRoot) {
            await this.toggleFolderNode(parentReg);
        }

        const container = (parentReg && parentReg.childrenElem) || document.getElementById("folderTreeContainer");
        if (!container) return;

        document.querySelectorAll(".tree-inline-row").forEach(el => el.remove());

        const depth = (parentReg && parentReg.depth !== undefined) ? parentReg.depth : 0;
        const row = document.createElement("div");
        row.className = "tree-inline-row";
        row.style.paddingLeft = `${depth * 14 + 6}px`;

        const icon = document.createElement("span");
        icon.className = "tree-icon";
        icon.textContent = type === 'folder' ? '📁' : '📄';

        const input = document.createElement("input");
        input.type = "text";
        input.className = "tree-inline-input";
        input.placeholder = type === 'folder' ? 'folder-name' : 'new-file.txt';

        row.appendChild(icon);
        row.appendChild(input);

        if (container.firstChild) {
            container.insertBefore(row, container.firstChild);
        } else {
            container.appendChild(row);
        }
        input.focus();

        let committed = false;
        const commit = async () => {
            if (committed) return;
            committed = true;
            const name = input.value.trim();
            row.remove();
            if (!name) return;
            if (/[\\/:*?"<>|]/.test(name)) {
                showSnackbar("Invalid name. Characters / \\ : * ? \" < > | are not allowed.");
                return;
            }

            const targetDirHandle = (parentReg && parentReg.handle) || this.rootHandle;
            try {
                if (type === 'file') {
                    const handle = await targetDirHandle.getFileHandle(name, { create: true });
                    const relPath = parentReg && parentReg.path ? `${parentReg.path}/${name}` : name;
                    await this.refresh(true, true);
                    await this.openFileFromTree(handle, relPath);
                    showSnackbar(`Created file "${name}".`);
                } else {
                    await targetDirHandle.getDirectoryHandle(name, { create: true });
                    await this.refresh(true, true);
                    showSnackbar(`Created folder "${name}".`);
                }
            } catch (err) {
                console.error("Create failed:", err);
                showSnackbar(`Failed to create ${type} "${name}".`);
            }
        };

        input.onkeydown = (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                commit();
            } else if (e.key === "Escape") {
                e.preventDefault();
                committed = true;
                row.remove();
            }
        };

        input.onblur = () => {
            setTimeout(() => {
                if (!committed) commit();
            }, 120);
        };
    }

    startInlineRename(regItem) {
        this.closeContextMenu();
        if (!regItem || regItem.isRoot || !regItem.nodeElem) return;

        const label = regItem.nodeElem.querySelector(".tree-label");
        if (!label) return;

        const oldName = regItem.path.split("/").pop();
        const input = document.createElement("input");
        input.type = "text";
        input.className = "tree-inline-input";
        input.value = oldName;

        label.style.display = "none";
        regItem.nodeElem.insertBefore(input, label.nextSibling);
        input.focus();

        const dotIndex = oldName.lastIndexOf(".");
        if (!regItem.isDirectory && dotIndex > 0) {
            input.setSelectionRange(0, dotIndex);
        } else {
            input.select();
        }

        let committed = false;
        const commit = async () => {
            if (committed) return;
            committed = true;
            const newName = input.value.trim();
            input.remove();
            label.style.display = "";

            if (!newName || newName === oldName) return;
            if (/[\\/:*?"<>|]/.test(newName)) {
                showSnackbar("Invalid name. Characters / \\ : * ? \" < > | are not allowed.");
                return;
            }

            const parentHandle = regItem.parentHandle || this.rootHandle;
            try {
                let moved = false;
                if (typeof regItem.handle.move === "function") {
                    try {
                        await regItem.handle.move(newName);
                        moved = true;
                    } catch (me) {}
                }
                if (!moved) {
                    if (regItem.isDirectory) {
                        await this.copyDirRecursive(regItem.handle, parentHandle, newName);
                        await parentHandle.removeEntry(oldName, { recursive: true });
                    } else {
                        const srcFile = await regItem.handle.getFile();
                        const buf = await srcFile.arrayBuffer();
                        const newFileHandle = await parentHandle.getFileHandle(newName, { create: true });
                        const w = await newFileHandle.createWritable();
                        await w.write(buf);
                        await w.close();
                        await parentHandle.removeEntry(oldName);
                    }
                }

                let newFileHandle = null;
                if (!regItem.isDirectory) {
                    try {
                        newFileHandle = await parentHandle.getFileHandle(newName);
                    } catch (e) {}
                }

                if (typeof tabManager !== 'undefined') {
                    tabManager.tabs.forEach(tab => {
                        if (tab.relativePath === regItem.path) {
                            tab.name = newName;
                            const segs = tab.relativePath.split('/');
                            segs[segs.length - 1] = newName;
                            tab.relativePath = segs.join('/');
                            if (newFileHandle) tab.fileHandle = newFileHandle;
                            tab.updateTitle();
                            tab.saveToDB();
                        } else if (tab.relativePath.startsWith(regItem.path + "/")) {
                            tab.relativePath = tab.relativePath.replace(regItem.path + "/", newName + "/");
                            tab.updateTitle();
                            tab.saveToDB();
                        }
                    });
                    tabManager.renderTabs();
                }

                await this.refresh(true, true);
                showSnackbar(`Renamed to "${newName}".`);
            } catch (err) {
                console.error("Rename failed:", err);
                showSnackbar(`Failed to rename "${oldName}".`);
            }
        };

        input.onkeydown = (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                commit();
            } else if (e.key === "Escape") {
                e.preventDefault();
                committed = true;
                input.remove();
                label.style.display = "";
            }
        };

        input.onblur = () => {
            setTimeout(() => {
                if (!committed) commit();
            }, 120);
        };
    }

    promptDelete(regItem) {
        this.closeContextMenu();

        let itemsToDelete = [];
        const selected = (this.selectedTreeItems || []).filter(item => item && !item.isRoot);

        if (selected.length > 1 && (!regItem || selected.includes(regItem) || selected.some(it => it.path === regItem.path))) {
            itemsToDelete = selected;
        } else if (regItem && !regItem.isRoot) {
            itemsToDelete = [regItem];
        } else if (this.selectedTreeItem && !this.selectedTreeItem.isRoot) {
            itemsToDelete = [this.selectedTreeItem];
        }

        if (itemsToDelete.length === 0) return;

        this.pendingDeleteItems = itemsToDelete;
        this.pendingDeleteItem = itemsToDelete[0];

        const modal = document.getElementById("deleteItemConfirmModal");
        const header = document.getElementById("deleteItemHeader");
        const message = document.getElementById("deleteItemMessage");

        if (itemsToDelete.length === 1) {
            const item = itemsToDelete[0];
            const name = item.path.split("/").pop();
            if (header) header.textContent = `Delete ${item.isDirectory ? "Folder" : "File"}`;
            if (message) message.textContent = `Are you sure you want to delete "${name}"${item.isDirectory ? " along with all its contents?" : "?"}`;
        } else {
            if (header) header.textContent = `Delete ${itemsToDelete.length} Items`;
            if (message) {
                message.textContent = `Are you sure you want to delete these ${itemsToDelete.length} selected items?`;
            }
        }

        const confirmBtn = document.getElementById("deleteItemConfirmBtn");
        if (confirmBtn) {
            confirmBtn.onclick = () => this.confirmDelete();
        }
        if (modal) modal.style.display = "flex";
    }

    closeDeleteModal() {
        const modal = document.getElementById("deleteItemConfirmModal");
        if (modal) modal.style.display = "none";
        this.pendingDeleteItem = null;
        this.pendingDeleteItems = [];
    }

    async confirmDelete() {
        const itemsToDelete = (this.pendingDeleteItems && this.pendingDeleteItems.length > 0)
            ? [...this.pendingDeleteItems]
            : (this.pendingDeleteItem ? [this.pendingDeleteItem] : []);

        if (itemsToDelete.length === 0) return;
        this.closeDeleteModal();

        // Avoid attempting to delete children if parent folder is already being deleted
        const pathsToDelete = new Set(itemsToDelete.map(it => it.path));
        const normalizedItems = itemsToDelete.filter(item => {
            const parts = item.path.split("/");
            let current = "";
            for (let i = 0; i < parts.length - 1; i++) {
                current = current ? `${current}/${parts[i]}` : parts[i];
                if (pathsToDelete.has(current)) {
                    return false;
                }
            }
            return true;
        });

        let successCount = 0;
        let failCount = 0;

        for (const regItem of normalizedItems) {
            const parentHandle = regItem.parentHandle || this.rootHandle;
            const name = regItem.path.split("/").pop();
            try {
                await parentHandle.removeEntry(name, { recursive: regItem.isDirectory });
                successCount++;

                if (typeof tabManager !== 'undefined') {
                    tabManager.tabs.forEach(tab => {
                        if (tab.relativePath === regItem.path || tab.relativePath.startsWith(regItem.path + "/")) {
                            tab.fileHandle = null;
                            tab.updateTitle();
                        }
                    });
                }
            } catch (err) {
                console.error(`Delete failed for "${name}":`, err);
                failCount++;
            }
        }

        this.clearTreeSelection();
        if (this.treeClipboard) {
            const deletedPaths = new Set(normalizedItems.map(it => it.path));
            if (this.treeClipboard.items) {
                this.treeClipboard.items = this.treeClipboard.items.filter(it => !deletedPaths.has(it.path));
                this.treeClipboard.item = this.treeClipboard.items[0] || null;
                if (this.treeClipboard.items.length === 0) {
                    this.treeClipboard = null;
                }
            } else if (this.treeClipboard.item && deletedPaths.has(this.treeClipboard.item.path)) {
                this.treeClipboard = null;
            }
        }
        await this.refresh(true, true);
        this.indexWorkspaceFiles();

        if (normalizedItems.length === 1) {
            const singleName = normalizedItems[0].path.split("/").pop();
            if (successCount > 0) {
                showSnackbar(`Deleted "${singleName}".`);
            } else {
                showSnackbar(`Failed to delete "${singleName}".`);
            }
        } else {
            if (failCount === 0) {
                showSnackbar(`Deleted ${successCount} items.`);
            } else {
                showSnackbar(`Deleted ${successCount} items (${failCount} failed).`);
            }
        }
    }

    cutItem(regItem) {
        this.closeContextMenu();
        let items = [];
        const selected = (this.selectedTreeItems || []).filter(item => item && !item.isRoot);
        if (selected.length > 1 && (!regItem || selected.includes(regItem) || selected.some(it => it.path === regItem.path))) {
            items = [...selected];
        } else if (regItem && !regItem.isRoot) {
            items = [regItem];
        } else if (selected.length > 0) {
            items = [...selected];
        } else if (this.selectedTreeItem && !this.selectedTreeItem.isRoot) {
            items = [this.selectedTreeItem];
        }

        if (items.length === 0) return;

        document.querySelectorAll('.tree-item-cut').forEach(el => el.classList.remove('tree-item-cut'));
        this.treeClipboard = { action: 'cut', items: items, item: items[0] };

        items.forEach(it => {
            if (it && it.nodeElem) {
                it.nodeElem.classList.add('tree-item-cut');
            }
        });

        if (items.length === 1) {
            const name = items[0].path.split("/").pop();
            showSnackbar(`Cut "${name}".`);
        } else {
            showSnackbar(`Cut ${items.length} items.`);
        }
    }

    copyItem(regItem) {
        this.closeContextMenu();
        let items = [];
        const selected = (this.selectedTreeItems || []).filter(item => item && !item.isRoot);
        if (selected.length > 1 && (!regItem || selected.includes(regItem) || selected.some(it => it.path === regItem.path))) {
            items = [...selected];
        } else if (regItem && !regItem.isRoot) {
            items = [regItem];
        } else if (selected.length > 0) {
            items = [...selected];
        } else if (this.selectedTreeItem && !this.selectedTreeItem.isRoot) {
            items = [this.selectedTreeItem];
        }

        if (items.length === 0) return;

        document.querySelectorAll('.tree-item-cut').forEach(el => el.classList.remove('tree-item-cut'));
        this.treeClipboard = { action: 'copy', items: items, item: items[0] };

        if (items.length === 1) {
            const name = items[0].path.split("/").pop();
            showSnackbar(`Copied "${name}".`);
        } else {
            showSnackbar(`Copied ${items.length} items.`);
        }
    }

    async moveItemToFolder(source, targetReg) {
        if (!source || source.isRoot) return false;

        let destDirHandle = this.rootHandle;
        let destPath = "";

        if (targetReg) {
            if (targetReg.isRoot) {
                destDirHandle = this.rootHandle;
                destPath = "";
            } else if (targetReg.isDirectory) {
                destDirHandle = targetReg.handle || this.rootHandle;
                destPath = targetReg.path || "";
            } else {
                destDirHandle = targetReg.parentHandle || this.rootHandle;
                destPath = targetReg.parentPath || "";
            }
        }

        const sourceName = source.path.split("/").pop();

        if (source.isDirectory && destPath && (destPath === source.path || destPath.startsWith(source.path + "/"))) {
            showSnackbar("Cannot move a folder into itself.");
            return false;
        }

        const isSameFolder = (source.parentHandle && (source.parentHandle === destDirHandle || (await this.isSameHandle(source.parentHandle, destDirHandle))));
        if (isSameFolder) {
            showSnackbar("Source and destination folder are the same.");
            return false;
        }

        const finalName = await this.generateUniqueName(destDirHandle, sourceName, source.isDirectory);

        try {
            let moved = false;
            if (typeof source.handle.move === "function") {
                try {
                    await source.handle.move(destDirHandle, finalName);
                    moved = true;
                } catch (me) {}
            }
            if (!moved) {
                if (source.isDirectory) {
                    await this.copyDirRecursive(source.handle, destDirHandle, finalName);
                    await source.parentHandle.removeEntry(sourceName, { recursive: true });
                } else {
                    const srcFile = await source.handle.getFile();
                    const buf = await srcFile.arrayBuffer();
                    const newHandle = await destDirHandle.getFileHandle(finalName, { create: true });
                    const w = await newHandle.createWritable();
                    await w.write(buf);
                    await w.close();
                    await source.parentHandle.removeEntry(sourceName);
                }
            }

            const oldPath = source.path;
            const newRelativePath = destPath ? `${destPath}/${finalName}` : finalName;

            let newFileHandle = null;
            if (!source.isDirectory) {
                try {
                    newFileHandle = await destDirHandle.getFileHandle(finalName);
                } catch (e) {}
            } else {
                try {
                    newFileHandle = await destDirHandle.getDirectoryHandle(finalName);
                } catch (e) {}
            }

            // CRITICAL: Update open tabs location and title attribute!
            if (typeof tabManager !== 'undefined') {
                let affected = false;
                tabManager.tabs.forEach(tab => {
                    if (!source.isDirectory) {
                        if (tab.relativePath === oldPath || (!tab.relativePath && tab.name === sourceName)) {
                            tab.name = finalName;
                            tab.relativePath = newRelativePath;
                            if (newFileHandle) {
                                tab.fileHandle = newFileHandle;
                            }
                            tab.updateTitle();
                            tab.saveToDB();
                            affected = true;
                        }
                    } else {
                        if (tab.relativePath === oldPath) {
                            tab.relativePath = newRelativePath;
                            tab.updateTitle();
                            tab.saveToDB();
                            affected = true;
                        } else if (tab.relativePath && tab.relativePath.startsWith(oldPath + "/")) {
                            const sub = tab.relativePath.substring(oldPath.length + 1);
                            tab.relativePath = `${newRelativePath}/${sub}`;
                            tab.updateTitle();
                            tab.saveToDB();
                            affected = true;
                        }
                    }
                });

                if (affected) {
                    tabManager.renderTabs();
                }
            }

            document.querySelectorAll('.tree-item-cut').forEach(el => el.classList.remove('tree-item-cut'));
            if (this.treeClipboard && this.treeClipboard.action === 'cut') {
                this.treeClipboard = null;
            }

            await this.refresh(true, true);
            this.indexWorkspaceFiles();

            if (typeof tabManager !== 'undefined' && tabManager.activeTab) {
                await this.highlightActiveInTree(tabManager.activeTab.relativePath, tabManager.activeTab, false);
            }

            const destLabel = destPath || this.rootName || "root folder";
            showSnackbar(`Moved "${sourceName}" to "${destLabel}".`);
            return true;
        } catch (err) {
            console.error("Move item failed:", err);
            showSnackbar(`Failed to move "${sourceName}".`);
            return false;
        }
    }

    async pasteItem(targetReg) {
        this.closeContextMenu();
        const items = this.getClipboardItems();
        if (items.length === 0) {
            showSnackbar("Clipboard is empty.");
            return;
        }

        const action = this.treeClipboard.action;

        let destDirHandle = this.rootHandle;
        let destPath = "";

        if (targetReg) {
            if (targetReg.isRoot) {
                destDirHandle = this.rootHandle;
                destPath = "";
            } else if (targetReg.isDirectory) {
                destDirHandle = targetReg.handle || this.rootHandle;
                destPath = targetReg.path || "";
            } else {
                destDirHandle = targetReg.parentHandle || this.rootHandle;
                destPath = targetReg.parentPath || "";
            }
        }

        if (!destDirHandle) {
            showSnackbar("Destination folder not found.");
            return;
        }

        const destLabel = destPath || this.rootName || "root folder";

        const validItems = items.filter(item => item && !item.isRoot);
        // Avoid nested redundancies (e.g., if a directory and its child are both in clipboard)
        const itemsToProcess = validItems.filter(item => {
            return !validItems.some(other => other !== item && other.isDirectory && item.path.startsWith(other.path + "/"));
        });

        if (itemsToProcess.length === 0) {
            showSnackbar("No valid items to paste.");
            return;
        }

        if (action === 'cut') {
            let successCount = 0;
            let failCount = 0;
            let affectedTabs = false;
            let lastMovedName = "";

            for (const source of itemsToProcess) {
                const sourceName = source.path.split("/").pop();

                if (source.isDirectory && destPath && (destPath === source.path || destPath.startsWith(source.path + "/"))) {
                    showSnackbar("Cannot move a folder into itself.");
                    failCount++;
                    continue;
                }

                const isSameFolder = (source.parentHandle && (source.parentHandle === destDirHandle || (await this.isSameHandle(source.parentHandle, destDirHandle))));
                if (isSameFolder) {
                    continue;
                }

                try {
                    const finalName = await this.generateUniqueName(destDirHandle, sourceName, source.isDirectory);
                    let moved = false;
                    if (typeof source.handle.move === "function") {
                        try {
                            await source.handle.move(destDirHandle, finalName);
                            moved = true;
                        } catch (me) {}
                    }
                    if (!moved) {
                        if (source.isDirectory) {
                            await this.copyDirRecursive(source.handle, destDirHandle, finalName);
                            if (source.parentHandle) {
                                await source.parentHandle.removeEntry(sourceName, { recursive: true });
                            }
                        } else {
                            const srcFile = await source.handle.getFile();
                            const buf = await srcFile.arrayBuffer();
                            const newHandle = await destDirHandle.getFileHandle(finalName, { create: true });
                            const w = await newHandle.createWritable();
                            await w.write(buf);
                            await w.close();
                            if (source.parentHandle) {
                                await source.parentHandle.removeEntry(sourceName);
                            }
                        }
                    }

                    const oldPath = source.path;
                    const newRelativePath = destPath ? `${destPath}/${finalName}` : finalName;

                    let newFileHandle = null;
                    if (!source.isDirectory) {
                        try {
                            newFileHandle = await destDirHandle.getFileHandle(finalName);
                        } catch (e) {}
                    } else {
                        try {
                            newFileHandle = await destDirHandle.getDirectoryHandle(finalName);
                        } catch (e) {}
                    }

                    // CRITICAL: Update open tabs location and title attribute!
                    if (typeof tabManager !== 'undefined') {
                        tabManager.tabs.forEach(tab => {
                            if (!source.isDirectory) {
                                if (tab.relativePath === oldPath || (!tab.relativePath && tab.name === sourceName)) {
                                    tab.name = finalName;
                                    tab.relativePath = newRelativePath;
                                    if (newFileHandle) {
                                        tab.fileHandle = newFileHandle;
                                    }
                                    tab.updateTitle();
                                    tab.saveToDB();
                                    affectedTabs = true;
                                }
                            } else {
                                if (tab.relativePath === oldPath) {
                                    tab.relativePath = newRelativePath;
                                    tab.updateTitle();
                                    tab.saveToDB();
                                    affectedTabs = true;
                                } else if (tab.relativePath && tab.relativePath.startsWith(oldPath + "/")) {
                                    const sub = tab.relativePath.substring(oldPath.length + 1);
                                    tab.relativePath = `${newRelativePath}/${sub}`;
                                    tab.updateTitle();
                                    tab.saveToDB();
                                    affectedTabs = true;
                                }
                            }
                        });
                    }

                    lastMovedName = sourceName;
                    successCount++;
                } catch (err) {
                    console.error(`Move failed for "${sourceName}":`, err);
                    failCount++;
                }
            }

            if (affectedTabs && typeof tabManager !== 'undefined') {
                tabManager.renderTabs();
            }

            document.querySelectorAll('.tree-item-cut').forEach(el => el.classList.remove('tree-item-cut'));
            this.treeClipboard = null;

            await this.refresh(true, true);
            this.indexWorkspaceFiles();

            if (typeof tabManager !== 'undefined' && tabManager.activeTab) {
                await this.highlightActiveInTree(tabManager.activeTab.relativePath, tabManager.activeTab, false);
            }

            if (itemsToProcess.length === 1) {
                if (successCount > 0) {
                    showSnackbar(`Moved "${lastMovedName}" to "${destLabel}".`);
                } else if (failCount > 0) {
                    showSnackbar(`Failed to move "${lastMovedName}".`);
                }
            } else {
                if (failCount === 0) {
                    showSnackbar(`Moved ${successCount} items to "${destLabel}".`);
                } else {
                    showSnackbar(`Moved ${successCount} items to "${destLabel}" (${failCount} failed).`);
                }
            }
        } else if (action === 'copy') {
            let successCount = 0;
            let failCount = 0;
            let lastPastedName = "";

            for (const item of itemsToProcess) {
                const sourceName = item.path.split("/").pop();

                if (item.isDirectory && destPath && (destPath === item.path || destPath.startsWith(item.path + "/"))) {
                    showSnackbar("Cannot copy a folder into itself.");
                    failCount++;
                    continue;
                }

                try {
                    const finalName = await this.generateUniqueName(destDirHandle, sourceName, item.isDirectory);
                    if (item.isDirectory) {
                        await this.copyDirRecursive(item.handle, destDirHandle, finalName);
                    } else {
                        const srcFile = await item.handle.getFile();
                        const buf = await srcFile.arrayBuffer();
                        const newHandle = await destDirHandle.getFileHandle(finalName, { create: true });
                        const w = await newHandle.createWritable();
                        await w.write(buf);
                        await w.close();
                    }
                    lastPastedName = finalName;
                    successCount++;
                } catch (err) {
                    console.error(`Copy failed for "${sourceName}":`, err);
                    failCount++;
                }
            }

            await this.refresh(true, true);
            this.indexWorkspaceFiles();

            if (itemsToProcess.length === 1) {
                if (successCount > 0) {
                    showSnackbar(`Pasted "${lastPastedName}".`);
                } else {
                    showSnackbar(`Failed to paste.`);
                }
            } else {
                if (failCount === 0) {
                    showSnackbar(`Pasted ${successCount} items.`);
                } else {
                    showSnackbar(`Pasted ${successCount} items (${failCount} failed).`);
                }
            }
        }
    }

    async generateUniqueName(destDirHandle, sourceName, isDirectory) {
        if (!destDirHandle || !sourceName) return sourceName;

        const entryExists = async (dirHandle, name) => {
            try {
                await dirHandle.getFileHandle(name);
                return true;
            } catch (e) {}
            try {
                await dirHandle.getDirectoryHandle(name);
                return true;
            } catch (e) {}
            return false;
        };

        if (!(await entryExists(destDirHandle, sourceName))) {
            return sourceName;
        }

        let base = sourceName;
        let ext = "";

        if (!isDirectory) {
            const dotIdx = sourceName.lastIndexOf(".");
            if (dotIdx > 0) {
                base = sourceName.substring(0, dotIdx);
                ext = sourceName.substring(dotIdx);
            }
        }

        let counter = 1;
        let candidate = `${base} (${counter})${ext}`;
        while (await entryExists(destDirHandle, candidate)) {
            counter++;
            candidate = `${base} (${counter})${ext}`;
        }
        return candidate;
    }

    async isSameHandle(h1, h2) {
        if (!h1 || !h2) return false;
        if (h1 === h2) return true;
        try {
            if (typeof h1.isSameEntry === "function") {
                return await h1.isSameEntry(h2);
            }
        } catch (e) {}
        return false;
    }

    async copyDirRecursive(srcDirHandle, targetDirHandle, newDirName) {
        const destDir = await targetDirHandle.getDirectoryHandle(newDirName, { create: true });
        for await (const [name, entry] of srcDirHandle.entries()) {
            if (entry.kind === "file") {
                const f = await entry.getFile();
                const buf = await f.arrayBuffer();
                const destF = await destDir.getFileHandle(name, { create: true });
                const w = await destF.createWritable();
                await w.write(buf);
                await w.close();
            } else if (entry.kind === "directory") {
                await this.copyDirRecursive(entry, destDir, name);
            }
        }
    }

    async openFileFromTree(fileHandle, relativePath) {
        if (typeof tabManager === 'undefined') return;
        this.suppressTreeScroll = true;
        const currentReg = this.nodeRegistry.get(relativePath);
        if (currentReg) {
            this.clearFileModifiedInTree(currentReg);
            this.setSelectedTreeItem(currentReg);
        }
        try {
            // Check if this file is already open in an existing tab
            let existingTab = null;
            for (const tab of tabManager.tabs) {
                if (tab.fileHandle) {
                    try {
                        if (await tab.fileHandle.isSameEntry(fileHandle)) {
                            existingTab = tab;
                            break;
                        }
                    } catch (e) {}
                }
                if (!existingTab && tab.relativePath && tab.relativePath === relativePath) {
                    existingTab = tab;
                    break;
                }
            }

            if (existingTab) {
                tabManager.switchTab(existingTab.id);
                await this.highlightActiveInTree(relativePath, existingTab, false);
                try {
                    const file = await fileHandle.getFile();
                    const fileData = await readFileWithEncoding(file, existingTab.encoding);
                    const contents = fileData.text;
                    const diskModified = file.lastModified || Date.now();
                    const oldCode = existingTab.editor.getValue();
                    const normDisk = normalizeCode(contents);
                    const normSaved = normalizeCode(existingTab.lastSavedCode || '');
                    const normEditor = normalizeCode(oldCode);
                    const wasDiskEdited = (normDisk !== normSaved && normDisk !== normEditor);

                    if (wasDiskEdited) {
                        if (existingTab.isDirty()) {
                            existingTab.lastModified = diskModified;
                            openExternalConflictModal(existingTab, contents, diskModified);
                            return;
                        }
                        if (existingTab.diskSaveTimeout) {
                            clearTimeout(existingTab.diskSaveTimeout);
                            existingTab.diskSaveTimeout = null;
                        }
                        existingTab.lastSavedCode = contents;
                        existingTab.lastModified = diskModified;
                        existingTab.editor.setValue(contents, -1);
                        existingTab.editor.session.setUndoManager(new ace.UndoManager());
                        existingTab.updateTabIcon();
                        existingTab.updateTitle();
                        existingTab.saveCurrentCodeToHistory();
                        existingTab.saveToDB();
                        updateStatusBarEncoding(existingTab);

                        const diffIndex = existingTab.recordChange(oldCode, contents, new Date(diskModified));
                        if (diffIndex !== null) {
                            const diffData = existingTab.diffHistory[diffIndex] || { additions: 0, removals: 0 };
                            const additions = diffData.additions || 0;
                            const removals = diffData.removals || 0;
                            let aiMessage = `<p>File was modified externally (e.g. Notepad).<br/><br/>
                                            <span style="font-size:10px"><b>Time Edited:</b> ${(new Date(diskModified)).toLocaleString()}<br/>
                                            <b><span style="color: #2ea043;">+${additions}</span> <span style="color: #f85149;">-${removals}</span> lines changed</b></span></p>`;
                            aiMessage += `<div class="diff-actions">
                                            <button class="diff-btn view" onclick="openDiff(${diffIndex}, ${existingTab.id})">View Changes</button>
                                            <button class="diff-btn restore" onclick="restoreFromDiff(${diffIndex}, 'new', ${existingTab.id})">Restore Code here</button>
                                          </div>`;
                            existingTab.addMessage(aiMessage, 'ai');
                        }
                        showSnackbar(`"${existingTab.name}" updated with external changes.`);
                    } else {
                        existingTab.lastModified = diskModified;
                    }
                } catch(e) {}
                return;
            }

            const file = await fileHandle.getFile();
            const fileData = await readFileWithEncoding(file);
            const contents = fileData.text;

            // Decide where to open: reuse current tab if empty/untitled/clean, otherwise open in a new tab!
            let targetTab;
            const active = tabManager.activeTab;
            if (active && !active.fileHandle && active.name === "Untitled" && !active.isDirty() && active.editor.getValue().trim() === "") {
                targetTab = active;
            } else {
                targetTab = tabManager.addTab();
            }

            targetTab.fileHandle = fileHandle;
            targetTab.relativePath = relativePath;
            targetTab.name = file.name;
            targetTab.encoding = fileData.encoding;
            targetTab.lastSavedCode = contents;
            targetTab.lastModified = file.lastModified || Date.now();
            targetTab.codeHistory = [];
            targetTab.currentHistoryIndex = -1;

            targetTab.editor.setValue(contents, -1);
            targetTab.editor.session.setUndoManager(new ace.UndoManager());
            targetTab.editor.scrollToLine(1, true, true);
            targetTab.editor.gotoLine(1, 0, false);
            targetTab.updateEditorMode();
            targetTab.saveCurrentCodeToHistory();
            targetTab.updateTabIcon();
            targetTab.updateTitle();

            tabManager.renderTabs();
            tabManager.switchTab(targetTab.id);
            updateStatusBarEncoding(targetTab);
            targetTab.saveToDB();

            await this.highlightActiveInTree(relativePath, targetTab, false);
        } catch (err) {
            console.error("Failed to open file from tree:", err);
            showSnackbar(`Failed to open "${relativePath}".`);
        } finally {
            setTimeout(() => {
                this.suppressTreeScroll = false;
            }, 300);
        }
    }

    async syncActiveTabWithTree(tab, shouldScroll = true) {
        if (!this.rootHandle) return;
        if (!tab && typeof tabManager !== 'undefined') {
            tab = tabManager.activeTab;
        }
        if (!tab) return;

        if (this.suppressTreeScroll) {
            shouldScroll = false;
        }

        // Try to re-resolve tab fileHandle against current workspace rootHandle
        if (tab.fileHandle && this.rootHandle) {
            try {
                const parts = await this.rootHandle.resolve(tab.fileHandle);
                if (parts && parts.length > 0) {
                    const resolvedPath = parts.join('/');
                    if (tab.relativePath !== resolvedPath) {
                        tab.relativePath = resolvedPath;
                        tab.updateTitle();
                        tab.saveToDB();
                        if (typeof tabManager !== 'undefined') {
                            tabManager.renderTabs();
                        }
                    }
                }
            } catch (e) {}
        }

        await this.highlightActiveInTree(tab.relativePath, tab, shouldScroll);
    }

    async highlightActiveInTree(relativePath, tabObj = null, shouldScroll = true) {
        if (!tabObj && typeof tabManager !== 'undefined') {
            tabObj = tabManager.activeTab;
        }

        // Normalize path
        let normPath = (relativePath || (tabObj ? tabObj.relativePath : "")) || "";
        normPath = normPath.replace(/\\/g, '/').replace(/^\.?\//, '').trim();
        this.activePath = normPath;

        // Remove active class from any existing nodes
        document.querySelectorAll(".tree-node.active").forEach(el => el.classList.remove("active"));
        if (!normPath && !tabObj) return;

        // 1. Expand ancestor folders if path contains directory separators
        if (normPath && normPath.includes('/')) {
            const segments = normPath.split('/');
            let curPath = "";
            for (let i = 0; i < segments.length - 1; i++) {
                curPath = curPath ? `${curPath}/${segments[i]}` : segments[i];
                let parentReg = this.nodeRegistry.get(curPath);
                if (!parentReg) {
                    for (const [rPath, rItem] of this.nodeRegistry.entries()) {
                        if (rItem.isDirectory && (rPath.endsWith('/' + curPath) || rPath === curPath)) {
                            parentReg = rItem;
                            break;
                        }
                    }
                }
                if (parentReg && parentReg.isDirectory && !parentReg.isExpanded) {
                    await this.toggleFolderNode(parentReg);
                }
            }
        }

        // 2. Find target element in DOM or registry
        let targetNode = null;
        if (normPath) {
            targetNode = document.querySelector(`.tree-node[data-path="${CSS.escape(normPath)}"]`);
        }

        // If not found by exact path, try suffix match (e.g. tree has npc/custom/... but path is custom/...)
        if (!targetNode && normPath) {
            for (const [rPath, rItem] of this.nodeRegistry.entries()) {
                if (!rItem.isDirectory && (rPath === normPath || rPath.endsWith('/' + normPath))) {
                    targetNode = rItem.nodeElem;
                    normPath = rPath;
                    this.activePath = rPath;
                    break;
                }
            }
            if (!targetNode) {
                const allFileNodes = document.querySelectorAll('.tree-node.tree-file');
                for (const el of allFileNodes) {
                    const p = el.dataset.path || "";
                    if (p === normPath || p.endsWith('/' + normPath)) {
                        targetNode = el;
                        normPath = p;
                        this.activePath = p;
                        break;
                    }
                }
            }
        }

        // If still not found, check if handle matches any registry file entry
        if (!targetNode && tabObj && tabObj.fileHandle) {
            for (const [rPath, rItem] of this.nodeRegistry.entries()) {
                if (!rItem.isDirectory && rItem.handle) {
                    try {
                        if (await rItem.handle.isSameEntry(tabObj.fileHandle)) {
                            targetNode = rItem.nodeElem;
                            normPath = rPath;
                            this.activePath = rPath;
                            break;
                        }
                    } catch (e) {}
                }
            }
        }

        // If still not found, match by filename among loaded items
        if (!targetNode && tabObj && tabObj.name) {
            const fileName = tabObj.name.toLowerCase();
            const candidates = [];
            for (const [rPath, rItem] of this.nodeRegistry.entries()) {
                if (!rItem.isDirectory) {
                    const leaf = rPath.split('/').pop().toLowerCase();
                    if (leaf === fileName) {
                        candidates.push(rItem);
                    }
                }
            }
            if (candidates.length === 1) {
                targetNode = candidates[0].nodeElem;
                normPath = candidates[0].path;
                this.activePath = normPath;
            } else if (candidates.length > 1 && normPath) {
                const best = candidates.find(c => normPath.includes(c.path) || c.path.includes(normPath));
                if (best) {
                    targetNode = best.nodeElem;
                    normPath = best.path;
                    this.activePath = normPath;
                }
            }
        }

        // 3. Highlight and Spy Scroll to target node
        if (targetNode) {
            targetNode.classList.add("active");

            // Ensure all parent folders in DOM are visibly open
            let parent = targetNode.parentElement;
            while (parent && parent.id !== "folderTreeContainer") {
                if (parent.classList.contains("tree-children")) {
                    parent.classList.add("expanded");
                    parent.style.display = "block";
                    const folderGroup = parent.parentElement;
                    if (folderGroup) {
                        const folderNode = folderGroup.querySelector(".tree-folder");
                        if (folderNode) {
                            if (folderNode.dataset.path) {
                                const parentReg = this.nodeRegistry.get(folderNode.dataset.path);
                                if (parentReg) {
                                    parentReg.isExpanded = true;
                                    parentReg.childrenLoaded = true;
                                }
                            }
                            const arrow = folderNode.querySelector(".tree-arrow");
                            const icon = folderNode.querySelector(".tree-icon");
                            if (arrow) {
                                arrow.textContent = "▼";
                                arrow.classList.add("expanded");
                            }
                            if (icon) icon.textContent = "📂";
                        }
                    }
                }
                parent = parent.parentElement;
            }

            // Spy Scroll: smoothly scroll folderTreeContainer to bring the active node into view (only when permitted)
            if (shouldScroll && !this.suppressTreeScroll) {
                const container = document.getElementById("folderTreeContainer");
                if (container) {
                    setTimeout(() => {
                        if (!shouldScroll || this.suppressTreeScroll) return;
                        const containerRect = container.getBoundingClientRect();
                        const nodeRect = targetNode.getBoundingClientRect();
                        
                        const isAbove = nodeRect.top < containerRect.top + 20;
                        const isBelow = nodeRect.bottom > containerRect.bottom - 20;
                        
                        if (isAbove || isBelow || shouldScroll) {
                            const currentScroll = container.scrollTop;
                            const targetScroll = Math.max(0, currentScroll + (nodeRect.top - containerRect.top) - (containerRect.height / 2) + (nodeRect.height / 2));

                            // Attach wheel and touch listeners once to gracefully stop animation on user input
                            if (!container._spyScrollWheelBound) {
                                container._spyScrollWheelBound = true;
                                container.addEventListener("wheel", () => {
                                    if (container._spyScrollAnim) {
                                        cancelAnimationFrame(container._spyScrollAnim);
                                        container._spyScrollAnim = null;
                                    }
                                }, { passive: true });
                                container.addEventListener("touchstart", () => {
                                    if (container._spyScrollAnim) {
                                        cancelAnimationFrame(container._spyScrollAnim);
                                        container._spyScrollAnim = null;
                                    }
                                }, { passive: true });
                            }

                            // Smooth scroll over 200ms for fast, responsive spy scrolling
                            if (container._spyScrollAnim) {
                                cancelAnimationFrame(container._spyScrollAnim);
                                container._spyScrollAnim = null;
                            }

                            const startTop = container.scrollTop;
                            const diff = targetScroll - startTop;
                            if (Math.abs(diff) < 2) {
                                container.scrollTop = targetScroll;
                                return;
                            }

                            const duration = 200; // 200ms duration
                            const startTime = performance.now();
                            const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

                            const step = (now) => {
                                const elapsed = now - startTime;
                                const progress = Math.min(elapsed / duration, 1);
                                container.scrollTop = startTop + (diff * easeOutCubic(progress));
                                if (progress < 1) {
                                    container._spyScrollAnim = requestAnimationFrame(step);
                                } else {
                                    container._spyScrollAnim = null;
                                }
                            };
                            container._spyScrollAnim = requestAnimationFrame(step);
                        }
                    }, 50);
                }
            }
        }
    }

    collapseAll() {
        this.nodeRegistry.forEach((regItem) => {
            if (regItem.isDirectory) {
                regItem.isExpanded = false;
                if (regItem.arrowElem) {
                    regItem.arrowElem.textContent = "▶";
                    regItem.arrowElem.classList.remove("expanded");
                }
                if (regItem.iconElem) regItem.iconElem.textContent = "📁";
                if (regItem.childrenElem) {
                    regItem.childrenElem.classList.remove("expanded");
                    regItem.childrenElem.style.display = "none";
                }
            }
        });
        document.querySelectorAll(".tree-children").forEach(el => {
            el.classList.remove("expanded");
            el.style.display = "none";
        });
        document.querySelectorAll(".tree-arrow:not(.empty)").forEach(el => {
            el.textContent = "▶";
            el.classList.remove("expanded");
        });
        document.querySelectorAll(".tree-folder .tree-icon").forEach(el => {
            el.textContent = "📁";
        });
    }

    async refresh(preserveExpanded = true, isAuto = false) {
        if (!this.rootHandle) return;
        
        if (!isAuto) {
            showSnackbar(`Refreshing "${this.rootName}"...`);
        }

        // Preserve all currently expanded folder paths
        const expandedPaths = new Set();
        if (preserveExpanded) {
            this.nodeRegistry.forEach((regItem, path) => {
                if (regItem.isDirectory && regItem.isExpanded) {
                    expandedPaths.add(path);
                }
            });
        }

        await this.loadRoot();

        // Re-expand previously open folders in order of hierarchy (shallowest first)
        if (preserveExpanded && expandedPaths.size > 0) {
            const sortedPaths = Array.from(expandedPaths).sort((a, b) => {
                const depthA = a.split("/").length;
                const depthB = b.split("/").length;
                return depthA - depthB;
            });

            for (const path of sortedPaths) {
                const regItem = this.nodeRegistry.get(path);
                if (regItem && regItem.isDirectory && !regItem.isExpanded) {
                    await this.toggleFolderNode(regItem);
                }
            }
        }

        // Re-apply active search filter if any
        if (this.filterText) {
            this.applyFilter(this.filterText);
        }

        // Re-highlight active file in tree with spy scroll
        await this.syncActiveTabWithTree();

        // Restore tree selection for remaining items
        if (this.selectedTreeItems && this.selectedTreeItems.length > 0) {
            this.selectedTreeItems = this.selectedTreeItems
                .map(it => this.nodeRegistry.get(it.path))
                .filter(Boolean);
            if (this.selectedTreeItem) {
                this.selectedTreeItem = this.nodeRegistry.get(this.selectedTreeItem.path) || (this.selectedTreeItems[0] || null);
            }
            this.updateTreeSelectionUI();
        }

        // Restore cut styling for items remaining in clipboard
        if (this.treeClipboard && this.treeClipboard.action === 'cut') {
            const cutItems = this.getClipboardItems();
            this.treeClipboard.items = cutItems
                .map(it => this.nodeRegistry.get(it.path))
                .filter(Boolean);
            this.treeClipboard.item = this.treeClipboard.items[0] || null;
            this.treeClipboard.items.forEach(it => {
                if (it && it.nodeElem) it.nodeElem.classList.add('tree-item-cut');
            });
        }
    }

    startWatcher() {
        this.stopWatcher();
        if (!this.rootHandle) return;

        // 1. Native FileSystemObserver (Chrome 129+)
        if (typeof window.FileSystemObserver !== "undefined") {
            try {
                let debounceTimeout = null;
                this.fsObserver = new window.FileSystemObserver((records) => {
                    if (!this.rootHandle) return;
                    clearTimeout(debounceTimeout);
                    debounceTimeout = setTimeout(() => {
                        this.checkForFolderChanges();
                    }, 200);
                });
                this.fsObserver.observe(this.rootHandle, { recursive: true });
            } catch (e) {
                this.fsObserver = null;
            }
        }

        // 2. Window focus & document visibilitychange listeners
        // (Detects when user returns from File Explorer, terminal, external editor, etc.)
        this.boundWindowFocus = () => {
            if (this.rootHandle) {
                this.checkForFolderChanges();
            }
        };
        window.addEventListener("focus", this.boundWindowFocus);
        document.addEventListener("visibilitychange", this.boundWindowFocus);

        // 3. Periodic lightweight background polling
        this.autoRefreshTimer = setInterval(() => {
            if (document.hasFocus() && this.rootHandle) {
                this.checkForFolderChanges();
            }
        }, 3000);
    }

    stopWatcher() {
        if (this.fsObserver) {
            try {
                this.fsObserver.disconnect();
            } catch (e) {}
            this.fsObserver = null;
        }
        if (this.autoRefreshTimer) {
            clearInterval(this.autoRefreshTimer);
            this.autoRefreshTimer = null;
        }
        if (this.boundWindowFocus) {
            window.removeEventListener("focus", this.boundWindowFocus);
            document.removeEventListener("visibilitychange", this.boundWindowFocus);
            this.boundWindowFocus = null;
        }
    }

    async checkForFolderChanges() {
        if (!this.rootHandle || this.isCheckingForChanges) return;
        this.isCheckingForChanges = true;
        try {
            let changeDetected = false;
            let detectedName = "";

            // Check root directory entries (ignoring hidden, temporary, and swap files)
            const isIgnoredName = (n) => {
                if (!n || typeof n !== "string") return true;
                return n.startsWith(".") ||
                    n.endsWith(".crswap") ||
                    n.includes(".crswap") ||
                    n.endsWith(".tmp") ||
                    n.endsWith("~") ||
                    n.startsWith("~") ||
                    n === "node_modules" ||
                    n === ".git";
            };

            const currentRootEntries = new Set();
            try {
                for await (const [name, entry] of this.rootHandle.entries()) {
                    if (isIgnoredName(name)) continue;
                    currentRootEntries.add(name);
                    const regItem = this.nodeRegistry.get(name);
                    if (!regItem) {
                        changeDetected = true;
                        detectedName = name;
                        break;
                    }
                }
            } catch (permErr) {
                return;
            }

            if (!changeDetected) {
                // Check if any root entry in nodeRegistry was deleted or moved
                for (const [path, regItem] of this.nodeRegistry.entries()) {
                    if (!path.includes("/")) {
                        if (!currentRootEntries.has(path)) {
                            changeDetected = true;
                            detectedName = path;
                            break;
                        }
                    }
                }
            }

            // Check all currently expanded directories
            if (!changeDetected) {
                for (const [folderPath, regItem] of this.nodeRegistry.entries()) {
                    if (regItem.isDirectory && regItem.isExpanded && regItem.handle) {
                        const currentDirEntries = new Set();
                        try {
                            for await (const [name, entry] of regItem.handle.entries()) {
                                if (isIgnoredName(name)) continue;
                                const childPath = `${folderPath}/${name}`;
                                currentDirEntries.add(childPath);
                                if (!this.nodeRegistry.has(childPath)) {
                                    changeDetected = true;
                                    detectedName = name;
                                    break;
                                }
                            }
                            if (changeDetected) break;

                            // Check if any known direct child in nodeRegistry was deleted
                            for (const [childPath, childReg] of this.nodeRegistry.entries()) {
                                if (childPath.startsWith(folderPath + "/") && childPath.indexOf("/", folderPath.length + 1) === -1) {
                                    if (!currentDirEntries.has(childPath)) {
                                        changeDetected = true;
                                        detectedName = childPath.split("/").pop();
                                        break;
                                    }
                                }
                            }
                            if (changeDetected) break;
                        } catch (dirErr) {
                            changeDetected = true;
                            detectedName = folderPath.split("/").pop();
                            break;
                        }
                    }
                }
            }

            if (changeDetected) {
                await this.refresh(true, true);
                this.indexWorkspaceFiles();

                // Check open tabs if their location moved in the workspace!
                if (typeof tabManager !== 'undefined') {
                    let anyTabMoved = false;
                    for (const tab of tabManager.tabs) {
                        if (tab.fileHandle && this.rootHandle) {
                            try {
                                const parts = await this.rootHandle.resolve(tab.fileHandle);
                                if (parts && parts.length > 0) {
                                    const resolvedPath = parts.join('/');
                                    if (tab.relativePath !== resolvedPath) {
                                        tab.relativePath = resolvedPath;
                                        tab.updateTitle();
                                        tab.saveToDB();
                                        anyTabMoved = true;
                                    }
                                    continue;
                                }
                            } catch (e) {}

                            // If resolve didn't find old handle (e.g. file moved outside on disk), check nodeRegistry
                            if (tab.relativePath && !this.nodeRegistry.has(tab.relativePath)) {
                                const possibleMatches = [];
                                for (const [p, reg] of this.nodeRegistry.entries()) {
                                    if (!reg.isDirectory && (p.endsWith('/' + tab.name) || p === tab.name)) {
                                        possibleMatches.push(reg);
                                    }
                                }
                                if (possibleMatches.length === 1) {
                                    const match = possibleMatches[0];
                                    tab.relativePath = match.path;
                                    tab.fileHandle = match.handle;
                                    tab.updateTitle();
                                    tab.saveToDB();
                                    anyTabMoved = true;
                                }
                            }
                        }
                    }
                    if (anyTabMoved) {
                        tabManager.renderTabs();
                        if (tabManager.activeTab) {
                            await this.highlightActiveInTree(tabManager.activeTab.relativePath, tabManager.activeTab, false);
                        }
                    }
                }

                if (detectedName) {
                    showSnackbar(`File change detected ("${detectedName}") — Folder tree updated.`);
                } else {
                    showSnackbar(`Folder tree updated.`);
                }
            } else {
                // Check for content/timestamp changes in all files in the tree (including unopened files like addtimer deltimer.txt)
                for (const [filePath, regItem] of this.nodeRegistry.entries()) {
                    if (!regItem.isDirectory && regItem.handle) {
                        try {
                            const fileObj = await regItem.handle.getFile();
                            const currentMod = fileObj.lastModified || 0;
                            const currentSize = fileObj.size || 0;

                            if (regItem.lastModified && (currentMod !== regItem.lastModified || currentSize !== regItem.lastSize)) {
                                regItem.lastModified = currentMod;
                                regItem.lastSize = currentSize;

                                const fileName = filePath.split("/").pop();

                                // Check if this file is open in any editor tab
                                let openTab = null;
                                if (typeof tabManager !== 'undefined') {
                                    for (const tab of tabManager.tabs) {
                                        if (tab.fileHandle && (tab.name === fileName || tab.relativePath === filePath)) {
                                            openTab = tab;
                                            break;
                                        }
                                    }
                                }

                                if (openTab) {
                                    // If open in tab, let tab sync cleanly (skip if saving or saved by this app recently)
                                    if (!openTab.isSaving && (Date.now() - (openTab.lastSavedAt || 0) > 6000)) {
                                        openTab.checkExternalChange(true);
                                    }
                                } else {
                                    // File is NOT open in any tab! Highlight in tree and notify via snackbar!
                                    if (Date.now() - (regItem.lastSavedAt || 0) > 6000) {
                                        this.markFileModifiedInTree(regItem, true);
                                        showSnackbar(`"${fileName}" in folder was modified externally.`);
                                    }
                                }
                            } else if (!regItem.lastModified) {
                                regItem.lastModified = currentMod;
                                regItem.lastSize = currentSize;
                            }
                        } catch (e) {}
                    }
                }
            }
        } catch (err) {
            console.warn("Folder check error:", err);
        } finally {
            this.isCheckingForChanges = false;
        }
    }

    closeFolderWorkspace() {
        this.stopWatcher();
        this.closeSearchDropdown();
        this.workspaceFiles = [];
        this.filterText = "";
        const searchInput = document.getElementById("sidebarSearchInput");
        if (searchInput) searchInput.value = "";
        const searchClear = document.getElementById("sidebarSearchClear");
        if (searchClear) searchClear.style.display = "none";

        this.rootHandle = null;
        this.rootName = "";
        if (typeof tabManager !== 'undefined') {
            tabManager.workspaceDirectoryHandle = null;
        }
        this.hideSidebar();
        const toggleItem = document.getElementById("menuItemToggleSidebar");
        const divider = document.getElementById("menuFolderDivider");
        if (toggleItem) toggleItem.style.display = "none";
        if (divider) divider.style.display = "none";
        this.removeWorkspaceFromDB();
        showSnackbar("Folder workspace closed.");
    }

    applyFilter(query) {
        // Instead of filtering or hiding nodes in the whole file tree, show search dropdown
        this.searchFiles(query);
    }

    async indexWorkspaceFiles() {
        if (!this.rootHandle) {
            this.workspaceFiles = [];
            return;
        }
        if (this.isIndexing) return;
        this.isIndexing = true;
        const allFiles = [];

        const traverse = async (dirHandle, currentPath) => {
            try {
                for await (const [name, entry] of dirHandle.entries()) {
                    if (name.startsWith(".") || name === "node_modules" || name === ".git" || name === "dist") continue;
                    const relPath = currentPath ? `${currentPath}/${name}` : name;
                    if (entry.kind === "directory") {
                        await traverse(entry, relPath);
                    } else if (entry.kind === "file") {
                        allFiles.push({
                            name: name,
                            relativePath: relPath,
                            handle: entry
                        });
                    }
                }
            } catch (err) {
                // Ignore inaccessible directories
            }
        };

        try {
            await traverse(this.rootHandle, "");
            this.workspaceFiles = allFiles;
            if (this.filterText) {
                this.searchFiles(this.filterText);
            }
        } catch (e) {
            console.warn("Error indexing workspace files:", e);
        } finally {
            this.isIndexing = false;
        }
    }

    getAllFiles() {
        if (this.workspaceFiles && this.workspaceFiles.length > 0) {
            return this.workspaceFiles;
        }
        const fallback = [];
        this.nodeRegistry.forEach((regItem) => {
            if (!regItem.isDirectory && regItem.handle) {
                fallback.push({
                    name: regItem.path.split("/").pop(),
                    relativePath: regItem.path,
                    handle: regItem.handle
                });
            }
        });
        return fallback;
    }

    searchFiles(query) {
        const dropdown = document.getElementById("sidebarSearchDropdown");
        if (!dropdown) return;

        const q = (query || "").trim();
        if (!q) {
            this.closeSearchDropdown();
            return;
        }

        const lowerQ = q.toLowerCase();
        const files = this.getAllFiles();

        if (!files || files.length === 0) {
            dropdown.innerHTML = `<div class="search-result-empty">No files in open folder</div>`;
            dropdown.style.display = "block";
            this.currentSearchResults = [];
            this.selectedSearchIndex = -1;
            return;
        }

        // Filter files matching query in name or relativePath
        const matches = files.filter(f => {
            return f.relativePath.toLowerCase().includes(lowerQ) || f.name.toLowerCase().includes(lowerQ);
        });

        // Sort: exact filename match, filename starts with, filename contains, path contains
        matches.sort((a, b) => {
            const aName = a.name.toLowerCase();
            const bName = b.name.toLowerCase();
            const aPath = a.relativePath.toLowerCase();
            const bPath = b.relativePath.toLowerCase();

            if (aName === lowerQ && bName !== lowerQ) return -1;
            if (bName === lowerQ && aName !== lowerQ) return 1;

            const aStarts = aName.startsWith(lowerQ);
            const bStarts = bName.startsWith(lowerQ);
            if (aStarts && !bStarts) return -1;
            if (bStarts && !aStarts) return 1;

            const aContains = aName.includes(lowerQ);
            const bContains = bName.includes(lowerQ);
            if (aContains && !bContains) return -1;
            if (bContains && !aContains) return 1;

            return aPath.localeCompare(bPath);
        });

        if (matches.length === 0) {
            dropdown.innerHTML = `<div class="search-result-empty">No files found matching "<b>${this.escapeHtml(q)}</b>"</div>`;
            dropdown.style.display = "block";
            this.currentSearchResults = [];
            this.selectedSearchIndex = -1;
            return;
        }

        this.currentSearchResults = matches;
        this.selectedSearchIndex = -1;

        dropdown.innerHTML = "";

        const header = document.createElement("div");
        header.className = "sidebar-search-dropdown-header";
        header.innerHTML = `<span>Matches (${matches.length})</span><span>ESC to close</span>`;
        dropdown.appendChild(header);

        const listContainer = document.createElement("div");
        listContainer.className = "sidebar-search-results-list";

        // Limit results to top 60 items for performance
        const displayMatches = matches.slice(0, 60);

        displayMatches.forEach((item, idx) => {
            const itemElem = document.createElement("div");
            itemElem.className = "search-result-item";
            itemElem.dataset.index = idx;

            const iconElem = document.createElement("span");
            iconElem.className = "search-result-icon";
            iconElem.innerHTML = this.getFileIcon(item.name);

            const contentElem = document.createElement("div");
            contentElem.className = "search-result-content";

            const pathElem = document.createElement("div");
            pathElem.className = "search-result-path";
            pathElem.title = item.relativePath;
            pathElem.innerHTML = this.highlightMatch(item.relativePath, q);

            contentElem.appendChild(pathElem);
            itemElem.appendChild(iconElem);
            itemElem.appendChild(contentElem);

            itemElem.onclick = async (e) => {
                e.stopPropagation();
                await this.openFileFromSearch(item);
            };

            listContainer.appendChild(itemElem);
        });

        dropdown.appendChild(listContainer);
        dropdown.style.display = "flex";
    }

    moveSearchSelection(delta) {
        const dropdown = document.getElementById("sidebarSearchDropdown");
        if (!dropdown || dropdown.style.display === "none") return;
        const items = dropdown.querySelectorAll(".search-result-item");
        if (items.length === 0) return;

        items.forEach(el => el.classList.remove("selected"));

        this.selectedSearchIndex += delta;
        if (this.selectedSearchIndex < 0) {
            this.selectedSearchIndex = items.length - 1;
        } else if (this.selectedSearchIndex >= items.length) {
            this.selectedSearchIndex = 0;
        }

        const selectedEl = items[this.selectedSearchIndex];
        if (selectedEl) {
            selectedEl.classList.add("selected");
            selectedEl.scrollIntoView({ block: "nearest", behavior: "smooth" });
        }
    }

    closeSearchDropdown() {
        const dropdown = document.getElementById("sidebarSearchDropdown");
        if (dropdown) dropdown.style.display = "none";
        this.selectedSearchIndex = -1;
    }

    async openFileFromSearch(fileItem) {
        if (!fileItem || this.isOpeningFile) return;
        this.isOpeningFile = true;

        this.closeSearchDropdown();
        this.suppressTreeScroll = false;

        const searchInput = document.getElementById("sidebarSearchInput");
        const searchClear = document.getElementById("sidebarSearchClear");
        if (searchInput) {
            searchInput.value = "";
            searchInput.blur();
        }
        if (searchClear) searchClear.style.display = "none";
        this.filterText = "";
        this.currentSearchResults = [];
        this.selectedSearchIndex = -1;

        if (typeof tabManager === 'undefined') {
            this.isOpeningFile = false;
            return;
        }

        try {
            // Check if file is already open in an existing tab
            let existingTab = null;
            for (const tab of tabManager.tabs) {
                if (tab.fileHandle && fileItem.handle) {
                    try {
                        if (await tab.fileHandle.isSameEntry(fileItem.handle)) {
                            existingTab = tab;
                            break;
                        }
                    } catch (e) {}
                }
                if (!existingTab && tab.relativePath && tab.relativePath === fileItem.relativePath) {
                    existingTab = tab;
                    break;
                }
                if (!existingTab && tab.name && tab.name === fileItem.name && tab.relativePath === fileItem.relativePath) {
                    existingTab = tab;
                    break;
                }
            }

            if (existingTab) {
                tabManager.switchTab(existingTab.id);
                await this.highlightActiveInTree(fileItem.relativePath, existingTab, true);
                return;
            }

            const file = await fileItem.handle.getFile();
            const fileData = await readFileWithEncoding(file);
            const contents = fileData.text;

            // Double check existing tab in case of race condition during async read
            for (const tab of tabManager.tabs) {
                if (tab.relativePath && tab.relativePath === fileItem.relativePath) {
                    tabManager.switchTab(tab.id);
                    await this.highlightActiveInTree(fileItem.relativePath, tab, true);
                    return;
                }
            }

            let targetTab;
            const active = tabManager.activeTab;
            if (active && !active.fileHandle && active.name === "Untitled" && !active.isDirty() && active.editor.getValue().trim() === "") {
                targetTab = active;
            } else {
                targetTab = tabManager.addTab();
            }

            targetTab.fileHandle = fileItem.handle;
            targetTab.relativePath = fileItem.relativePath;
            targetTab.name = file.name;
            targetTab.encoding = fileData.encoding;
            targetTab.lastModified = file.lastModified || Date.now();
            targetTab.codeHistory = [];
            targetTab.currentHistoryIndex = -1;

            targetTab.editor.setValue(contents, -1);
            targetTab.editor.session.setUndoManager(new ace.UndoManager());
            targetTab.editor.scrollToLine(1, true, true);
            targetTab.editor.gotoLine(1, 0, false);
            targetTab.updateEditorMode();
            targetTab.saveCurrentCodeToHistory();
            targetTab.lastSavedCode = contents;

            tabManager.renderTabs();
            tabManager.switchTab(targetTab.id);
            updateStatusBarEncoding(targetTab);
            targetTab.saveToDB();

            // Expand all ancestors in folder tree, highlight with .active, and spy-scroll to center it in view
            await this.highlightActiveInTree(fileItem.relativePath, targetTab, true);
        } catch (err) {
            console.error("Failed to open file from search:", err);
            showSnackbar(`Failed to open "${fileItem.relativePath}".`);
        } finally {
            this.isOpeningFile = false;
        }
    }

    highlightMatch(text, query) {
        if (!query) return this.escapeHtml(text);
        const lowerText = text.toLowerCase();
        const lowerQuery = query.toLowerCase();
        let result = "";
        let startIndex = 0;
        let index = lowerText.indexOf(lowerQuery, startIndex);

        while (index !== -1) {
            result += this.escapeHtml(text.substring(startIndex, index));
            result += `<span class="match-highlight">${this.escapeHtml(text.substring(index, index + lowerQuery.length))}</span>`;
            startIndex = index + lowerQuery.length;
            index = lowerText.indexOf(lowerQuery, startIndex);
        }
        result += this.escapeHtml(text.substring(startIndex));
        return result;
    }

    escapeHtml(str) {
        if (!str) return "";
        return String(str).replace(/[&<>"']/g, (m) => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        }[m]));
    }

    saveSidebarWidth(width) {
        if (!width || isNaN(width) || width < 180) return;
        const roundedWidth = Math.round(width);
        this.savedSidebarWidth = roundedWidth;
        try {
            localStorage.setItem("sidebarWidth", roundedWidth.toString());
        } catch (e) {}

        if (tabDB) {
            tabDB.open().then((db) => {
                try {
                    const tx = db.transaction([STORE_META], "readwrite");
                    const metaStore = tx.objectStore(STORE_META);
                    metaStore.put({ key: "sidebarWidth", value: roundedWidth });
                } catch (e) {}
            }).catch(() => {});
        }
    }

    initResizer() {
        const resizer = document.getElementById("sidebarResizer");
        const sidebar = document.getElementById("sidebarArea");
        const inner = document.getElementById("sidebarInner");
        if (!resizer || !sidebar) return;

        let startX = 0;
        let startWidth = 0;

        const updateWidth = (clientX) => {
            const maxAllowedWidth = Math.min(800, Math.floor(window.innerWidth * 0.75));
            const newWidth = Math.max(180, Math.min(maxAllowedWidth, startWidth + (clientX - startX)));
            sidebar.style.width = `${newWidth}px`;
            if (inner) inner.style.width = "100%";
            this.savedSidebarWidth = newWidth;
            if (typeof tabManager !== 'undefined' && tabManager.activeTab && tabManager.activeTab.editor) {
                tabManager.activeTab.editor.resize();
                if (tabManager.activeTab.minimap) {
                    tabManager.activeTab.minimap.update(false);
                }
            }
        };

        const onMouseMove = (e) => {
            if (!this.isResizing) return;
            updateWidth(e.clientX);
        };

        const onMouseUp = () => {
            if (!this.isResizing) return;
            this.isResizing = false;
            sidebar.classList.remove("resizing-active");
            resizer.classList.remove("resizing");
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);

            this.saveSidebarWidth(this.savedSidebarWidth);
            if (typeof tabManager !== 'undefined' && tabManager.activeTab) {
                if (tabManager.activeTab.editor) tabManager.activeTab.editor.resize();
                if (tabManager.activeTab.minimap) tabManager.activeTab.minimap.update(true);
            }
        };

        resizer.addEventListener("mousedown", (e) => {
            if (e.button !== 0) return;
            this.isResizing = true;
            startX = e.clientX;
            startWidth = sidebar.getBoundingClientRect().width;
            sidebar.classList.add("resizing-active");
            resizer.classList.add("resizing");
            document.addEventListener("mousemove", onMouseMove);
            document.addEventListener("mouseup", onMouseUp);
        });

        // Touch support for resizing
        const onTouchMove = (e) => {
            if (!this.isResizing || !e.touches || e.touches.length !== 1) return;
            updateWidth(e.touches[0].clientX);
        };

        const onTouchEnd = () => {
            if (!this.isResizing) return;
            this.isResizing = false;
            sidebar.classList.remove("resizing-active");
            resizer.classList.remove("resizing");
            document.removeEventListener("touchmove", onTouchMove);
            document.removeEventListener("touchend", onTouchEnd);
            document.removeEventListener("touchcancel", onTouchEnd);

            this.saveSidebarWidth(this.savedSidebarWidth);
            if (typeof tabManager !== 'undefined' && tabManager.activeTab) {
                if (tabManager.activeTab.editor) tabManager.activeTab.editor.resize();
                if (tabManager.activeTab.minimap) tabManager.activeTab.minimap.update(true);
            }
        };

        resizer.addEventListener("touchstart", (e) => {
            if (!e.touches || e.touches.length !== 1) return;
            this.isResizing = true;
            startX = e.touches[0].clientX;
            startWidth = sidebar.getBoundingClientRect().width;
            sidebar.classList.add("resizing-active");
            resizer.classList.add("resizing");
            document.addEventListener("touchmove", onTouchMove, { passive: true });
            document.addEventListener("touchend", onTouchEnd);
            document.addEventListener("touchcancel", onTouchEnd);
        }, { passive: true });
    }

    async saveWorkspaceToDB(dirHandle) {
        if (!tabDB || !tabDB.db) return;
        try {
            const tx = tabDB.db.transaction([STORE_META], "readwrite");
            const metaStore = tx.objectStore(STORE_META);
            metaStore.put({ key: "workspaceDirectoryHandle", value: dirHandle });
            metaStore.put({ key: "workspaceDirectoryName", value: dirHandle.name });
        } catch (e) {}
    }

    async removeWorkspaceFromDB() {
        if (!tabDB || !tabDB.db) return;
        try {
            const tx = tabDB.db.transaction([STORE_META], "readwrite");
            const metaStore = tx.objectStore(STORE_META);
            metaStore.delete("workspaceDirectoryHandle");
            metaStore.delete("workspaceDirectoryName");
        } catch (e) {}
    }

    async restoreWorkspaceFromDB() {
        try {
            const db = await tabDB.open();
            const tx = db.transaction([STORE_META], "readonly");
            const metaStore = tx.objectStore(STORE_META);

            // Restore persistent sidebar width from IndexedDB if saved
            const widthReq = metaStore.get("sidebarWidth");
            widthReq.onsuccess = () => {
                if (widthReq.result && typeof widthReq.result.value === 'number') {
                    const dbWidth = widthReq.result.value;
                    if (dbWidth >= 180) {
                        this.savedSidebarWidth = dbWidth;
                        try { localStorage.setItem("sidebarWidth", dbWidth.toString()); } catch (e) {}
                        const sidebar = document.getElementById("sidebarArea");
                        if (sidebar && !sidebar.classList.contains("sidebar-hidden")) {
                            sidebar.style.width = `${dbWidth}px`;
                            if (typeof tabManager !== 'undefined' && tabManager.activeTab && tabManager.activeTab.editor) {
                                tabManager.activeTab.editor.resize();
                            }
                        }
                    }
                }
            };

            const req = metaStore.get("workspaceDirectoryHandle");
            req.onsuccess = async () => {
                const item = req.result;
                if (item && item.value) {
                    const handle = item.value;
                    try {
                        const perm = await handle.queryPermission({ mode: "read" });
                        if (perm === "granted") {
                            this.rootHandle = handle;
                            this.rootName = handle.name;
                            if (typeof tabManager !== 'undefined') {
                                tabManager.workspaceDirectoryHandle = handle;
                            }
                            this.showSidebar();
                            const folderNameElem = document.getElementById("sidebarFolderName");
                            if (folderNameElem) {
                                folderNameElem.textContent = handle.name;
                                folderNameElem.title = handle.name;
                            }
                            const toggleItem = document.getElementById("menuItemToggleSidebar");
                            const divider = document.getElementById("menuFolderDivider");
                            if (toggleItem) toggleItem.style.display = "flex";
                            if (divider) divider.style.display = "block";
                            await this.loadRoot();
                            this.startWatcher();
                            await this.syncActiveTabWithTree();
                        }
                    } catch (e) {}
                }
            };
        } catch (e) {}
    }
}

// Global instance
const folderTreeManager = new FolderTreeManager();

// Automatically initialize folder tree manager once DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => folderTreeManager.init());
} else {
    folderTreeManager.init();
}


