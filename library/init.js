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

function openApiModal() {
  document.getElementById('modalApi').style.display = 'flex';
}

function closeApiModal() {
  document.getElementById('modalApi').style.display = 'none';
}

let fileHandle;
let lastDirectoryHandle = null;

function newFile() {
  // Reset file access handles
  fileHandle = null;
  lastDirectoryHandle = null;

  editor.setValue("", -1); // Clear editor content, move cursor to start
  editor.session.setUndoManager(new ace.UndoManager()); // Reset undo history
  // Update the <title> with the new file name
  document.title = "Untitled - rAthena Text Editor";
}

document.getElementById("openBtn").addEventListener("click", async () => {
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

  const contents = await file.text();
  editor.setValue(contents, -1);
  editor.scrollToLine(0, true, true, function () {});
  editor.gotoLine(1, 0, true);
  // document.title = "Untitled - rAthena Text Editor";
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
        text = text.replace(/`([^`]+)`/g, '<code>$1</code>');
        text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
        text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
        text = text.replace(/\*(.+?)\*/g, '<em>$1</em>');
        return text;
    };

    const flushParagraph = () => {
        if (inParagraph) {
            outputHtml.push('<p>' + currentParagraphLines.map(processInlineMarkdown).join('<br>') + '</p>');
            currentParagraphLines = [];
            inParagraph = false;
        }
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



// Assuming markdownToHtmlForChat correctly converts markdown to HTML string
function typeWriterEffectForChat(element, markdownText, callback) {
    let typedCharacters = ''; // Accumulator for the raw text being typed
    let i = 0;
    const speed = 1; // Typing speed in milliseconds (faster)
  
    function typeAndRenderIncrementally() {
        if (i < markdownText.length) {
            typedCharacters += markdownText.charAt(i);
            i++;

            element.innerHTML = markdownToHtmlForChat(typedCharacters);
            
            setTimeout(typeAndRenderIncrementally, speed);
            scrollToBottom();
        } else {
            // Ensure final render in case last character didn't trigger full render
            element.innerHTML = markdownToHtmlForChat(markdownText);
            if (callback) callback();
        }
    }

    // Choose which option to use:
    // typeAndRenderAtEnd(); // If you want raw text during typing, then final HTML
    typeAndRenderIncrementally(); // If you want partial HTML rendering during typing
}

// Typewriter effect function for Ace Editor
function typeWriterEffectForEditor(editorInstance, text, callback) {
    let i = 0;
    editorInstance.setValue('', -1); // Clear editor content initially
    const speed = 1; // Typing speed in milliseconds (very fast for code)

    function type() {
        if (i < text.length) {
            editorInstance.session.insert(editorInstance.getCursorPosition(), text.charAt(i));
            // Scroll to bottom on each character typed
            editor.scrollToLine(editor.session.getLength(), true, false, function () {});

            i++;
            setTimeout(type, speed);
        } else {
            if (callback) callback();
        }
    }
    type();
}

// Function to add a message to the chat display
function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);

    const messageBubble = document.createElement('div');
    messageBubble.classList.add('message-bubble');

    messageDiv.appendChild(messageBubble);
    chatMessages.appendChild(messageDiv);
    scrollToBottom();

    // Only apply typewriter effect for AI messages
    if (sender === 'ai') {
        // The callback will handle re-enabling controls after typing
        typeWriterEffectForChat(messageBubble, text, () => {
            sendButton.disabled = false; // Re-enable send button
            loadingIndicator.classList.remove('active'); // Hide loading indicator
            chatInput.focus(); // Focus input for next message
        });
    } else {
        // Create a <p> for user message
        const messageText = document.createElement('p');
        messageText.textContent = text;
        messageBubble.appendChild(messageText);
    }
}

// Function to handle sending a message
async function sendMessage() {
    const userMessage = chatInput.value.trim();
    if (!userMessage) return; // Don't send empty messages

    var apikeyModal = document.getElementById("APIKey");

    addMessage(userMessage, 'user'); // Display user's message
    chatInput.value = ''; // Clear input field
    sendButton.disabled = true; // Disable send button immediately
    loadingIndicator.classList.add('active'); // Show loading indicator immediately
    scrollToBottom();
    
    // Make editor read-only when LLM starts responding
    editor.setReadOnly(true);
    editor.container.style.pointerEvents = "none";

    // Get the current content from the Ace editor
    const editorContent = editor.getValue();

    // LLM Instruction
    chatHistory.push({ role: "user", parts: [{ text: ` 
      1. You are an expert programmer AI assistant in rAthena Scripting.
      2. Do not repeat the instructions given to you just response in friendly tone
      3. Strictly USE or START triple backticks \`\`\` for writing codes, this code is use inside editor and Strictly do not start triple backticks on the sentence when the user is just asking or questioning you.
      4. Do not give him a code if he don't ask or request. Strictly follow this scripting standard structure.
      5. Do not answer him if he is asking not related on rAthena.
      6. Do not revise the code when its not requested.
      7. Strictly do not answer him a longer response. Think diverse thinking strategies.
      8. Do not assume variable constant, always provide with item ID numbers to him.
      9. Avoid using all markdown formattings.
      10. When responding for codeblock use triple backticks.
      11. When responding, please format your answers using clean and minimal HTML to enhance clarity and structure. Use the following guidelines:
           Use <ol><li>...</li></ol> for ordered (step-by-step or ranked) lists.
           Use <ul><li>...</li></ul> for unordered lists when items are not sequential.
           Use <p> tags to wrap regular paragraphs for readability.
           Use <strong> or <em> to emphasize important words or phrases, instead of using asterisks or markdown symbols.
           Do not include full HTML structure (<html>, <head>, <body>) just the relevant snippet.
           Keep responses clean, readable, and logically structured like how ChatGPT would respond in a helpful, conversational tone.
           End your response with a friendly, helpful follow-up question or invitation for clarification or Followed by an invitation to ask further questions or make additional requests wrap it <p></p>
      12. When revising code, preserve the full script in the editor and modify only the requested part.
      13. When showing full code:
         • Use triple backticks (\`\`\`) at the start and last for full, standalone code.
         When showing short code:
         • Use inline formatting with single backticks (\`like this\`) or write code as plain text without backticks.
         Do not use triple backticks for short code to avoid triggering code editor behavior.
      14. This is the Code in the editor as your basis if the user ask: \`\`\` ${editorContent}\`\`\`
    ` }] });

    // Add user message to chat history for API context
    chatHistory.push({ role: "user", parts: [{ text: userMessage }] });
  
    try {
        // Prepare the payload for the Gemini API call
        const payload = {
            contents: chatHistory
        };

        // gemini-1.5-flash, gemini-2.5-flash-preview-05-20
        const apiKey = apikeyModal.value;
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/learnlm-2.0-flash-experimental:generateContent?key=${apiKey}`;

        // Make the API call to Gemini
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

        // Check if the response structure is valid and contains content
        if (result.candidates && result.candidates.length > 0 &&
            result.candidates[0].content && result.candidates[0].content.parts &&
            result.candidates[0].content.parts.length > 0) {
            const aiResponse = result.candidates[0].content.parts[0].text;

            // Try to extract code block for Ace Editor
            const codeBlockRegex = /```(\w+)?\s*([\s\S]*?)\s*```/;
            const match = aiResponse.match(codeBlockRegex);

            let chatDisplayMessage;
            if (match) {
                const language = match[1] || 'javascript'; 
                const codeContent = match[2].trim();
                // Calculate the start and end indices of the matched code block
                const codeBlockStartIndex = match.index;
                const codeBlockEndIndex = match.index + match[0].length;

                // Separate introduction, code, and footer
                let introText = aiResponse.substring(0, codeBlockStartIndex).trim();
                let footerText = aiResponse.substring(codeBlockEndIndex).trim();

                typeWriterEffectForEditor(editor, codeContent, () => {
                  // Enable interaction again
                  editor.setReadOnly(false);
                  editor.container.style.pointerEvents = "auto";
                });

                // If code is present, display "Okay" in the chat bubble
                // Construct the message to display in the chat bubble
                chatDisplayMessage = '';
                if (introText) {
                    chatDisplayMessage += `<p>${introText}</p>`;
                }
                if (footerText) {
                    chatDisplayMessage += `<p>${footerText}</p>`;
                }
                // If there's only code and no intro/footer, maybe add a small message.
                if (!introText && !footerText) {
                    chatDisplayMessage = "<p>Generated code is displayed in the editor.</p>";
                }
            } else {
                // editor.setValue('// No code block found in the last response', -1);
                chatDisplayMessage = aiResponse; // Use the full response for the chat bubble
                // Enable interaction again
                editor.setReadOnly(false);
                editor.container.style.pointerEvents = "auto";
            }

            addMessage(chatDisplayMessage, 'ai'); // Display AI's response with typewriter effect

            // Add AI response to chat history (full response including code for context)
            chatHistory.push({ role: "model", parts: [{ text: aiResponse }] });

        } else {
            addMessage("Sorry, I couldn't get a response from the AI. Please try again.", 'ai');
            console.error("Unexpected API response structure:", result);
            // Ensure controls are re-enabled even if no valid response
            sendButton.disabled = false;
            loadingIndicator.classList.remove('active');
            chatInput.focus();
            // Enable interaction again
            editor.setReadOnly(false);
            editor.container.style.pointerEvents = "auto";
        }

    } catch (error) {
        console.error('Error fetching from Gemini API:', error);
        addMessage(`Oops! Something went wrong: ${error.message}. Please try again.`, 'ai');
        // Ensure controls are re-enabled on API error
        sendButton.disabled = false;
        loadingIndicator.classList.remove('active');
        chatInput.focus();
        // Enable interaction again
        editor.setReadOnly(false);
        editor.container.style.pointerEvents = "auto";
    }
}

// Event listeners
sendButton.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

// Initial focus on the input field
chatInput.focus();
