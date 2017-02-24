// This file exports a method that you can use to add browser sync to any given broccoli node. When you then make a change to a file
// that you are developing on, browser sync will automatically refresh the browser 

var BrowserSync = require('broccoli-browser-sync-bv');
var proxy = require('http-proxy-middleware');

var bsOptions;

function addBrowserSync(node) {
  if(!bsOptions) {
    bsOptions = {
      browserSync: {
        open: false,
        middleware: [
          proxy('/api/**', {
            target: 'http://localhost:8080/',
            pathRewrite: {
              '^/api': ''
            }
          }),
          proxy('/live', {
            target: 'http://localhost:8080/',
            pathRewrite: {
              '^/live': ''
            },
            ws: true})
        ]
      }
    };
  }

	return new BrowserSync([node], bsOptions);
}

module.exports = addBrowserSync;