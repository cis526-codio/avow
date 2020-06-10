const escape = require('escape-html');
const formatList = require("./format-list");

/** @function fail
 * Prints a fail statement and any feedback
 * @param {string[]|string} feedback - the feedback to report 
 * @returns {string} the HTML snippet
*/
function fail(feedback) {
    if(Array.isArray(feedback)) {
        process.stdout.write(`You need to fix the following issues:\n`);
        process.stdout.write(`<ul>\n${formatList(feedback)}\n</ul>`);
    } else if(feedback) {
        process.stdout.write(`You need to fix the following issue:`);
        process.stdout.write(escape(feedback.toString()));
    } 
    process.exit(1);
}

module.exports = fail;