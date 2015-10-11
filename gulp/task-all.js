/* global gulp, $ */
/* jshint node: true */
'use strict';

// @access public
gulp.task('all', $.sequence(
  '_all-set-dist',
  'release-clean',
  'build',
  'release',
  'deploy',
  'zip'
));

// @access private
gulp.task('_all-set-dist', function (cb) {
  global.CONFIG.isDist = true;
  cb();
});
