const paths = require('../paths');
const del = require('del');
const gulp = require('gulp');
const replace = require('gulp-replace');
const rename = require('gulp-rename');
const shell = require('gulp-shell');

module.exports = function wpReadme (callback) {
  return gulp.series(
    wpReadmeCreate,
    wpReadmeCopy
    // wpReadmeClean // @@todo @@tofix
  )(callback);
}

function wpReadmeCreate() {
  return gulp.src(paths.join(paths.ROOT, 'readme.txt'))
    .pipe(gulp.dest(paths.DIST))
    .pipe(shell([
      paths.join(paths.DEV_LIB, 'generators', './generate-markdown-readme')
    ], {
      cwd: paths.SRC
    }))
    // .pipe(gulp.dest(paths.SRC)) // let's use a different README on github
    .pipe(gulp.dest(paths.DIST));
}

function wpReadmeCopy() {
  return gulp.src(paths.join(paths.ROOT, 'readme.md'))
    .pipe(rename('README.md'))
    .pipe(gulp.dest(paths.DIST));
}

function wpReadmeClean(callback) {
  return del(paths.join(paths.ROOT, 'readme.md'), { force: true }).then(callback);
}
