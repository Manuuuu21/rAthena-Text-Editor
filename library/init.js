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

let fileHandle = null; // We'll store this after opening

// Open file using File System Access API (real file object)
document.getElementById("openBtn").addEventListener("click", async () => {
  try {
    [fileHandle] = await window.showOpenFilePicker();
    const file = await fileHandle.getFile();
    const contents = await file.text();
    editor.setValue(contents, -1);

    // Set the <title> to the opened file's name
    document.title = file.name + " - rAthena Text Editor";
  } 
  catch (err) {
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
    console.log("Saved successfully.");
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