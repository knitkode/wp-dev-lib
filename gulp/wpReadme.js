const paths = require('../paths');
const del = require('del');
const gulp = require('gulp');
const replace = require('gulp-replace');
const rename = require('gulp-rename');
const shell = require('gulp-shell');

/**
 * WordPress Readme task
 */
module.exports = function wpReadme (callback) {
  return gulp.series(
    wpReadmeCreate,
  )(callback);
}

/**
 * Create readme
 *
 * Parses the readme.txt file and outputs a `readme.md` in markdown using the
 * best generator.
 */
function wpReadmeCreate() {
  return gulp.src(paths.join(paths.ROOT, 'readme.txt'))
    .pipe(gulp.dest(paths.DIST))
    .pipe(shell([
      paths.join(paths.DEV_LIB, 'generators', './generate-markdown-readme')
    ], {
      cwd: paths.SRC
    }));
}
