const avow = require('../index');

const issues = avow.css('/* comments */ .foo {color: red}', '');
console.log(issues);