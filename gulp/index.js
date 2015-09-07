var fs = require('fs');
var onlyScriptsTasks = require('./util-script-filter');
var tasks = fs.readdirSync('./config/gulp/').filter(onlyScriptsTasks);

// These variables are intentionally global,
// otherwise we had to redefine them in every single task
gulp = require('gulp');
$ = require('gulp-load-plugins')();
CONFIG = require('./config');
PLUGINS = require('./plugins');

// require each .js file in the config/gulp folder
tasks.forEach(function (task) {
  require('./' + task);
});
