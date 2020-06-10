const fs = require('fs');
const path = require('path');
const css = require('css');
const cheerio = require('cheerio');

/** Notes
 * Future improvements:
 * Use loose comparisons of selectors, i.e. .some.stuff should equal .stuff.some
 * Unpack declarations, i.e. border: 1px solid black should become border-width: 1px, border-style: solid, and border-color: black;
 */

/** @function compareSelectors
 * Compares two css selectors for equivalence
 * @param {declaration} a - the first selector
 * @param {declaration} b - the second selector
 * @returns {boolean} true if the two declarations are equivalent, false if not
 */
function compareSelectors(a, b) {
    // Simple case: the two selectors are identical
    if(a === b) return true;
     
    // TODO: Add more sophisticated evaluation
    return false;
}

/** @function compareDeclarations
 * Compares two css declarations for equivalence (the same property and value).
 * @param {declaration} a - the first declaration
 * @param {declaration} b - the second declaration
 * @returns {boolean} true if the two declarations are equivalent, false if not
 */
function compareDeclarations(a, b) {
    return a.property === b.property && a.value === b.value;
}

/** @function selectorInList
 * Determines if the supplied selector appears in a list of selectors 
 * @param {string} selector - a CSS selector string
 * @param {string[]} selectorList - a list of CSS selector strings
 * @returns {boolean} true if the list contains the selector, false otherwise
 */
function selectorInList(selector, selectorList) {
    for(var i = 0; i < selectorList.length; i++) {
        if(compareSelectors(selector, selectorList[i])) return true;
    }
    return false;
}

/** @function getDeclarationsForSelector
 * Gets the declarations for a particular css selector in the ast 
 * @param {string} selector - a css selector string 
 * @param {ast} ast - the css abstract syntax tree to find the declarations in
 * @returns {declarations[]} a list of css declaration objects
 */
function getDeclarationsForSelector(selector, ast) {
    var rules = [];
    var declarations = [];
    if(ast.type === 'stylesheet') rules = ast.stylesheet.rules;
    // TODO: Handle other types of AST
    rules.forEach(rule => {
        if(selectorInList(selector, rule.selectors)) {
            declarations = declarations.concat(rule.declarations);
        }
    });
    return declarations;
}

/** @function checkCSS 
 * Checks that the expected css ast is included in the actual css ast
 * @param {ast} expected - the expected css abstract syntax tree 
 * @param {ast} actual - the actual css abstract syntax tree
 * @returns {string[]} a list of html strings corresponding to missing css 
 */
function checkCSS(expected, actual) {
    var issues = [];
    // iterate through all expected rules
    expected.stylesheet.rules.forEach(rule => {
        // iterate through all expected selectors
        rule.selectors.forEach(selector => {
            const declarations = getDeclarationsForSelector(selector, actual);
            // iterate through all expected declarations
            rule.declarations.forEach(declaration => {
                if(!declarations.find(dec2 => compareDeclarations(declaration, dec2))) {
                    issues.push(`Expected to find a declaration <code>${declaration.property}: ${declaration.value}</code> for selector <code>${selector}</code>`);
                }
            });
        });
    });
    return issues;
}

/** @function loadCSS
 * Loads the css supplied as the filepath into a css ast object 
 * @param {string} filepath - the path to a css or html file, or a css string
 * @returns {ast} the css abstract syntax tree object
 */
function loadCSS(filepath) {  
    if(fs.existsSync(filepath)) {
        switch(path.extname(path)) {
            case '.css':
                return css.parse(fs.loadFileSync(filepath, {source: filepath}));
            case 'html':
            case 'htm':
                var style_content = "";
                var $ = cheerio.load(fs.loadFileSync(filepath));
                $("style").each(function(){
                    style_content += $(this).text();
                });
                // TODO: Load <link> element references
                return css.parse(style_content);
        }
    } else {
        // filepath may be a css string
        return css.parse(filepath);
    }
}

/** @function avowCSS
 * Checks that all the expected CSS declarations are applied to the 
 * corresponding selectors in the actual css, and returns a list of 
 * issues found.
 * @param {string} expected - the expected CSS content, as a filepath or css string 
 * @param {string} actual - the actual CSS content, as a filepath or css string
 * @returns {string[]} a list of html snippets corresponding to missing css
 */
function avowCSS(expected, actual) {
    return checkCSS(loadCSS(expected), loadCSS(actual));
}


module.exports = avowCSS;