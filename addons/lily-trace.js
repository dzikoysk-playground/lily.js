/**
 * LilyTrace Extension Documentation
 *
 * @globalVariable lilyTrace - global variable of extension
 *
 * @function applyTraceVisibility(<power>)
 *           <power> - int, range of 1 to 10
 */

// LilyTrace constructor
function LilyTrace() {
    this.lily = null;
}

/* Range of 1 to 10 */
LilyTrace.prototype.applyTraceVisibility = function (power) {
    var textArea = this.lily.textArea;
    textArea.css({
        'opacity': power / 10
    });
};

var lilyTrace = new LilyTrace();
lily.registerExtension(lilyTrace);