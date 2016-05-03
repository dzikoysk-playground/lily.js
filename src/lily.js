// Initialize
var textArea = q('#lily-editor');
var textAreaParent = textArea.parentNode;
textAreaParent.removeChild(textArea);

var lilyWorkspace = e('div.lily-workspace');
var lineNumbers = e('div.lily-line-numbers');
var editor = e('div.lily-editor');

editor.contentEditable = true;
editor.on('click', function () {
    rs();
});

parse();

lilyWorkspace.append(editor);
lilyWorkspace.append(lineNumbers);
textAreaParent.append(lilyWorkspace);

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

    lineNumbers.innerHTML = '';
    for (var i = 1; i < lines.length + 1; i++) {
        var lineNumber = e('p.lily-line-number');
        lineNumber.innerHTML = i;
        lineNumbers.append(lineNumber);
    }

    editor.innerHTML = content;
    rs();
}

function getContent(){
    return editor.innerHTML.replace('<br><br>', '\n').replace(/<[^>]*>/g, "");
}