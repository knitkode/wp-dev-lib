/* global gulp, $ */
/* jshint node: true */
'use strict';

// @access public
gulp.task('default', ['build', 'watch']);

// @access public
gulp.task('dist', $.shell(['gulp build --dist']));

// @access public
gulp.task('all',  $.sequence([
  'release-clean',
  'dist',
  'release-prepare',
  'release-lang',
  'deploy',
  'zip'
]));
