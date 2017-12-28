const gulp = require('gulp');
const sequence = require('gulp-sequence');

// @access public
gulp.task('all', sequence(
  '_all-set-dist',
  'release-clean',
  'build',
  'release',
  'deploy',
  'zip'
));

// @access private
gulp.task('_all-set-dist', function (callback) {
  global.CONFIG.isDist = true;
  callback();
});
