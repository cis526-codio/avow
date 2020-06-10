"use strict";

const avowCSS = require('./src/avow-css');
//const avowHTML = require('./src/avow-html');
const formatIssues = require('./src/format-list');
const pass = require('./src/pass');
const fail = require('./src/fail');

module.exports = {
    css: avowCSS,
    /* html: avowHTML, dependency issues with phantomjs */
    pass: pass,
    fail: fail
}