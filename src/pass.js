/** @function pass
 * Prints a pass statement and any feedback
 * @param {string[]} feedback - the feedback to report 
 * @returns {string} the HTML snippet
*/
function pass(feedback) {
    var fbItems = feeback.map(fb => `<li>${fb}</li>`).join('\n');
    process.stdout.write(`Good work!\n`);
    process.stdout.write(`<ul>\n${fb}\n</ul>`);
    process.exit(0);
}

module.exports = pass;