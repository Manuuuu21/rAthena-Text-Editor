let currentTheme = "ace/theme/monokai";

function toggleTheme() {
  const root = document.documentElement;
  const isLight = currentTheme === "ace/theme/github_light_default";

  currentTheme = isLight ? "ace/theme/monokai" : "ace/theme/github_light_default";
  
    if (isLight) {
    // Switching to DARK
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
    root.style.setProperty('--diffRemovedBg', '#4a1e1e');
    root.style.setProperty('--diffRemovedColor', '#e6a3a3');
    root.style.setProperty('--scrollbarTrack', '#252525');
    root.style.setProperty('--scrollbarThumb', '#666');
    root.style.setProperty('--scrollbarThumbHover', '#555');
    root.style.setProperty('--btnBg', '#444');
    root.style.setProperty('--btnText', '#fff');
    root.style.setProperty('--closeBtnColor', '#bbb');
  } else {
    // Switching to LIGHT
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
    root.style.setProperty('--diffAddedBg', '#d4edda');
    root.style.setProperty('--diffAddedColor', '#155724');
    root.style.setProperty('--diffRemovedBg', '#f8d7da');
    root.style.setProperty('--diffRemovedColor', '#721c24');
    root.style.setProperty('--scrollbarTrack', '#f1f1f1');
    root.style.setProperty('--scrollbarThumb', '#888');
    root.style.setProperty('--scrollbarThumbHover', '#555');
  }
  
  tabManager.tabs.forEach(tab => {
    if (tab.editor) tab.editor.setTheme(currentTheme);
  });
  if (diffOldEditor) diffOldEditor.setTheme(currentTheme);
  if (diffNewEditor) diffNewEditor.setTheme(currentTheme);
}

/* Diff Modal handling */
function closeDiffModal() {
    document.getElementById('diffModal').style.display = 'none';
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
    
    diffOldEditor.setValue(oldCode, -1);
    diffNewEditor.setValue(newCode, -1);
    
    const oldSession = diffOldEditor.getSession();
    const newSession = diffNewEditor.getSession();
    
    const oldMarkers = oldSession.getMarkers();
    for (let m in oldMarkers) {
      if (oldMarkers[m].clazz === 'ace_removed') oldSession.removeMarker(oldMarkers[m].id);
    }
    const newMarkers = newSession.getMarkers();
    for (let m in newMarkers) {
      if (newMarkers[m].clazz === 'ace_added') newSession.removeMarker(newMarkers[m].id);
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

    diff.forEach(part => {
        if (part.added) {
            if (firstAddedLine === -1) firstAddedLine = newLine;
            const range = new Range(newLine, 0, newLine + part.count - 1, Infinity);
            newSession.addMarker(range, "ace_added", "fullLine");
            newLine += part.count;
        } else if (part.removed) {
            if (firstRemovedLine === -1) firstRemovedLine = oldLine;
            const range = new Range(oldLine, 0, oldLine + part.count - 1, Infinity);
            oldSession.addMarker(range, "ace_removed", "fullLine");
            oldLine += part.count;
        } else {
            oldLine += part.count;
            newLine += part.count;
        }
    });

    document.getElementById('diffModal').style.display = 'flex';
    
    setTimeout(() => {
        diffOldEditor.resize();
        diffNewEditor.resize();
        if (firstAddedLine !== -1) diffNewEditor.scrollToLine(firstAddedLine, true, true, function () {});
        if (firstRemovedLine !== -1) diffOldEditor.scrollToLine(firstRemovedLine, true, true, function () {});
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

window.onclick = function(event) {
  if (event.target.id == 'modalOverlay') closeModal();
  if (event.target.id == 'clearChatModal') closeClearChatModal();
}

let documentationTooltipEnabled = localStorage.getItem("documentationTooltipEnabled") === "true";

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

function toggleDisplayChatBotContainer() {
  const activeTab = tabManager.activeTab;
  if (!activeTab) return;

  const chatBot = activeTab.elements.chatBotContainer;
  const editorElem = activeTab.elements.editor;

  if (window.getComputedStyle(chatBot).display === 'none') {
    chatBot.style.display = 'flex';
    editorElem.style.flex = '1 1 70%';
    editorElem.style.width = '70%';
    // Scroll to bottom after displaying
    setTimeout(() => {
        const messages = activeTab.elements.chatMessages;
        messages.scrollTop = messages.scrollHeight;
    }, 100);
  } else {
    chatBot.style.display = 'none';
    editorElem.style.flex = '1 1 100%';
    editorElem.style.width = '100%';
  }
}

function showSnackbar(message) {
    const activeTab = tabManager.activeTab;
    if (!activeTab) return;
    
    let snackbar = activeTab.elements.editor.querySelector(".snackbar");
    if (!snackbar) {
        snackbar = document.createElement("div");
        snackbar.className = "snackbar";
        snackbar.id = "snackbar";
        activeTab.elements.editor.appendChild(snackbar);
    }
    
    snackbar.textContent = message;
    snackbar.classList.add("show");

    if (activeTab.snackbarTimeout) clearTimeout(activeTab.snackbarTimeout);
    activeTab.snackbarTimeout = setTimeout(() => {
        snackbar.classList.remove("show");
    }, 3000);
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
        this.lastSavedCode = "";
        this.timerCounterForGlobal = 0;
        this.chatSessionNum = 0;
        this.typeWriterStatusForChatDone = true;
        this.snackbarTimeout = null;

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
            <div id="editor-${this.id}" class="editor-instance"></div>
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
        this.elements.editor = content.querySelector(`#editor-${this.id}`);
        this.elements.chatBotContainer = content.querySelector(`#chatBotContainer-${this.id}`);
        this.elements.chatMessages = content.querySelector(`#chat-messages-${this.id}`);
        this.elements.chatInput = content.querySelector(`#chat-input-${this.id}`);
        this.elements.sendButton = content.querySelector(`#send-button-${this.id}`);
        this.elements.loadingIndicator = content.querySelector(`#loading-indicator-${this.id}`);
        this.elements.clearChatBtn = content.querySelector(`#clear-chat-${this.id}`);
        this.elements.modelSelect = content.querySelector(`#model-select-${this.id}`);
    }

    initEditor() {
        this.editor = ace.edit(this.elements.editor.id);
        this.editor.setTheme(currentTheme);
        this.editor.session.setMode("ace/mode/rathena");
        this.editor.setOptions({
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            fontSize: "14px",
        });

        new TokenTooltip(this.editor);

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
                runRathenaLinter(this.editor);
            }
            this.updateTabIcon();
        });

        this.editor.getSelection().on("changeSelection", () => {
             tabManager.latestSelectedText = this.editor.getSelectedText();
        });

        // Restore CTRL+S functionality
        this.editor.commands.addCommand({
            name: 'saveToFileSystem',
            bindKey: {win: 'Ctrl-S',  mac: 'Command-S'},
            exec: (editor) => {
                this.saveToFile();
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
            if (files.length !== 1) {
                alert("Only one file is allowed to be dropped.");
                return;
            }
            const file = files[0];

            const contents = await file.text();
            this.recordChange(this.editor.getValue(), contents);
            this.editor.setValue(contents, -1);
            this.saveCurrentCodeToHistory();
            this.lastSavedCode = contents;
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
        this.elements.clearChatBtn.addEventListener('click', () => openClearChatModal());
        
        // Initial AI logic connection
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
        this.updateHistoryButtons();
        document.title = `${this.name} - rAthena Text Editor`;
        // Use timeout to prevent scroll-to-focus issues during tab transition
        setTimeout(() => {
          if (this.elements.chatInput) {
            this.elements.chatInput.focus({ preventScroll: true });
          }
        }, 50);
    }

    deactivate() {
        this.elements.content.classList.remove("active");
    }

    isDirty() {
        return this.editor.getValue() !== this.lastSavedCode;
    }

    updateTabIcon() {
        const dirty = this.isDirty();
        const btn = document.querySelector(`.tab-button[data-id="${this.id}"]`);
        if (!btn) return;
        const closeIcon = btn.querySelector('.tab-close');
        if (!closeIcon) return;
        
        closeIcon.textContent = dirty ? '●' : '×';
        closeIcon.classList.toggle('dirty', dirty);
    }

    // Methods ported from init.js
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
    }

    nextCode() {
        if (this.currentHistoryIndex >= this.codeHistory.length - 1) return;
        this.currentHistoryIndex++;
        this.editor.setValue(this.codeHistory[this.currentHistoryIndex], -1);
        this.editor.session.setUndoManager(new ace.UndoManager());
        this.updateHistoryButtons();
    }

    async openFile() {
        try {
            const [handle] = await window.showOpenFilePicker({
                types: [{ description: "Text Files", accept: { "text/plain": [".txt"] } }],
                startIn: tabManager.lastDirectoryHandle || "documents"
            });

            // If it's a different file, clear the chat
            const isSame = this.fileHandle && await this.fileHandle.isSameEntry(handle);
            if (!isSame) {
                this.clearChat(false);
            }

            this.fileHandle = handle;
            tabManager.lastDirectoryHandle = handle;
            const file = await handle.getFile();
            const contents = await file.text();
            this.editor.setValue(contents, -1);
            this.name = file.name;
            this.saveCurrentCodeToHistory();
            this.lastSavedCode = contents;
            tabManager.renderTabs();
            this.activate();
        } catch (err) {
            console.error("Open failed:", err);
        }
    }

    async saveToFile() {
        const currentCode = this.editor.getValue();
        const saveDate = new Date();
        try {
            if (!this.fileHandle) {
                this.fileHandle = await window.showSaveFilePicker({
                    suggestedName: this.name.endsWith(".txt") ? this.name : this.name + ".txt",
                    types: [{ description: "Text Files", accept: { "text/plain": [".txt"] } }]
                });
                this.name = this.fileHandle.name;
                tabManager.renderTabs();
                this.activate();
            }
            const writable = await this.fileHandle.createWritable();
            await writable.write(currentCode);
            await writable.close();
            showSnackbar("Saved successfully.");
            this.saveCurrentCodeToHistory();

            const diffIndex = this.recordChange(this.lastSavedCode, currentCode, saveDate);
            if (this.lastSavedCode !== currentCode) {
                this.lastSavedCode = currentCode;
            }
            this.updateTabIcon();

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
        } catch (err) {
            console.error("Save failed:", err);
        }
    }

    downloadEditorContent() {
        const content = this.editor.getValue();
        const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = this.name.endsWith(".txt") ? this.name : this.name + ".txt";
        a.click();
        URL.revokeObjectURL(url);
    }

    clearChat(showSnack = true) {
        this.elements.chatMessages.innerHTML = '';
        this.chatHistory = [
            {
                role: "user",
                parts: [
                    { text: `This is your **DOCUMENTATION** that you must follow to provide accurate data to user question: `+ standard_rAthena_script + `.\n\n` },
                    { text: `Strictly follow this **INSTRUCTIONS** all the times: `+ instructionPromt2 + `.\n\n` }
                ]
            }
        ];
        if (showSnack) showSnackbar("Chat cleared.");
    }

    async sendMessage() {
        const userMessage = this.elements.chatInput.value.trim();
        if (!userMessage || !this.typeWriterStatusForChatDone || this.chatSessionNum > 0) return;

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

        const userInstructionalPrompt = `This is the code inside the editor as your context if the user ask: \`\`\`${editorContent}\`\`\`. Just Ignore if the Code inside the editor has no code or value.`.trim();

        this.chatHistory.push({
            role: "user",
            parts: [
                { text: userInstructionalPrompt + `.\n\n` },
                { text: `This is user input/question: ` + userMessage + `. do not repeat the user instructions.` }
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
                combined += `<p class="ai_thought_textDesign">🤖 Thought in ${this.timerCounterForGlobal} seconds</p><div class="ai_thinking"><thinking>${thinking}</thinking></div><p style="color:gray;font-size:10px;">Done</p>`;
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
            let rawContent = currentContent.join('\n').trim();
            // Escape HTML characters before adding our own tags
            rawContent = rawContent
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");

            const content = rawContent.split('\n').map(line => {
                const leadingSpaces = line.match(/^\s+/);
                if (leadingSpaces) {
                    const indent = leadingSpaces[0].length * 6; // roughly 6px per space
                    return `<div style="padding-left: ${indent}px; font-family: 'JetBrains Mono', 'Courier New', monospace; font-size: 11px; opacity: 0.9; margin: 2px 0;">${line.trim()}</div>`;
                }
                return `<div style="margin: 4px 0;">${line}</div>`;
            }).join('');
            
            let formattedSignature = currentSignature
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;");
            
            formattedSignature = formattedSignature.replace(new RegExp("^\\*" + currentCmd, "i"), "<strong>*"+currentCmd+"</strong>");

            if (rathenaDocMap[currentCmd]) {
                // Append signature and content if it's a variation
                rathenaDocMap[currentCmd].signature += "<br/>" + formattedSignature;
                // Add a divider if content is different
                if (rathenaDocMap[currentCmd].description.indexOf(content.substring(0, 50)) === -1) {
                    rathenaDocMap[currentCmd].description += "<br/><hr style='border:0; border-top:1px dashed var(--tooltipDivider); margin:8px 0;'/><br/>" + content;
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

class TokenTooltip {
    constructor(editor) {
        if (editor.tokenTooltip) return;
        editor.tokenTooltip = this;
        this.editor = editor;
        
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
        
        editor.on("mousemove", this.onMouseMove);
        editor.on("mouseout", this.onMouseOut);
    }

    onMouseMove(e) {
        if (!documentationTooltipEnabled) {
            this.tooltip.hide();
            return;
        }
        const editor = this.editor;
        const element = this.tooltip.getElement ? this.tooltip.getElement() : this.tooltip.element;

        // If mouse is already over the tooltip, don't hide it or update position
        if (element && element.contains(e.domEvent.target)) {
            return;
        }

        const pos = e.getDocumentPosition();
        const token = editor.session.getTokenAt(pos.row, pos.column);
        
        if (token && (token.type.indexOf("support.function") !== -1 || 
                      token.type.indexOf("keyword") !== -1 || 
                      token.type.indexOf("identifier") !== -1 || 
                      token.type.indexOf("constant") !== -1 ||
                      token.type.indexOf("variable") !== -1)) {
            const docData = rathenaDocMap[token.value];
            if (docData) {
                // If already showing this doc, don't re-show to avoid scroll reset
                if (this.currentToken === token.value) return;
                
                this.currentToken = token.value;
                
                const html = `
                    <div style="border-bottom: 1px solid var(--tooltipDivider); padding-bottom: 5px; margin-bottom: 8px; color: var(--tooltipHeaderColor); font-size: 13px;">
                        ${docData.signature}
                    </div>
                    <div style="line-height: 1.4;">
                        ${docData.description.replace(/\n/g, '<br/>')}
                    </div>
                `;
                
                this.tooltip.show("", e.clientX, e.clientY);
                const element = this.tooltip.getElement ? this.tooltip.getElement() : this.tooltip.element;
                if (element) {
                    element.innerHTML = html;
                    element.scrollTop = 0; // Ensure scroll always starts at the top
                    element.style.display = "block";
                    const rect = element.getBoundingClientRect();
                    
                    // Reduced offset (5px) to make it easier to reach from the mouse
                    let x = e.clientX + 5;
                    let y = e.clientY + 5;

                    // Bound checks
                    if (x + rect.width > window.innerWidth) {
                        x = e.clientX - rect.width - 5;
                    }
                    if (y + rect.height > window.innerHeight) {
                        y = e.clientY - rect.height - 5;
                    }
                    
                    if (x < 0) x = 5;
                    if (y < 0) y = 5;

                    element.style.left = x + "px";
                    element.style.top = y + "px";

                    if (!element._hasWheelEvent) {
                        element.addEventListener('wheel', (evt) => {
                            evt.stopPropagation();
                        }, { passive: false });
                        element._hasWheelEvent = true;
                    }
                }
                return;
            }
        }

        // If we have a tooltip active, check if mouse is moving towards it
        if (element && this.currentToken) {
            const rect = element.getBoundingClientRect();
            // A small 10px buffer around the tooltip to allow the mouse to reach it
            const buffer = 10;
            if (e.clientX >= rect.left - buffer && e.clientX <= rect.right + buffer &&
                e.clientY >= rect.top - buffer && e.clientY <= rect.bottom + buffer) {
                return;
            }
        }

        this.currentToken = null;
        this.tooltip.hide();
    }

    onMouseOut(e) {
        const element = this.tooltip.getElement ? this.tooltip.getElement() : this.tooltip.element;
        if (element && e && e.domEvent && element.contains(e.domEvent.relatedTarget)) {
            return;
        }
        this.currentToken = null;
        this.tooltip.hide();
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
        root.style.setProperty('--diffAddedBg', '#d4edda');
        root.style.setProperty('--diffAddedColor', '#155724');
        root.style.setProperty('--diffRemovedBg', '#f8d7da');
        root.style.setProperty('--diffRemovedColor', '#721c24');
        root.style.setProperty('--scrollbarTrack', '#f1f1f1');
        root.style.setProperty('--scrollbarThumb', '#888');
        root.style.setProperty('--scrollbarThumbHover', '#555');
        root.style.setProperty('--btnBg', '#e9ecef');
        root.style.setProperty('--btnText', '#333');
        root.style.setProperty('--closeBtnColor', '#777');
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
        root.style.setProperty('--diffRemovedBg', '#4a1e1e');
        root.style.setProperty('--diffRemovedColor', '#e6a3a3');
        root.style.setProperty('--scrollbarTrack', '#252525');
        root.style.setProperty('--scrollbarThumb', '#666');
        root.style.setProperty('--scrollbarThumbHover', '#555');
        root.style.setProperty('--btnBg', '#444');
        root.style.setProperty('--btnText', '#fff');
        root.style.setProperty('--closeBtnColor', '#bbb');
    }
}
parseRathenaDocs();


const tabManager = {
    tabs: [],
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

        this.renderTabs();
    },

    closeTab(id, e) {
        if (e) e.stopPropagation();
        const index = this.tabs.findIndex(t => t.id === id);
        if (index === -1) return;
        
        const [tab] = this.tabs.splice(index, 1);
        tab.elements.content.remove();
        
        if (this.tabs.length === 0) {
            this.addTab();
        } else if (this.activeTab && this.activeTab.id === id) {
            this.switchTab(this.tabs[Math.max(0, index - 1)].id);
        } else {
            this.renderTabs();
        }
    },

    renderTabs() {
        const container = document.getElementById("tabsContainer");
        const existingButtons = Array.from(container.querySelectorAll('.tab-button'));
        
        // Remove surplus buttons or clear if count mismatch (simple approach for now)
        if (existingButtons.length !== this.tabs.length) {
            container.innerHTML = "";
            this.tabs.forEach((tab, index) => {
                const btn = this.createTabButton(tab, index);
                container.appendChild(btn);
            });
            return;
        }

        // Update existing buttons
        this.tabs.forEach((tab, index) => {
            const btn = existingButtons.find(b => b.dataset.id === String(tab.id));
            if (btn) {
                btn.className = `tab-button ${this.activeTab && this.activeTab.id === tab.id ? 'active' : ''}`;
                if (tabManager.draggedTabIndex === index) btn.classList.add("dragging");
                
                // Update text if changed
                const label = btn.querySelector("span");
                if (label.textContent !== tab.name) label.textContent = tab.name;
                
                // Update close icon
                const closeIcon = btn.querySelector(".tab-close");
                const isDirty = tab.isDirty();
                closeIcon.textContent = isDirty ? '●' : '×';
                closeIcon.classList.toggle('dirty', isDirty);
                
                // Update specific index for data transfer
                btn.dataset.index = index;
                
                // Move to correct position in DOM if necessary
                if (container.children[index] !== btn) {
                    container.insertBefore(btn, container.children[index]);
                }
            } else {
                // If button doesn't exist for some reason, re-render all
                container.innerHTML = "";
                this.tabs.forEach((t, i) => container.appendChild(this.createTabButton(t, i)));
            }
        });
    },

    createTabButton(tab, index) {
        const btn = document.createElement("div");
        btn.className = `tab-button ${this.activeTab && this.activeTab.id === tab.id ? 'active' : ''}`;
        btn.setAttribute("draggable", "true");
        btn.dataset.id = tab.id;
        btn.dataset.index = index;
        
        const isDirty = tab.isDirty();
        btn.innerHTML = `<span>${tab.name}</span><span class="tab-close">${isDirty ? '●' : '×'}</span>`;
        
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
            const fromIndex = tabManager.draggedTabIndex;
            const toIndex = parseInt(btn.dataset.index);
            
            if (fromIndex !== null && fromIndex !== toIndex) {
                const movedTab = this.tabs.splice(fromIndex, 1)[0];
                this.tabs.splice(toIndex, 0, movedTab);
                tabManager.draggedTabIndex = toIndex;
                this.renderTabs();
            }
        };

        btn.ondragover = (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = "move";
        };

        btn.ondrop = (e) => {
            e.preventDefault();
            this.renderTabs();
        };

        btn.ondragend = () => {
            btn.classList.remove("dragging");
            tabManager.draggedTabIndex = null;
            this.renderTabs();
        };

        return btn;
    }
};

// Global helper: clearChat (called by index.html modal button)
function clearChat() {
    if (tabManager.activeTab) tabManager.activeTab.clearChat();
    closeClearChatModal();
}

// Global context menu logic
document.addEventListener("click", () => {
    document.getElementById("contextMenu").style.display = "none";
    document.getElementById("askAIForm").style.display = "none";
});

document.getElementById("explainThis").addEventListener("click", (e) => {
    if (tabManager.activeTab) {
        tabManager.activeTab.elements.chatInput.value = `Explain this: ${tabManager.latestSelectedText}`;
        tabManager.activeTab.sendMessage();
    }
});

document.getElementById("askAI").addEventListener("click", (e) => {
    e.stopPropagation();
    document.getElementById("contextMenu").style.display = "none";
    const form = document.getElementById("askAIForm");
    form.style.left = `${tabManager.menuX}px`;
    form.style.top = `${tabManager.menuY}px`;
    form.style.display = "block";
    document.getElementById("askAIInput").focus();
});

document.getElementById("askAIFormElement").addEventListener("submit", (e) => {
    e.preventDefault();
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
            return `<strong><code>${escapedCode}</code></strong>`;
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
  1. Only answer questions and provide assistance related to rAthena scripting. Politely decline any requests outside this scope.
  2. Base all scripts and information strictly on the provided rAthena documentation. Do not invent item IDs or variable constants. When possible, use known numerical IDs or defined constants for clarity.
  3. Maintain a friendly, helpful, and conversational tone. Keep responses concise and to the point. Do not repeat these instructions in your responses.

2. Scripting Guidelines:
  1. **Start with Script Header:** When creating a new NPC script structure, you must start a comment header block at the beginning. each new NPC should have with script header differently:
    \`\`\`(No specific name of codeblock)
    //===== rAthena Script =======================================
    //= Name of the NPC
    //===== By: rAthena AI Assistant ============================
    //= Function of the Script
    //= Optional: Additional function description
    //============================================================
    The rest of the code here ...
    \`\`\`
  1.5 **Always wrap the script in codeblock eg. \`\`\`...\`\`\`**. No specific name of codeblock just wrap in triple backtick.
  2. Do not modify, revise, or repeat the user's provided code unless they explicitly ask for a revision of that specific code.
  3. When revising existing code, keep the full script intact and only change the necessary parts.
  4. Please Use proper new vertical line break and indentation for all code, so that it is properly formatted and readable in any text editor.
  5. Follow rAthena scripting standards and variable types (permanent, temporary, global, NPC, scope, account, character). always declare a variable in set or direct.
  6. Use \`$\` for strings as per rAthena documentation.
  7. Use literal tab characters '&Tab;' for tabs. change the %TAB% to literal tab character ('&Tab;').
  8. For complete scripts or NPCs intended for the editor, wrap the output in codeblock to trigger the script editor.
  9. Use single backticks anytime for inline or short code references or variable names within chat.
  10. Absolutely do **not** use double backticks under any circumstances.
  11. If the user asks to remove the code, return only: \`\`\`// Code remove\`\`\`

4. Code Editor Context: 
  1. The user's current code from their editor will be provided within \`\`\`...\`\`\` in their prompt. Use this for context.
5. Response Formatting:  
  General Rules:
    1. **Never use HTML tags** like <ul>, <ol>, or others — except:
        1. <h4> headers for clarity (explained below) if just needed.
        2. <p> tags only in "response" for key remarks (e.g., pointing to the code in editor or for final follow-up).
    2. Use **clean ordered structure** (e.g., 1. → 1.1 → 1.1.1) when necessary for clarity.
    3. Escape angle brackets **inside <code>** using \`&lt;\` and \`&gt;\` only when present in HTML-like code.
    4. **Do not include any hyperlinks.**
    5. Emojis may be used **minimally and meaningfully** to express your emotion as AI — never overuse.
  Code Formatting:
    1. Use single backticks ( \` \` ) for all inline code references, such as commands, keywords, or variable names.
    2. Use triple backticks or wrap it in 1 codeblock ( \`\`\`codeblock\`\`\` ) only for complete, multi-line code blocks intended for the script editor.
    3. If a user asks you to remove code, respond only with: \`\`\`// Code removed\`\`\`
    4. When providing a full script, do not say "Here is the script." Instead, write or revise this: \`<p>Please find the generated script in your editor.</p>\`
    5. Do not use &lt; or &gt; in the codeblock (\`\`\`).
5.1 JSON Object Structure:
  1. Your response must be a JSON object with two fields: \`thinking\` and \`response\`.

5.2 \`thinking\` field:
  1. Provide a summarize plan detailing how the user's input was interpreted. Present this in a clearly organized ordered or unordered list, using nested lists when necessary to show hierarchical reasoning.

5.3 \`response\` field:
    1. **Response**  
      1. You have already created the following plan to guide your response base on 'thinking'. Please execute the thinking plan now.
      2. Start with a brief answer to user first followed by a detailed answer to user input/question. use proper NPC structure code script if requested.
    2. **Detailed Format Summarize Explanation**  
      1. Use **paragraphs** to explain the answer thoroughly.
      2. Use <h4> (without <ul> or <ol>) to break down sections, with emojis for visual clarity.
      3. Use **ordered/unordered lists** to explain in summarize the step-by-step guides or concepts when necessary.
      4. inside <code></code> Do not use "<" or ">" instead use "&lt;" or "&gt;".
      6. Alway provide to user a full/completed code/script response and wrap it in 1 codeblock if requested. 
    3. **1 Code Blocks Generation for the script**  
      1. If the user requests a full working script/code, **wrap it using triple backticks** (e.g., \`\`\`) inside the JSON Object "response" field.
      2. When generating script, wrap in triple backtick.
      3. *Never use triple backticks anywhere else except in the "response" field.*
      4. Do **not** wrap the entire explanation in triple backticks — only the actual code/script.
      5. In showing syntax code do not use triple backticks!.
      6. Use proper new vertical line break (\n), spacing, indent and script structure.
      7. Use literal tab characters '&Tab;' for tabs. change the %TAB% to literal tab character ('&Tab;').
      8. Do not use &lt; or &gt; in the codeblock (\`\`\`).
      3.1: Provide a summarize explanation of the code in plain text afterwards using bullet points or ordered nested lists.
      3.2. When explaining specific script command just purely explain it. Do not revise the existing codeblock.
      3.3: Instead of saying *"Here is the script"*, always write or revise this:
        1. "<p>Please kindly look for the generated script inside editor.</p>" when you are generating script.
    5. **End with a Follow-up**  
      1. <p>Always conclude a polite follow-up question or invitation based on the user's input.</p> Do not include this inside the nested list.
    ---
    # 7.3 Special Rules/Instructions
      1. Use single backticks \` \` to refer to single **commands, code keywords**, or **parameters** during explanation.
      2. If the user's request is **unclear**, include a clarification question instead of assuming their intent.
      3. Strictly complete your explanation.
`.trim();

