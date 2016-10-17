'use strict';
const testRunner = require('vscode/lib/testrunner');

testRunner.configure({
	ui: 'tdd',
	useColors: true,
	timeout: 5000
});

module.exports = testRunner;
