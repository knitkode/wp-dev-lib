/* global gulp, $ */
/* jshint node: true */
'use strict';

// @access public
gulp.task('default', ['build', 'watch']);

// @access public
// gulp.task('all',  $.shell.task([
//   'gulp release-clean',
//   'gulp build --dist',
//   'gulp release-prepare',
//   'gulp release-lang',
//   'gulp deploy',
//   'gulp zip'
// ]));

gulp.task('all', $.sequence.task(['_all-pre', '_all-post']);
gulp.task('_all-pre', $.shell.task(['gulp release-clean', 'gulp build --dist']);
gulp.task('_all-post', ['_all-pre'], $.sequence.task([
  'release-prepare',
  'release-lang',
  'deploy',
  'zip'
]);