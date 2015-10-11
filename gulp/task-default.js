/* global gulp, $ */
/* jshint node: true */
'use strict';

// @access public
gulp.task('default', ['build', 'watch']);

// @access public
gulp.task('all',  $.sequence([
  'gulp release-clean',
  'gulp build --dist',
  'gulp release-prepare',
  'gulp release-lang',
  'gulp deploy',
  'gulp zip'
]);
