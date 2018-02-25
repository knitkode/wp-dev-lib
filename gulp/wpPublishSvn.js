const paths = require('../paths');
const gulp = require('gulp');
const pkg = require(paths.join(paths.ROOT, 'package.json'));
const shell = require('gulp-shell');

/**
 * WordPress Publish task
 *
 * Uses grunt to publish to SVN WordPress.org repo
 */
module.exports = function wpPublishSvn (callback) {
  return gulp.src(paths.ROOT)
    .pipe(shell([
      'grunt publish',
    ], {
      cwd: paths.CONFIG
    }));
}
