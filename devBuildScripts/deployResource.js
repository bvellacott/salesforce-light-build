// This file exports a method that is used to deploy a 'live' resource with an expected directory structure. See the
// expected directory structure and its meaning in the README.md file at the root of this project.

var funnel = require('broccoli-funnel');
var zip = require('broccoli-zip-js');
var deploy = require('broccoli-salesforce-deploy');
var buildScriptTests = require('./buildScriptTests');
var mergeNodes = require('broccoli-merge-trees');
var uglify = require('broccoli-uglify-sourcemap');

function deployResource(resourceName, credentials, isProduction) {
	var resource = funnel(resourceName + '.resource', {
		exclude: [
		 	'**/tests.js',
		 	'**/tests.html',
		 	'**/.DS_Store',
		 	'**/*.page',
			'**/.git',
			'**/.gitignore',
		]
	});

	var scriptTests = buildScriptTests(resourceName);

	if(isProduction) {
		var uglifyOptions = {
			mangle: true, 
			compress: true, 
			sourceMapConfig: {
				enabled: !isProduction 
			} 
		};
		
		resource = uglify(resource, uglifyOptions);
	}

	var zipped = zip(resource, { name: resourceName + '.zip' });
	// var deployedResource = zipped;
	var deployedResource = deploy(zipped, {
		apiVersion: '37.0',
		file: resourceName + '.zip',
		type: 'StaticResource',
		skipFirstBuild: !isProduction,
		loginUrl: credentials.loginUrl,
		username: credentials.username,
		password: credentials.password,
		securityToken: credentials.securityToken
	});

	resource = mergeNodes([resource, scriptTests]);

	return funnel(mergeNodes([resource, deployedResource ]), { destDir: resourceName + '.resource' });
}

module.exports = deployResource;
