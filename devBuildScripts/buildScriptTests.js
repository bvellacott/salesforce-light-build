// This file exports a method which is used for compiling hand written and jshint tests into a test file qunit-tests.js.
// The test page is qunit-tests.html and the hand written tests should reside in qunit-tests.js

var funnel = require('broccoli-funnel');
var mergeNodes = require('broccoli-merge-trees');
var jsHint = require('broccoli-jshint');
var concat = require('broccoli-concat');

function buildTestsNode(scriptsDir) {
	var testPage = funnel(scriptsDir, { include: ['tests.html'] });
	var js = funnel(scriptsDir, { include: ['**/*.js'], exclude: ['**/tests.js', '**/*-tests.js', 'lib/**/*'] });
	var jsAndJshintrc = mergeNodes([ js, funnel('.', { include: [ '.jshintrc' ] }) ]);
	var qunitTests = funnel(scriptsDir, { include: ['tests.js', '**/*-tests.js'] });
	var jsHintTests = jsHint(jsAndJshintrc);
	qunitTests = mergeNodes([qunitTests, jsHintTests]);

	qunitTests = concat(qunitTests, {
	  outputFile: 'tests.js',
	  // header: "require(['test_deps/qunit'], function(QUnit) {\n",
	  inputFiles: ['**/*.js'],
	  // footer: "});",
	  sourceMapConfig: { enabled: true },
	  allowNone: true // defaults to false, and will error if trying to concat but no files are found.
	});

	return mergeNodes([testPage, qunitTests]);
}

function buildScriptTests(resourceName) {
	var resourceDir = './' + resourceName + '.resource';
	var targetScriptsDir = '.';
	var scriptsDir = resourceDir + '/' + targetScriptsDir;

	var testsNode = funnel(buildTestsNode(scriptsDir), { destDir: targetScriptsDir });
	return testsNode;
}

module.exports = buildScriptTests;