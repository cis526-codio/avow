/** @function fail
 * Prints a fail statement and any feedback
 * @param {string[]} feedback - the feedback to report 
 * @returns {string} the HTML snippet
*/
function fail(feedback) {
    var fbItems = feedback.map(fb => `<li>${fb}</li>`).join('\n');
    process.stdout.write(`You need to fix the following issues:\n`);
    process.stdout.write(`<ul>\n${fbItems}\n</ul>`);
    process.exit(1);
}

module.exports = fail;