var PATHS = global.PATHS;
var PATH_BUILD_BASE = PATHS.build.root || './build';
var pkg = require('../../../package.json');
var fs = require('fs');
var path = require('path');
var folders = require('./util-get-folders');
var del = require('del');
const gulp = require('gulp');
var sequence = require('gulp-sequence');
var replace = require('gulp-replace');
var rename = require('gulp-rename');
var readmeToMarkdown = require('gulp-readme-to-markdown');
var pathMoFiles = [
  path.join(PATH_BUILD_BASE, 'languages', '/*.mo'),
  path.join('!' + PATH_BUILD_BASE, 'languages', pkg.config.textdomain + '-*.mo' )
];

// @access public
gulp.task('release', sequence(
  '_release-replace-words',
  'release-lang',
  '_release-create-index',
  '_release-readme',
  '_release-assets'
));

// @access public
gulp.task('release-clean', function () {
  del.sync(PATHS.build.root + '/**');
});

// @access public
gulp.task('release-lang', ['_release-lang-mo_rename'], function () {
  del.sync(pathMoFiles);
});

// @access private
gulp.task('_release-lang-prepare', ['_release-replace-words'], sequence('grunt-lang'));

// @access private
gulp.task('_release-lang-mo_rename', ['_release-lang-prepare'], function () {
  return gulp.src(pathMoFiles)
    .pipe(rename({ prefix: pkg.config.textdomain + '-' }))
    .pipe(gulp.dest(path.join(PATH_BUILD_BASE, 'languages')));
});

// @access private
gulp.task('_release-readme', function() {
  gulp.src(PATHS.root + 'readme.txt')
    .pipe(gulp.dest(PATHS.build.root))
    .pipe(readmeToMarkdown(PLUGINS.readmeToMarkdown))
    // .pipe(gulp.dest(PATHS.src.root)) // let's use a different README on github
    .pipe(gulp.dest(PATHS.build.root));
});

// @access private
gulp.task('_release-assets', function() {
  var uiPath = '../ui/' + pkg.config.slug + '/';
  gulp.src([
    uiPath + 'banner.svg',
    uiPath + 'banner-*.png',
    uiPath + 'icon.svg',
    uiPath + 'icon-*.png',
    uiPath + 'screenshot-*.png',
    uiPath + 'screenshot-*.jpg'
  ])
  .pipe(gulp.dest(PATHS.build.root + '/assets/'));
});

/**
 * Replace words task
 *
 * @access public
 */
gulp.task('_release-replace-words', function () {
  var options = { skipBinary: true };
  var pkgConfigEndYear = (new Date().getFullYear() > pkg.config.startYear) ? new Date().getFullYear() : '';
  var tags = pkg.config.tags || [];
  return gulp.src([
      PATHS.build.root + '/**/*.*',
      '!' + PATHS.build.root + '/**/vendor/**.*'
    ], { base: PATHS.build.root })
    .pipe(replace('pkgVersion', pkg.version, options))
    .pipe(replace('pkgHomepage', pkg.homepage, options))
    .pipe(replace('pkgTitle', pkg.config.title, options))
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
    .pipe(gulp.dest(PATHS.build.root));
});

/**
 * Put an index file in each folder of the built project
 * without overriding a possible already existing one.
 *
 * {@link https://github.com/gulpjs/gulp/blob/master/docs/recipes/running-task-steps-per-folder.md}
 * {@link http://stackoverflow.com/a/30348965/1938970, source(if file exists)}
 */
gulp.task('_release-create-index', function () {
  var fileName = 'index.php';
  var fileContent = '<?php // Silence is golden';
  var indexPaths = [path.join(PATH_BUILD_BASE, fileName)];

  folders(PATH_BUILD_BASE).map(function (folder) {
    indexPaths.push(path.join(PATH_BUILD_BASE, folder, fileName));
  });

  indexPaths.forEach(function (filePath) {
    fs.stat(filePath, function (err) {
      if (err !== null) { // don't overwrite if file is there
        fs.writeFileSync(filePath, fileContent);
      }
    });
  });
});
