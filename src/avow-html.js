const fs = require('fs');
const path = require('path');
const html = require('html-parse-stringify');

/** Notes
 * Future improvements:
 * add the ability to verify children in the ast
 */

/** @function compareNodes
 * Determines if two nodes in the ast are equivalent. Equivalence 
 * means that the type and tag name are the same, and also that
 * all the attributes of a also exist in b.
 * @param {node} a - the first node to compare 
 * @param {node} b - the second node to compare 
 * @returns {boolean} returns true if the nodes are equivalent, otherwise false
 */
function compareNodes(a, b) {
    // quick rejection test
    if(!a || !b || a.type !== b.type || a.name !== b.name) return false;
    // compare attributes 
    var attributes = Object.keys(a.attrs);
    for(var i = 0; i < attributes.length; i++) {
        if(a.attrs[attributes[i] !== b.attrs[attributes[i]]]) return false;
    }
    return true;
}

/** @function findNode 
 * Searches the ast for a node equivalent to the one supplied.
 * @param {node} node - the node to search for 
 * @param {ast} ast - the abstract syntax tree to search
 * @returns {node} the found node, or undefined
 */
function findNode(node, ast) {
    for(var i = 0; i < ast.length; i++) {
        if(compareNodes(node, ast[i])) return ast[i];
        var childResult = findNode(node, ast[i].children);
        if(childResult) return childResult;
    }
    return undefined;
}

/** @function checkHTML 
 * Checks that the expected ast exists within the actual ast.
 * @param {ast} expected - the expected HTML abstract syntax tree 
 * @param {ast} actual - the actual HTML abstract syntax tree 
 * @returns {string[]} a list of found issues as HTML snippets 
 */
function checkHTML(expected, actual) {
    var issues = [];
    expected.forEach(expectedNode => {
        var node = findNode(expectedNode, actual);
        console.log('found', node);
        if(!node) {
            var attributes = Object.keys(expectedNode.attrs)
                .map(key => `<code>${key}=${expectedNode.attrs[key]}</code>`)
                .join(',');
            issues.push(`Expected a <code>&lt;${expectedNode.name}&gt;</code> with attributes ${attributes}`);
        }
    });
    return issues;
}

/** @function loadHTML 
 * @param {string} filepath - the path to the html file, or a snippet of html
 * @returns {ast} the parsed html abstract syntax tree
 */
function loadHTML(filepath) {
    if(fs.existsSync(filepath)) {
        return html.parse(fs.loadFileSync(filepath));
    } else {
        return html.parse(filepath);
    }
}

/** @avowHTML
 * Checks that all the expected HTML struture appears in the actual HTML, 
 * and returns a list of issues found.
 * @param {string} expected - the expected HTML content, as a filepath or html string 
 * @param {string} actual - the actual HTML content, as a filepath or html string
 * @returns {string[]} a list of html snippets corresponding to missing HTML structure
 */
function avowHTML(expected, actual) {
    return checkHTML(loadHTML(expected), loadHTML(actual));
}

module.exports = avowHTML;