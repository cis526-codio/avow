/** @fucntion formatIssues 
 * Formats an issue string list into an unordered html list
 * @param {string[]} issues - the issues to report 
 * @returns {string} the HTML snippet
*/
function formatIssues(issues) {
    var issueItems = issues.map(issue => `<li>${issue}</li>`).join('\n');
    return `<ul>\n${issueItems}\n</ul>`;
}