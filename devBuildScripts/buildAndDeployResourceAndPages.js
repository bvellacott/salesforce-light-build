// This file exports a method to deploy all resources and pages that you have defined in the deploymentConfig located at the
// top of Brocfile.js. There are two types of resources: docOnly and 'live'. 'Live' being one that has an expected directory 
// structure containing javascript, html and css and docOnly being just a container for static files. A 'live' resource can
// contain a visualforce page definition in a file: index.page and the name for the page as it should appear in the org should
// be defined in the deploymentConfig.

var funnel = require('broccoli-funnel');
var zip = require('broccoli-zip-js');
var deploy = require('broccoli-salesforce-deploy');
var mergeNodes = require('broccoli-merge-trees');

var deployResource = require('./deployResource');
var deployDocResource = require('./deployDocResource');
var deployPage = require('./deployPage');

function deployResourcesAndPages(deploymentConfig, credentials, isProduction) {
	var testDependenciesDir = './testDeps';
	var allNodes = [];

	allNodes.push(funnel(testDependenciesDir, { destDir: testDependenciesDir }))	

	for(var resourceName in deploymentConfig) {
		var config = deploymentConfig[resourceName];
		var pageName = config.pageName; 
		if(config.docOnly) {
			var docResourceNode = deployDocResource(resourceName, credentials, isProduction);
			allNodes.push(docResourceNode);
		}
		else {
			var resourceNode = deployResource(resourceName, credentials, isProduction);
			allNodes.push(resourceNode);
			if(pageName) {
				var pageNode = deployPage(resourceName, pageName, credentials, isProduction);
				pageNode = funnel(pageNode, { destDir: resourceName });
				allNodes.push(pageNode);
			}
		}
	}

	return mergeNodes(allNodes);
}

module.exports = deployResourcesAndPages;