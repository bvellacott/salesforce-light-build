// This file exports a method for deploying a simple docOnly resource

var funnel = require('broccoli-funnel');
var zip = require('broccoli-zip-js');
var deploy = require('broccoli-salesforce-deploy');

function deployDocResource(resourceName, credentials, isProduction) {
	var resource = resourceName + '.resource';

	var zipped = zip(resource, { name: resourceName + '.zip' });
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

	return funnel(deployedResource, { destDir: resourceName + '.resource' });
}

module.exports = deployDocResource;
