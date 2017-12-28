var fs = require('fs');
var onlyScriptsTasks = require('./util-script-filter');
var tasksCommon = fs.readdirSync('./config/common/gulp/').filter(onlyScriptsTasks);
var tasks = fs.readdirSync('./config/gulp/').filter(onlyScriptsTasks);

// These variables are intentionally global,
// otherwise we had to redefine them in every single task
global.$ = require('gulp-load-plugins')();
global.CONFIG = require('./config');
global.PLUGINS = require('./plugins');

// require each .js file in the config/common/gulp folder
tasksCommon.forEach(function (task) {
  require('./' + task);
});

// require each .js file in the config/gulp folder
tasks.forEach(function (task) {
  require('../../gulp/' + task);
});
