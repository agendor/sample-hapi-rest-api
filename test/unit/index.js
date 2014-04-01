"use strict";

var walkDir = require('src/util/walk-dir.js');
var packageJson = require('package.json');

require('blanket')({
	// Only files that match the pattern will be instrumented
	pattern: packageJson.config.blanket.pattern
});


// Loop through all paths in the blanket pattern
var dir = process.cwd() + '/src';
walkDir(dir, function (err, path) {
	if (err) {
		console.log('error: '+err);
		return;
	}
	require(path);
});