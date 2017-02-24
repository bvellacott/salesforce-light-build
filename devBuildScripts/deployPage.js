// This file exports a method that will deploy a visualforce page to salesforce. The page file must be called 'index.page'
// and the page name, as it will appear in the org, is passed as a method parameter.

var funnel = require('broccoli-funnel');
var fs = require('fs');
var deploy = require('broccoli-salesforce-deploy');
var path = require('path');

function deployPage(resourceName, pageFileName, credentials, isProduction) {
	// var deployedPage = resourceName + '.resource';
	var deployedPage = deploy(resourceName + '.resource', {
		skipFirstBuild: !isProduction,
		type: 'ApexPage',
		apiVersion: '37.0',
		file: 'index.page',
		name: path.basename(pageFileName),
		loginUrl: credentials.loginUrl,
		username: credentials.username,
		password: credentials.password,
		securityToken: credentials.securityToken
	});

	return deployedPage;
}

module.exports = deployPage;