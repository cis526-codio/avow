const formatList = require("./format-list");

/** @function pass
 * Prints a pass statement and any feedback
 * @param {string[]|string} feedback - the feedback to report 
 * @returns {string} the HTML snippet
*/
function pass(feedback) {
    process.stdout.write(`Good work!\n`);
    if(Array.isArray(feedback)) {
        process.stdout.write(`<ul>\n${formatList(feedback)}\n</ul>`);
    } else if(feedback) {
        process.stdout.write(escape(feedback.toString()));
    }
    process.exit(0);
}

module.exports = pass;