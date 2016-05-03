
function Lily() {
    // Initialize
    var lily = this;
    var lilyEditor = q('.lily-editor');
    var lilyEditorParent = lilyEditor.parentNode;

    this.lilyWorkspace = e('div.lily-workspace');
    this.lineNumbers = e('div.lily-line-numbers');
    this.textArea = e('textarea.lily-textarea');
    this.editor = e('div.lily-editor');

    // Editor
    this.editor.contentEditable = true;
    this.editor.on('click', function () {
        lily.rs();
    });

    // Parse content
    this.parse();

    // Apply changes
    lilyEditor.remove();
    this.lilyWorkspace.append(this.editor);
    this.lilyWorkspace.append(this.lineNumbers);
    lilyEditorParent.append(this.lilyWorkspace);
}

Lily.prototype.parse = function() {
    var content = this.getContent();
    var lines = content.split('\n');

    this.lineNumbers.html('');
    for (var i = 1; i < lines.length + 1; i++) {
        var lineNumber = e('p.lily-line-number');
        lineNumber.html(i);
        this.lineNumbers.append(lineNumber);
    }

    this.editor.html(content);
    this.rs();
};

// Functions
Lily.prototype.rs = function () {
    var range = document.createRange();
    var sel = window.getSelection();
    try {
        range.setStart(editor.childNodes[2], 5);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
    } catch (exception) {
    }
};

Lily.prototype.getContent = function () {
    return this.editor.text().replace('<br><br>', '\n');
};

function getCharByKeyCode(keyCode) {
    return String.fromCharCode((96 <= keyCode && keyCode <= 105) ? keyCode - 48 : keyCode);
}

// Run
var lily = new Lily();
