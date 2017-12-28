/* global gulp, $ */
/* jshint node: true */
'use strict';

var pkg = require('../../../package.json');
var del = require('del');
var sequence = require('gulp-sequence');

// @access public
gulp.task('zip', sequence('_zip-preclean', ['_zip-archive', '_zip-last']));


// @access private
gulp.task('_zip-preclean', function () {
 del.sync(PATHS.build.root + '/*.md');
});

// @access private
gulp.task('_zip-archive', function () {
  return gulp.src('./build/**/*')
    .pipe($.zip(pkg.config.slug + '--' + pkg.version + '.zip'))
    .pipe(gulp.dest('../roots/.publish/releases/archive'));
});

// @access private
gulp.task('_zip-last', function () {
  return gulp.src('./build/**/*')
    .pipe($.zip(pkg.config.slug + '.zip'))
    .pipe(gulp.dest('../roots/.publish/releases'));
});
