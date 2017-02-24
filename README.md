# Salesforce light build - for static resources and classic pages

#### Setting up

Clone this project and run:

```bash
npm install
```

If you are used to using resource-bundles with mavensmate, you might want to checkout this project into the resource-bundles directory of your mavensmate project. This way you have a choice of deploying resources using mavensmate or this tool.

#### Usage
Create a file called *sfCredentials.json*, in the following format:

```json
{
	"loginUrl": "https://test.salesforce.com",
	"username": "someone@somewhere.com",
	"password": "p4ssword",
	"securityToken": "tsxzgqrw34jl6"
}
```

Save the file and execute:

```bash 
npm start
```
Now when you make changes to the resources you're working on, the build tool will automatically deploy the resource and page to the org. Try it out by making a change to an *index.page* file in one of the *.resource* directories. When you've saved the change you should see some logging information appear in the terminal window where you started the tool, explaining that the page has been deployed. Also if you make a change in one of the javascript files and save it you should see the resource deployed.

You can stop the build tool by going into the terminal window where it's running and pressing **crtl+c**.

The index.page contains the markup for the visualforce page that the resource is being referenced in. Looking at *Brocfile.js* you will see a small configuration object at the top with the names of the resources in it. If a resource is configured with a *pageName* variable, the index.page will be deployed to the org with that name. Otherwise the tool won't try and deploy the page. By default the directory and file structure is expected to be as it is in *Example.resource* and the tool will attempt to setup test files etc..., but if the configuration for a resource has a setting *docOnly: true*, the static resource will be regarded as 'purely' static and simply deployed to salesforce on change.

If you now go to the address http://localhost:3000 you will see the same resource directory structure. Navigating into [Example.resource/tests.html](http://localhost:3000/Example.resource/tests.html), you'll see a page displaying test results. There are two types of tests that you'll see appear there: **jshint** code quality validation ones and then ones written by you in the *tests.js* file. Edit *Example.resource/tests.js* by adding

```js
alert('a quick hello');
```
and save the file and you'll see your browser automatically refresh and throw the alert.

If you want to build minified versions of the package i.e. for production. Execute:

```bash
npm run build
```
and you'll see a *dist* directory appear with again the same directory structure with the zipped resources in the .resource directories.

When developing with the ``` npm start ``` command, if you want to create a new resource, you can do so by copying one of the .resource directories that you want to effectively 'branch', adding a configuration for it at the top of *Brocfile.js* and restaring the build tool. 

The build tool will generate a cache file called *sfConnection.cache* in the root of the project. If you get issues with connecting to the org, you might want to delete the cache file and try again.

When developing the *index.page*, if you're using Sublime text and you have set it up with MavensMate, you'll want to use the syntax highlighter at *View>Syntax>MavensMate>Visualforce* in the *Sublime text* menu.


