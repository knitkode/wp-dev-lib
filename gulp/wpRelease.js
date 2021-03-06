const paths = require('../paths');
const pkg = require(paths.join(paths.ROOT, 'package.json'));
const fs = require('fs');
const folders = require('../utils/get-folders');
const gulp = require('gulp');
const del = require('del');
const replace = require('gulp-replace');
const wpLang = require('./wpLang');
const wpReadme = require('./wpReadme');
const wpZip = require('./wpZip');

/**
 * WordPress release task
 *
 * First replace words, then create language, readme and empty missing
 * index.php files, prepare the standard assets for WordPress.org and finally
 * create a distributable zip.
 */
module.exports = function wpRelease (callback) {
  return gulp.series(
    wpReplaceWords,
    wpLang,
    wpIndexFiles,
    wpZip,
    wpReadme,
  )(callback);
}

/**
 * Replace words before release
 *
 * Substitute `pkg...` text placeholders with data from package.json
 * and strip out private annotations (which must follow a strict convention)
 */
function wpReplaceWords () {
  const options = { skipBinary: true };
  const pkgConfigEndYear = (new Date().getFullYear() > pkg.config.startYear) ? new Date().getFullYear() : '';
  const tags = pkg.config.tags || [];

  return gulp.src([
      paths.join(paths.DIST, '/**/*.*'),
      '!' + paths.join(paths.DIST, '/**/vendor/**.*'),
    ], { base: paths.DIST })
    .pipe(replace('pkgName', pkg.name, options))
    .pipe(replace('pkgVersion', pkg.version, options))
    .pipe(replace('pkgDescription', pkg.description, options))
    .pipe(replace('pkgTitle', pkg.config.title, options))
    .pipe(replace('pkgSlug', pkg.config.slug, options))
    .pipe(replace('pkgShortname', pkg.config.shortname, options))
    .pipe(replace('pkgHomepage', pkg.homepage, options))
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
 * Put an index.php file in each folder of the built project without overriding
 * a possible already existing one.
 *
 * {@link https://git.io/vAu5v}
 * {@link http://stackoverflow.com/a/30348965/1938970, source(if file exists)}
 */
function wpIndexFiles () {
  const fileName = 'index.php';
  const fileContent = '<?php // Silence is golden';
  const indexPaths = [paths.join(paths.DIST, fileName)];

  folders(paths.DIST).map(function (folder) {
    indexPaths.push(paths.join(paths.DIST, folder, fileName));
  });

  indexPaths.forEach(function (filePath) {
    fs.stat(filePath, function (err) {
      // don't overwrite if file is there
      if (err !== null) {
        fs.writeFileSync(filePath, fileContent);
      }
    });
  });
  return gulp.src('*.dummmmy').pipe(gulp.dest(paths.DIST));
}
