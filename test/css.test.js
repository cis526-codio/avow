const avow = require('../index');

const issues = avow.css('.foo {color: red}', '');
console.log(issues);