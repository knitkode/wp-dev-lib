const PATHS = global.PATHS;
const pkg = require('../../../package.json');
const gulp = require('gulp');
const ghPages = require('gh-pages');
const extend = require('extend');

// @access public
gulp.task('deploy', ['_deploy-github']);

// @access private
gulp.task('_deploy-github', function (callback) {
  return ghPages.publish(PATHS.build.root, extend({
    remote: 'github'
  }, pkg.config.deployGithub || {}), callback);
});
