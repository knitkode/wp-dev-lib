const paths = require('../paths');
const gulp = require('gulp');
const pkg = require(paths.join(paths.ROOT, 'package.json'));
const shell = require('gulp-shell');

/**
 * WordPress Tag Version task
 *
 * Git tag with current version
 */
module.exports = function wpTagVersion (callback) {
  return gulp.src(paths.ROOT)
    .pipe(shell([
    	`git checkout master`,
      `git tag ${pkg.version} master`,
      `git push origin ${pkg.version}`,
      `git checkout develop`,
    ], {
      cwd: paths.ROOT
    }));
}
