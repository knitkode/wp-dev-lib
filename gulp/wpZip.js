const paths = require('../paths');
const pkg = require(paths.join(paths.ROOT, 'package.json'));
const del = require('del');
const gulp = require('gulp');
const zip = require('gulp-zip');

module.exports = function wpZip (callback) {
  return gulp.series(
    wpZipPreClean,
    wpZipArchive,
    wpZipLastRelease,
  )(callback);
}

function wpZipPreClean () {
	del.sync(PATHS.build.root + '/*.md');
}

function wpZipArchive () {
	const zipLocation = paths.join(paths.ROOT, pkg.config.paths.wpZip);
  return gulp.src(paths.join(paths.DIST, '/**/*'))
    .pipe(zip(pkg.config.slug + '--' + pkg.version + '.zip'))
    .pipe(gulp.dest(paths.join(zipLocation, 'archive'));
}

function wpZipLastRelease () {
	const zipLocation = paths.join(paths.ROOT, pkg.config.paths.wpZip);
  return gulp.src(paths.join(paths.DIST, '/**/*'))
    .pipe(zip(pkg.config.slug + '.zip'))
    .pipe(gulp.dest(zipLocation);
}
