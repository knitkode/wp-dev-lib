/* global gulp, $ */
/* jshint node: true */
'use strict';

// @access public
gulp.task('deploy', ['_deploy-github']);

// @access private
gulp.task('_deploy-github', function () {
  return require('gh-pages').publish('build', {
    branch: 'production',
    remote: 'github'
  });
});
