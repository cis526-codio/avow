const escape = require('escape-html');
const markdown = require('markdown').markdown;

/** @function formatString
 * Formats a string into HTML 
 * @param {string} input - the string to format
 * @returns {string} the HTML snippet
*/
function formatString(input) {
    return markdown.toHTML(escape(input.toString()));
}

module.exports = formatString;