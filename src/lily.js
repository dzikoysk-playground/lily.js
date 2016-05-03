// Initialize
var textArea = q('#lily-editor');
textArea.remove();

var lilyWorkspace = e('.lily-workspace');
var lineNumbers = e('.lily-line-numbers');
var editor = e('.lily-editor');

editor.contentEditable = true;
editor.on('click', function () {
    rs();
});

parse();

lilyWorkspace.append(editor);
lilyWorkspace.append(lineNumbers);
textArea.parentElement.append(lilyWorkspace);

function rs() {
    var range = document.createRange();
    var sel = window.getSelection();
    try {
        range.setStart(editor.childNodes[2], 5);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
    } catch (exception) {
    }
}

function getCharByKeyCode(keyCode) {
    return String.fromCharCode((96 <= keyCode && keyCode <= 105) ? keyCode - 48 : keyCode);
}

function parse() {
    var content = getContent();
    var lines = content.split('\n');

    lineNumbers.html('');
    for (var i = 1; i < lines.length + 1; i++) {
        var lineNumber = e('p.lily-line-number');
        lineNumber.append(t(i));
        lineNumbers.append(lineNumber);
    }

    editor.html(content);
    rs();
}

function getContent(){
    return editor.text().replace('<br><br>', '\n');
}
