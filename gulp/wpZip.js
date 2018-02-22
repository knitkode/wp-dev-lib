const paths = require('../paths');
const pkg = require(paths.join(paths.ROOT, 'package.json'));
const del = require('del');
const gulp = require('gulp');
const zip = require('gulp-zip');
const zipDest = paths.join(paths.ROOT, pkg.config.paths.wpReleases);

/**
 * WordPress Zip task
 *
 * It creates the distributable zip
 */
module.exports = function wpZip (callback) {
  return gulp.series(
    wpZipClean,
    wpZipArchive,
    wpZipLastRelease,
  )(callback);
}

/**
 * Clean folder before zipping
 *
 * It removes the markdow readme files which were purely generated for
 * readibility on github or gitlab
 */
function wpZipClean () {
  return del(paths.join(paths.DIST, '*.md'), { force: true });
}

/**
 * Create zip for archive
 *
 * It crease a zip of the clean dist folder appending the current version
 * to the filename reading it from the package.json of the project. It places
 * the zip in the `archive` subfolder of the indicated `wpReleases` path to be
 * specified in the project's package.json
 */
function wpZipArchive () {
  return gulp.src(paths.join(paths.DIST, '/**/*'))
    .pipe(zip(pkg.config.slug + '--' + pkg.version + '.zip'))
    .pipe(gulp.dest(paths.join(zipDest, 'archive')));
}

/**
 * Create zip for last release
 *
 * It creates an additional zip of the dist folder simply naming the zip with
 * project's slug as indicated in the projects' package.json. It places
 * the zip in the `wpReleases` path to be specified in the same package.json
 */
function wpZipLastRelease () {
  return gulp.src(paths.join(paths.DIST, '/**/*'))
    .pipe(zip(pkg.config.slug + '.zip'))
    .pipe(gulp.dest(zipDest));
}
