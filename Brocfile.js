/**
*		See the documentation for the broccoli build tool at https://github.com/broccolijs/broccoli
*/


// this deploymmentConfig object is a simple configuration for the build process see details of it in jREADME.md at the root of
// this project.
//
// add description options for page and resource
// 
// All BR resources - javascript, css, jquery, ag-grids, font-awesome etc
var deploymentConfig = {
	Example: {
		pageName: 'Example'
	},
};

// Browser sync will refresh the browser whenever you save a file
var addBrowserSync = require('./devBuildScripts/addBrowserSync.js');

// The script to deploy all resources and pages
var buildAndDeployResourceAndPages = require('./devBuildScripts/buildAndDeployResourceAndPages.js');


var mergeNodes = require('broccoli-merge-trees');

// Set the log level for the salesforce deployment tool
var deploy = require('broccoli-salesforce-deploy');
deploy.setLogLevel('info');

// get the credentials from the sfCredentials.json file that should reside in the root of this project
var credentials = require('./sfCredentials.json');

// read the environment variable BROCCOLI_ENV to determine whether the build is taking place for production or live development
var isProduction = process.env.BROCCOLI_ENV === 'production';

var all = buildAndDeployResourceAndPages(deploymentConfig, credentials, isProduction);

// Only run browser sync if we are running this build script for live development and we want to refresh the browser quickly
if(!isProduction)
	all = mergeNodes([all, addBrowserSync(all)]);

module.exports = all;