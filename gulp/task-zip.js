/* global gulp, $ */
/* jshint node: true */
'use strict';

var pkg = require('../../../package.json');

// @access public
gulp.task('zip', ['_zip-archive', '_zip-last']);

// @access private
gulp.task('_zip-archive', ['_deploy-copy_basic_files'], function () {
  return gulp.src('./build/**/*')
    .pipe($.zip(pkg.name + '--' + pkg.version + '.zip'))
    .pipe(gulp.dest('../roots/releases/archive'));
});

// @access private
gulp.task('_zip-last', function () {
  return gulp.src('./build/**/*')
    .pipe($.zip(pkg.name + '.zip'))
    .pipe(gulp.dest('../roots/releases'));
});
