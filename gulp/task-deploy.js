/* global gulp, $ */
/* jshint node: true */
'use strict';

var PATHS = global.PATHS;
var pkg = require('../../../package.json');
const ghPages = require('gh-pages');
const extend = require('extend');

// @access public
gulp.task('deploy', ['_deploy-github']);

// @access private
gulp.task('_deploy-github', function () {
  return ghPages.publish(PATHS.build.root, extend({
    remote: 'github'
  }, pkg.config.deployGithub || {}), callback);
});
