const avow = require('../index');

const issues = avow.css('/* comments */ .foo {color: red}', '');
console.log(issues);

const issues2 = avow.css('/* comments */ .foo {color: red}', 'test/foo.css');
console.log(issues2);