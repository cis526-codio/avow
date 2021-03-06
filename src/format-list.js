const formatString = require('./format-string');

/** @function formatList
 * Formats a list of strings into an unordered html list
 * @param {string[]} items - the items to report 
 * @returns {string} the HTML snippet
*/
function formatList(items) {
    var itemHTML = items.map(item => `<li>${formatString(item)}</li>`).join('\n');
    return `<ul>\n${itemHTML}\n</ul>`;
}

module.exports = formatList;
