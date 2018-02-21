const paths = require('../paths');
const pkg = require(paths.join(paths.ROOT, 'package.json'));
const fs = require('fs');
const folders = require('../utils/get-folders');
const gulp = require('gulp');
const replace = require('gulp-replace');
const wpLang = require('./wpLang');
const wpReadme = require('./wpReadme');
const wpZip = require('./wpZip');

module.exports = function wpRelease (callback) {
  return gulp.series(
    wpReleaseReplaceWords,
    wpLang,
    // gulp.parallel(
      wpReadme,
      wpIndexFiles,
      wpReleaseAssets,
    // )
    wpZip,
  )(callback);
}

function wpReleaseReplaceWords () {
  var options = { skipBinary: true };
  var pkgConfigEndYear = (new Date().getFullYear() > pkg.config.startYear) ? new Date().getFullYear() : '';
  var tags = pkg.config.tags || [];

  return gulp.src([
      paths.join(paths.DIST, '/**/*.*'),
      '!' + paths.join(paths.DIST, '/**/vendor/**.*'),
    ], { base: paths.DIST })
    .pipe(replace('pkgVersion', pkg.version, options))
    .pipe(replace('pkgHomepage', pkg.homepage, options))
    .pipe(replace('pkgNamePretty', pkg.config.namePretty, options))
    .pipe(replace('pkgNameShort', pkg.config.nameShort, options))
    .pipe(replace('pkgSlug', pkg.config.slug, options))
    .pipe(replace('pkgName', pkg.name, options))
    .pipe(replace('pkgDescription', pkg.description, options))
    .pipe(replace('pkgAuthorName', pkg.author.name, options))
    .pipe(replace('pkgAuthorEmail', pkg.author.email, options))
    .pipe(replace('pkgAuthorUrl', pkg.author.url, options))
    .pipe(replace('pkgLicense', pkg.license, options))
    .pipe(replace('pkgLicenseType', pkg.license.type, options))
    .pipe(replace('pkgLicenseUrl', pkg.license.url, options))
    .pipe(replace('pkgTags', tags.join(', '), options))
    .pipe(replace('pkgTextdomain', pkg.config.textdomain, options))
    .pipe(replace('pkgStartYear', pkg.config.startYear, options))
    .pipe(replace('pkgEndYear', pkgConfigEndYear, options))
    // delete all code annotations, regex matches: ' // @@ ....single/multi line content \\
    .pipe(replace(/(\s?\/\/\s@@(?:(?!\\\\)[\s\S])*\s\\\\)/g, '', options))
    .pipe(gulp.dest(paths.DIST));
}

/**
 * Put an index file in each folder of the built project
 * without overriding a possible already existing one.
 *
 * {@link https://github.com/gulpjs/gulp/blob/master/docs/recipes/running-task-steps-per-folder.md}
 * {@link http://stackoverflow.com/a/30348965/1938970, source(if file exists)}
 */
function wpIndexFiles () {
  var fileName = 'index.php';
  var fileContent = '<?php // Silence is golden';
  var indexPaths = [paths.join(paths.DIST, fileName)];

  folders(paths.DIST).map(function (folder) {
    indexPaths.push(paths.join(paths.DIST, folder, fileName));
  });

  indexPaths.forEach(function (filePath) {
    fs.stat(filePath, function (err) {
      if (err !== null) { // don't overwrite if file is there
        fs.writeFileSync(filePath, fileContent);
      }
    });
  });
  return gulp.src('*.dummmmy').pipe(gulp.dest(paths.DIST));
}

function wpReleaseAssets() {
  const uiPath = paths.join(paths.ROOT, pkg.config.paths.wpAssets);
  return gulp.src([
    paths.join(uiPath, 'banner*.svg'),
    // paths.join(uiPath, 'banner-*.png'),
    paths.join(uiPath, 'icon*.svg'),
    // paths.join(uiPath, 'icon-*.png'),
    paths.join(uiPath, 'screenshot-*.png'),
    paths.join(uiPath, 'screenshot-*.jpg'),
  ])
  .pipe(gulp.dest(paths.join(paths.DIST, '/assets/')));
}
