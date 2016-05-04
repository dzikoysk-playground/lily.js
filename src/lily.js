function Lily() {
    this.lilyWorkspace = e('div.lily-workspace');
    this.lineNumbers = e('div.lily-line-numbers');
    this.editorContainer = e('div.lily-editor-container');
    this.textArea = e('textarea.lily-textarea');
    this.editor = e('div.lily-editor');
    this.caret = e('span.lily-editor-caret');
    this.extensions = [];

    // Configure
    setInterval(function () {
        lily.caret.visibility = !lily.caret.visibility;
    }, 400);
    this.textArea.on('keypress', function () {
        lily.parse();
        lily.rs();
    });
    this.textArea.on('keyup', function () {
        lily.parse();
        lily.rs();
    });
    this.textArea.css({
        'height': this.editor.css('height'),
        'font-size': this.editor.css('font-size'),
        'font-family': this.editor.css('font-family'),
        'white-space': this.editor.css('white-space')
    });
    this.parse();
}

// method: 'initialize'
Lily.prototype.initialize = function () {
    var lily = this;
    var lilyEditor = q('.lily-editor');
    var lilyEditorParent = lilyEditor.parentNode;

    // Apply changes
    this.editorContainer.append(this.editor);
    this.editorContainer.append(this.textArea);
    this.lilyWorkspace.append(this.editorContainer);
    this.lilyWorkspace.append(this.lineNumbers);
    lilyEditorParent.replaceChild(this.lilyWorkspace, lilyEditor);

    // Load extensions
    this.extensions.forEach(function (extension) {
        extension.onload();
    });

    this.onload();
};

// method 'onload'
Lily.prototype.onload = function () {
};

// method 'registerExtension'
Lily.prototype.registerExtension = function (extension) {
    if (extension.initialize == null) {
        extension.initialize = function (lily) {
            this.lily = lily;
        };
    }
    if (extension.onload == null) {
        extension.onload = function () {};
    }
    this.extensions.push(extension);
    extension.initialize(this);
};

// method 'parse'
Lily.prototype.parse = function () {
    this.reload();
};

// Method 'rs'
Lily.prototype.rs = function () {
    var range = document.createRange();
    var sel = window.getSelection();
    try {
        range.setStart(this.editor.childNodes[2], 5);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
    }
    catch (exception) {
    }
};

// Method 'reload'
Lily.prototype.reload = function () {
    var content = this.getContent();
    var lines = content.split('\n');

    var lineHeight = this.editor.css('font-size') + 4;
    this.lineNumbers.html('');
    for (var i = 1; i < lines.length + 1; i++) {
        var lineNumber = e('p.lily-line-number');
        lineNumber.html(i);
        this.lineNumbers.append(lineNumber);
    }
    this.textArea.css({
        'height': (lineHeight * lines.length + lineHeight) + 'px'
    });

    var lily = this;
    this.editor.html('');
    lines.forEach(function (element) {
        lily.editor.html(lily.editor.innerHTML + element + '<br>');
        lily.editor.scrollTop = lily.editor.scrollHeight;
    });
};

// Method 'getContent'
Lily.prototype.getContent = function () {
    return this.textArea.value;
};

// Utils
function getCharByKeyCode(keyCode) {
    return String.fromCharCode((96 <= keyCode && keyCode <= 105) ? keyCode - 48 : keyCode);
}

// Run
var lily = new Lily();
window.onload = function () {
    lily.initialize();
};
