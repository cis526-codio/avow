"use strict";

const avowCSS = require('./src/avow-css');
const avowHTML = require('./src/avow-html');
const formatIssues = require('./src/format-issues');

module.exports = {
    css: avowCSS,
    html: avowHTML,
    formatIssues: formatIssues
}