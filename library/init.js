function toggleTheme() {
  const root = document.documentElement;
  const isLight = currentTheme === "ace/theme/github_light_default";

  currentTheme = isLight ? "ace/theme/monokai" : "ace/theme/github_light_default";
  root.style.setProperty('--darkmodeColor', isLight ? '#686868' : '#d9d9d9');
  editor.setTheme(currentTheme);
}

// Download button
function downloadEditorContent() {
  const content = editor.getValue();
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "rAthenaTxtScript.txt";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

// Code History Feature
let codeHistory = [];
let currentHistoryIndex = -1; // -1 indicates no history yet, or before the first item.
const MAX_HISTORY_SIZE = 25;

function updateHistoryButtonsState() {
    const prevBtn = document.getElementById('previousCodeBtn');
    const nextBtn = document.getElementById('nextCodeBtn');
    if (prevBtn) {
        prevBtn.disabled = currentHistoryIndex <= 0;
    }
    if (nextBtn) {
        nextBtn.disabled = currentHistoryIndex >= codeHistory.length - 1;
    }
}

function saveCurrentCodeToHistory() {
    if (typeof editor === 'undefined' || !editor || !editor.session) return;
    const currentCode = editor.getValue();
    if (currentHistoryIndex >= 0 && codeHistory[currentHistoryIndex] === currentCode) {
        updateHistoryButtonsState(); // Still update button state in case it's the very first save
        return;
    }
    if (currentHistoryIndex < codeHistory.length - 1) {
        codeHistory = codeHistory.slice(0, currentHistoryIndex + 1);
    }
    codeHistory.push(currentCode);
    currentHistoryIndex = codeHistory.length - 1;
    if (codeHistory.length > MAX_HISTORY_SIZE) {
        codeHistory.shift(); 
        currentHistoryIndex--; 
    }
    updateHistoryButtonsState();
}

function previousCode() {
    if (currentHistoryIndex <= 0) {
        showSnackbar("No previous code available.");
        return;
    }
    currentHistoryIndex--;
    editor.setValue(codeHistory[currentHistoryIndex], -1);
    editor.session.setUndoManager(new ace.UndoManager()); 
    showSnackbar("Reverted to previous code.");
    updateHistoryButtonsState();
}

function nextCode() {
    if (currentHistoryIndex >= codeHistory.length - 1) {
        showSnackbar("No next code available.");
        return;
    }
    currentHistoryIndex++;
    editor.setValue(codeHistory[currentHistoryIndex], -1);
    editor.session.setUndoManager(new ace.UndoManager());
    showSnackbar("Reverted to next code.");
    updateHistoryButtonsState();
}

function openApiModal() {
  document.getElementById('modalApi').style.display = 'flex';
}

function closeApiModal() {
  document.getElementById('modalApi').style.display = 'none';
}

let fileHandle;
let lastDirectoryHandle = null;

function newFile() {
  saveCurrentCodeToHistory();
  // Reset file access handles
  fileHandle = null;
  lastDirectoryHandle = null;

  editor.setValue("", -1); // Clear editor content, move cursor to start
  editor.session.setUndoManager(new ace.UndoManager()); // Reset undo history
  // Update the <title> with the new file name
  document.title = "Untitled - rAthena Text Editor";
  saveCurrentCodeToHistory();
}

document.getElementById("openBtn").addEventListener("click", async () => {
  saveCurrentCodeToHistory();
  try {
    const options = {
      types: [
        {
          description: "Text Files",
          accept: { "text/plain": [".txt"] },
        },
      ],
      // Try to open in the last known directory
      startIn: lastDirectoryHandle || "documents",
    };

    [fileHandle] = await window.showOpenFilePicker(options);

    // Save the directory handle for next time
    lastDirectoryHandle = await fileHandle.getFile().then(file => fileHandle.getFile().then(() => fileHandle));

    const file = await fileHandle.getFile();
    const contents = await file.text();
    editor.setValue(contents, -1);
    editor.scrollToLine(0, true, true, function () {});
    editor.gotoLine(1, 0, true);

    // Set the <title> to the opened file's name
    document.title = file.name + " - rAthena Text Editor";
    saveCurrentCodeToHistory();
  } catch (err) {
    if (err.name === "AbortError") {
      console.log("Cancelled file open.");
    } else {
      console.error("Open failed:", err);
    }
  }
});

// Save file (overwrite original file, not download)
async function saveToFile() {
  try {
    if (!fileHandle) {
      // Trigger Save As dialog
        fileHandle = await window.showSaveFilePicker({
          suggestedName: "rAthenaTxtScript.txt",
          types: [
            {
              description: "Text Files",
              accept: { "text/plain": [".txt"] },
            },
          ],
        });

      // Update the <title> with the new file name
      document.title = fileHandle.name + " - rAthena Text Editor";
    }

    const writable = await fileHandle.createWritable();
    await writable.write(editor.getValue());
    await writable.close();
    showSnackbar("Saved successfully.");
    saveCurrentCodeToHistory();
  } 
  catch (err) {
    if (err.name === "AbortError") {
      console.log("Saving was canceled.");
    } 
    else {
      console.error("Failed to save:", err);
    }
  }
}
// Save button
document.getElementById("saveBtn").addEventListener("click", () => {
  saveToFile();
});

// Drag and drop support (only .txt and .conf, and only 1 file)
const editorElement = document.getElementById("editor");
editorElement.addEventListener("dragover", (e) => {
  e.preventDefault();
  e.dataTransfer.dropEffect = "copy";
});

editorElement.addEventListener("drop", async (e) => {
  e.preventDefault();
  const files = e.dataTransfer.files;
  if (files.length !== 1) {
    alert("Only one file is allowed to be dropped.");
    return;
  }

  const file = files[0];
  const validExtensions = [".txt", ".conf", ".yml"];
  const fileName = file.name.toLowerCase();
  if (!validExtensions.some(ext => fileName.endsWith(ext))) {
    alert("Only .txt or .conf files are allowed.");
    return;
  }

  saveCurrentCodeToHistory();
  const contents = await file.text();
  editor.setValue(contents, -1);
  editor.scrollToLine(0, true, true, function () {});
  editor.gotoLine(1, 0, true);
  // document.title = "Untitled - rAthena Text Editor";
  saveCurrentCodeToHistory();
});

function openModal() {
  document.getElementById('modalOverlay').style.display = 'flex';
}

function closeModal() {
  document.getElementById('modalOverlay').style.display = 'none';
}

window.onclick = function() {
  if (event.target.id == 'modalOverlay') {
    closeModal();
  }
}

document.getElementById("toggleReadOnly").addEventListener("change", function () {
  editor.setReadOnly(this.checked);
});

let snackbarTimeout;
function createSnackbarContainer() {
  if (document.getElementById("snackbar")) return;
  const snackbar = document.createElement("div");
  snackbar.id = "snackbar"; // ID used for styling
  document.getElementById("editor").appendChild(snackbar);
}

function showSnackbar(message) {
  createSnackbarContainer();
  const snackbar = document.getElementById("snackbar");
  snackbar.textContent = message;
  snackbar.classList.add("show");

  if (snackbarTimeout) clearTimeout(snackbarTimeout);
  snackbarTimeout = setTimeout(() => {
    snackbar.classList.remove("show");
  }, 3000);
}

function toggleDisplayChatBotContainer() {
  const chatBot = document.getElementById('chatBotContainer');
  const editor = document.getElementById('editor');

  if (chatBot.style.display === 'none') {
    chatBot.style.display = 'block';
    chatBot.style.flex = '0 0 30%';

    editor.style.width = '70%';
    editor.style.flex = '0 0 70%';
  } else {
    chatBot.style.display = 'none';

    editor.style.width = '100%';
    editor.style.flex = '0 0 100%';
  }
}

let checkMarkSVG = `
    <svg style="margin-left:-3px;margin-bottom:2px;" xmlns="http://www.w3.org/2000/svg" height="11px" viewBox="0 -960 960 960" width="11px" fill="gray"><path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
`;

const firstDot = document.querySelector('.first_dot');
const secondDot = document.querySelector('.second_dot');
const thirdDot = document.querySelector('.third_dot');
let step = 0;

setInterval(() => {
  step = (step + 1) % 4;
  firstDot.style.visibility = step >= 1 ? 'visible' : 'hidden';
  secondDot.style.visibility = step >= 2 ? 'visible' : 'hidden';
  thirdDot.style.visibility = step >= 3 ? 'visible' : 'hidden';
}, 100); // adjust speed if needed

// Get references to DOM elements
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const sendButton = document.getElementById('send-button');
const loadingIndicator = document.getElementById('loading-indicator');
const copyCodeButton = document.getElementById('copy-code-button');

// Initialize chat history for the Gemini API
let chatHistory = [];

// Function to scroll to the bottom of the chat messages
function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function markdownToHtmlForChat(markdownText) {
    let outputHtml = [];
    let lines = markdownText.split('\n');
    let listStack = [];
    let inBlockquote = false;
    let inParagraph = false;
    let currentParagraphLines = [];
    let inCodeBlock = false;

    const processInlineMarkdown = (text) => {
        // Step 1: Handle code blocks with escaped angle brackets
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

    const flushBlockquote = () => {
        if (inBlockquote) {
            outputHtml.push('</blockquote>');
            inBlockquote = false;
        }
    };

    const closeListsAndItems = (targetIndent, forceCloseAll = false) => {
        while (listStack.length > 0) {
            const topList = listStack[listStack.length - 1];

            if (forceCloseAll || topList.indent >= targetIndent) {
                if (topList.lastItemOpen) {
                    outputHtml.push('</li>');
                    topList.lastItemOpen = false;
                }
                outputHtml.push(`</${topList.type}>`);
                listStack.pop();
            } else {
                break;
            }
        }
    };

    const closeAllOpenElements = () => {
        flushParagraph();
        closeListsAndItems(0, true);
        flushBlockquote();
    };

    for (let i = 0; i < lines.length; i++) {
        const originalLine = lines[i];
        const trimmedLine = originalLine.trim();
        const leadingSpaces = originalLine.match(/^\s*/)[0].length;

        if (originalLine.startsWith('```')) {
            closeAllOpenElements();
            inCodeBlock = !inCodeBlock;
            continue;
        }
        if (inCodeBlock) {
            continue;
        }

        if (trimmedLine === '') {
            closeAllOpenElements();
            continue;
        }

        const headingMatch = trimmedLine.match(/^(#{1,6})\s(.+)/);
        if (headingMatch) {
            closeAllOpenElements();
            const level = headingMatch[1].length;
            outputHtml.push(`<h${level}>${processInlineMarkdown(headingMatch[2])}</h${level}>`);
            continue;
        }

        if (trimmedLine === '---' || trimmedLine === '***') {
            closeAllOpenElements();
            outputHtml.push('<hr>');
            continue;
        }

        const blockquoteMatch = trimmedLine.match(/^>\s*(.*)/);
        if (blockquoteMatch) {
            flushParagraph();
            closeListsAndItems(0, true);

            if (!inBlockquote) {
                outputHtml.push('<blockquote>');
                inBlockquote = true;
            }
            outputHtml.push(`<p>${processInlineMarkdown(blockquoteMatch[1].trim())}</p>`);
            continue;
        } else if (inBlockquote) {
            flushBlockquote();
        }

        const olMatch = trimmedLine.match(/^(\d+)\.\s(.+)/);
        const ulMatch = trimmedLine.match(/^[-*]\s(.+)/);

        if (olMatch || ulMatch) {
            flushParagraph();
            flushBlockquote();

            const currentListType = olMatch ? 'ol' : 'ul';
            const listItemContent = olMatch ? olMatch[2] : ulMatch[1];
            const itemIndent = leadingSpaces;

            while (listStack.length > 0) {
                const topList = listStack[listStack.length - 1];
                if (topList.indent > itemIndent || (topList.indent === itemIndent && topList.type !== currentListType)) {
                    if (topList.lastItemOpen) {
                        outputHtml.push('</li>');
                        topList.lastItemOpen = false;
                    }
                    outputHtml.push(`</${topList.type}>`);
                    listStack.pop();
                } else {
                    break;
                }
            }

            let topList = listStack.length > 0 ? listStack[listStack.length - 1] : null;

            if (!topList || topList.indent < itemIndent) {
                outputHtml.push(`<${currentListType}>`);
                listStack.push({ type: currentListType, indent: itemIndent, lastItemOpen: false });
                topList = listStack[listStack.length - 1];
            }

            if (topList && topList.lastItemOpen) {
                outputHtml.push('</li>');
                topList.lastItemOpen = false;
            }

            outputHtml.push(`<li>${processInlineMarkdown(listItemContent)}`);
            if (topList) {
                topList.lastItemOpen = true;
            }

            continue;
        } else {
            flushParagraph();
            closeListsAndItems(0, true);
            flushBlockquote();
        }

        flushBlockquote();
        closeListsAndItems(0, true);

        inParagraph = true;
        currentParagraphLines.push(originalLine);
    }

    closeAllOpenElements();

    return outputHtml.join('\n');
}

let typeWriterStatusForChatDone;
function typeWriterEffectForChat(element, markdownText, callback) {
  let typedCharacters = '';
  let i = 0;
  const speed = 1; 
  const chunkSize = 10; 
  element.innerHTML = ''; // Clear previous content
  typeWriterStatusForChatDone = false;  // Reset flag

  function type() {
      if (i < markdownText.length) {
          typedCharacters += markdownText.slice(i, Math.min(i + chunkSize, markdownText.length));
          i += chunkSize;
          element.innerHTML = markdownToHtmlForChat(typedCharacters);
          scrollToBottom();
          setTimeout(type, speed);
      } else {
          element.innerHTML = markdownToHtmlForChat(markdownText); // Ensure final full parse
          scrollToBottom();
          typeWriterStatusForChatDone = true;
          if (callback) callback();
      }
  }
  type();
}

function typeWriterEffectForEditor(editorInstance, text, callback) {
  let i = 0;
  const chunkSize = 13; 
  const speed = 1;     
  editorInstance.setValue('', -1);
  const interval = setInterval(() => {
      if (i < text.length) {
          const chunk = text.slice(i, i + chunkSize);
          editorInstance.session.insert(editorInstance.getCursorPosition(), chunk);
          editorInstance.scrollToLine(editorInstance.session.getLength(), true, false, () => {});
          i += chunkSize;
      } else {
          clearInterval(interval);
          if (callback) callback();
      }
  }, speed);
}

function addMessage(text, sender) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message', sender);
  const messageBubble = document.createElement('div');
  messageBubble.classList.add('message-bubble');
  messageDiv.appendChild(messageBubble);
  chatMessages.appendChild(messageDiv);
  
  if (sender === 'ai') {
      typeWriterEffectForChat(messageBubble, text, () => {
          sendButton.disabled = false;
          loadingIndicator.classList.remove('active');
          chatInput.focus();
          scrollToBottom();
      });
  } else { // User message
      const preElement = document.createElement('pre'); // Use <pre> for user messages to preserve formatting
      preElement.textContent = text;
      messageBubble.appendChild(preElement);
      scrollToBottom();
  }
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
  1. **Start with Script Header:** When creating a new NPC script, you must start a comment header block at the beginning:
    \`\`\`(No specific name of codeblock)
    //===== rAthena Script =======================================
    //= [Name of the NPC]
    //===== By: rAthena AI Assistant ============================
    //= [Function of the Script]
    //= [Optional: Additional function description]
    //============================================================
    The rest of the code here ...
    \`\`\`
  1.5 **Always wrap the script in codeblock eg. \`\`\`...\`\`\`**. No specific name of codeblock just wrap in triple backtick.
  2. Do not modify, revise, or repeat the user's provided code unless they explicitly ask for a revision of that specific code.
  3. When revising existing code, keep the full script intact and only change the necessary parts.
  4. Please use standard line breaks and indentation for all code, so that it is properly formatted and readable in any text editor.
  5. Follow rAthena scripting standards and variable types (permanent, temporary, global, NPC, scope, account, character). always declare a variable in set or direct.
  6. Use \`$\` for strings as per rAthena documentation.
  7. Use \`\\t\` or \`&#9;\` for tabs. Never use \`%TAB%\`.
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
    2. Use triple backticks or wrap it in 1 codeblock ( \`\`\` ) only for complete, multi-line code blocks intended for the script editor.
    3. If a user asks you to remove code, respond only with: \`\`\`// Code removed\`\`\`
    4. When providing a full script, do not say "Here is the script." Instead, write: \`<p>Please find the generated script in your editor.</p>\`

5.1 JSON Object Structure:
  1. Your response must be a JSON object with two fields: \`thinking\` and \`response\`.

5.2 \`thinking\` field:
  1. Provide a summarize, step-by-step plan detailing how the user's input was interpreted. Present this in a clearly organized ordered or unordered list, using nested lists when necessary to show hierarchical reasoning.
  2. This should be a clear, logical, and organized list (ordered or unordered) that reflects your reasoning process.
  3. Do not repeat the instruction that was provided in the "thinking" field of the JSON object.

5.3 \`response\` field:
    1. **Response**  
      1. Start with a brief answer to user first followed by a detailed answer to user input/question. use proper NPC structure code script if requested.
    2. **Detailed Format Summarize Explanation**  
      1. Use **paragraphs** to explain the answer thoroughly.
      2. Use <h4> (without <ul> or <ol>) to break down sections, with emojis for visual clarity.
      3. Use **ordered/unordered lists** to explain step-by-step guides or concepts when necessary.
      4. inside <code></code> Do not use "<" or ">" instead use "&lt;" or "&gt;".
      5. Be precise in explaining.
      6. Alway provide to user a full/completed response and wrap it in 1 codeblock. 
    3. **1 Code Blocks Generation (if applicable) for the script**  
      1. If the user requests a full working script/code snippet, **wrap it using triple backticks** (e.g., \`\`\`) inside the JSON Object "response" field.
      2. When generating script, wrap in triple backtick.
      3. *Never use triple backticks anywhere else except in the "response" field.*
      4. Do **not** wrap the entire explanation in triple backticks — only the actual code.
      5. In showing syntax code do not use triple backticks!.
      6. Use proper new line break (\n), spacing, indent and script structure.
      3.1: Provide a summarize explanation of the code in plain text afterwards using bullet points or ordered nested lists.
      3.2. When explaining specific script command just purely explain it. Do not revise the existing codeblock.
      3.3: Instead of saying *"Here is the script"*, always write:
        1. "<p>Please kindly look for the generated script inside editor.</p>" when you are generating script.
    5. **End with a Follow-up**  
      1. <p>Always conclude a polite follow-up question or invitation based on the user's input.</p>
    ---
    # 7.3 Special Rules/Instructions
      1. Use single backticks \` \` to refer to single **commands, code keywords**, or **parameters** during explanation.
      2. If the user's request is **unclear**, include a clarification question instead of assuming their intent.
      3. Strictly complete your explanation.
`.trim();

chatHistory.push({
    role: "user",
    parts: [
        { text: `This is your **GUIDE** that you must follow to provide accurate data to user question: `+ standard_rAthena_script + `.\n\n` },
        { text: `Strictly follow this guidelines all the times: `+instructionPromt2 + `.\n\n` }
    ]
});


// Initialize the timerCounter as Global variable
let timerCounterForGlobal = 0;
var chatSessionNum = 0;
async function sendMessage() {
    const userMessage = chatInput.value.trim();
    if (!userMessage) return;

    if (typeWriterStatusForChatDone == false || chatSessionNum > 0) {
      return;
    }
    chatSessionNum++;

    // Reset First once we entered a chat message for AI
    timerCounterForGlobal = 0;
    let timerCountperChat = setInterval(function() {
      timerCounterForGlobal++;
    }, 1000);

    var apikeyModal = document.getElementById("APIKey");

    addMessage(userMessage, 'user');
    chatInput.value = '';
    sendButton.disabled = true;
    loadingIndicator.classList.add('active');
    scrollToBottom();
    
    editor.setReadOnly(true);
    editor.container.style.pointerEvents = "none";
    const editorContent = editor.getValue();
    document.getElementById('previousCodeBtn').setAttribute("disabled", "");
    document.getElementById('nextCodeBtn').setAttribute("disabled", "");

    // Construct the parts for the current user message
    // The instructional prompt and the actual user message are combined into one "user" turn
    const userInstructionalPrompt = `
      This is the code inside the editor as your context if the user ask: \`\`\`${editorContent}\`\`\`. Just Ignore if the Code inside the editor has no code or value.
    `.trim();

    // Add the combined user message (instructional prompt + actual message) to chat history
    chatHistory.push({
        role: "user",
        parts: [
            { text: `This is your additional context that you must follow always: ` + userInstructionalPrompt + `.\n\n` },
            { text: `This is user input/question: ` + userMessage + `. do not repeat all instructions.` }
        ]
    });

    try {
        const payload = {
          contents: chatHistory,
          "generationConfig": {
              "temperature": 0.0,       
              "maxOutputTokens": 65536, 
              "responseMimeType": "application/json",
              "responseSchema": {
                  "type": "OBJECT",
                  "properties": {
                      "thinking": { "type": "STRING" },
                      "response": { "type": "STRING" }
                  },
                  "propertyOrdering": ["thinking", "response"]
              }
          }
        };

        const apiKey = apikeyModal.value;
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`API error: ${response.status} ${response.statusText} - ${errorData.error.message || 'Unknown error'}`);
        }

        const result = await response.json();

        if (result.candidates && result.candidates.length > 0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0) {

          let thinking = "";
          let responseText = "";

          // Try to parse JSON output from model
          try {
              const structuredResponse = JSON.parse(result.candidates[0].content.parts[0].text);
              thinking = structuredResponse.thinking || "";
              responseText = structuredResponse.response || "";
          } catch (parseError) {
              console.warn("Failed to parse structured JSON. Falling back to raw text.");
              responseText = result.candidates[0].content.parts[0].text;
          }

          const codeBlockRegex = /```(\w+)?\s*([\s\S]*?)\s*```/;
          const match = responseText.match(codeBlockRegex);

          let chatDisplayMessage;
          if (match) {
              const codeContent = match[2].trim();
              const codeBlockStartIndex = match.index;
              const codeBlockEndIndex = match.index + match[0].length;

              let introText = responseText.substring(0, codeBlockStartIndex).trim();
              let footerText = responseText.substring(codeBlockEndIndex).trim();

              typeWriterEffectForEditor(editor, codeContent, () => {
                  editor.setReadOnly(false);
                  editor.container.style.pointerEvents = "auto";
                  saveCurrentCodeToHistory();
                  document.getElementById('previousCodeBtn').removeAttribute("disabled");
              });

              chatDisplayMessage = '';
              if (introText) chatDisplayMessage += introText + "\n\n";
              if (footerText) chatDisplayMessage += footerText;
              if (!introText && !footerText) {
                  chatDisplayMessage = "Generated code is displayed in the editor.";
              }

          } else {
              chatDisplayMessage = responseText;
              editor.setReadOnly(false);
              editor.container.style.pointerEvents = "auto";
              document.getElementById('previousCodeBtn').removeAttribute("disabled");
          }

          // ✅ Combined message
          let combinedMessage = '';
          
          // Stop the timerCount
          clearInterval(timerCountperChat);

          if (thinking) {
              combinedMessage += `
                <p class="ai_thought_textDesign">🤖  Thought in ${timerCounterForGlobal} seconds</p><div class="ai_thinking"><thinking>${thinking}</thinking></div><p>${checkMarkSVG}</p><p style="color:gray;font-size:10px;margin:-21px 0 10px 16px;">Done</p>`;
          }
          combinedMessage += chatDisplayMessage;
          addMessage(combinedMessage, 'ai');

          chatHistory.push({ role: "model", parts: [{ text: responseText }] });
          chatSessionNum = 0;

      } else {
          addMessage("Sorry, I couldn't get a response from the AI. Please try again.", 'ai');
          console.error("Unexpected API response structure:", result);
          sendButton.disabled = false;
          chatSessionNum = 0;
          loadingIndicator.classList.remove('active');
          chatInput.focus();
          editor.setReadOnly(false);
          editor.container.style.pointerEvents = "auto";
          document.getElementById('previousCodeBtn').removeAttribute("disabled");
      }

  } catch (error) {
      console.error('Error fetching from Gemini API:', error);
      addMessage(`Oops! Something went wrong: ${error.message}. Please try again.`, 'ai');
      sendButton.disabled = false;
      chatSessionNum = 0;
      loadingIndicator.classList.remove('active');
      chatInput.focus();
      editor.setReadOnly(false);
      editor.container.style.pointerEvents = "auto";
      document.getElementById('previousCodeBtn').removeAttribute("disabled");
  }
}

sendButton.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter' && !event.shiftKey) { 
        event.preventDefault(); 
        sendMessage();
    }
});

chatInput.focus();
