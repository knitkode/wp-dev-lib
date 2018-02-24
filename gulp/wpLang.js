const paths = require('../paths');
const pkg = require(paths.join(paths.ROOT, 'package.json'));
const gulp = require('gulp');
// const wpPot = require('gulp-wp-pot');
// const wpi18n = require('node-wp-i18n');
// const through = require('through2');
// const checktextdomain = require('gulp-checktextdomain');
// const potomo = require('gulp-potomo');

module.exports = function wpLang (callback) {
  return gulp.series(
    wpLangAddTextDomain,
    wpLangMakePot,
    wpLangPotomo
    // wpLangMoRename
  )(callback);
}

function wpLangAddTextDomain () {
  let files = [];

  return gulp.src([
    paths.join(paths.dist.php, '**/*.php'),
    paths.join(paths.DIST, '*.php')
  ])
    .pipe(require('through2').obj(function (file, enc, cb) {
      files.push(file.path);
      cb(null, file);
    }, function(cb){
      require('node-wp-i18n').addtextdomain(files, {
        textdomain: pkg.config.textdomain,
      });
      cb();
    }));
}

function wpLangCheckTextDomain () {
  return gulp.src([
      paths.join(paths.dist.php, '**/*.php'),
      paths.join(paths.DIST, '*.php')
    ])
    .pipe(require('gulp-checktextdomain')({
      text_domain: pkg.config.textdomain,
      keywords: [
        '__:1,2d',
        '_e:1,2d',
        '_x:1,2c,3d',
        'esc_html__:1,2d',
        'esc_html_e:1,2d',
        'esc_html_x:1,2c,3d',
        'esc_attr__:1,2d',
        'esc_attr_e:1,2d',
        'esc_attr_x:1,2c,3d',
        '_ex:1,2c,3d',
        '_n:1,2,4d',
        '_nx:1,2,4c,5d',
        '_n_noop:1,2,3d',
        '_nx_noop:1,2,3c,4d'
      ],
    }));
}

function wpLangMakePot () {
  return gulp.src([
      paths.join(paths.dist.php, '**/*.php'),
      paths.join(paths.DIST, '*.php')
    ])
    .pipe(require('gulp-wp-pot')({
      bugReport: pkg.bugs.url,// {string} undefined; Header with URL for reporting translation bugs
      // commentKeyword: // {string} 'translators'; Description: Keyword to trigger translator comment.
      domain: pkg.config.textdomain, // {string} undefined; Domain to retrieve the translated text. All textdomains is included if undefined.
      // headers: // {object|bool} Headers used by Poedit; Description: Object containing extra POT-file headers. Set to false to not generate the default extra headers for Poedit.
      // gettextFunctions: // {object} WordPress translation functions; Gettext functions used for finding translations.
      // lastTranslator: // {string} undefined; Name and email address of the last translator (ex: John Doe <me@example.com>)
      // metadataFile // {string}; Path to file containing plugin/theme metadata header relative to relativeTo
      package: pkg.config.slug, // {string} domain or unnamed project if domain is undefined; Package name
      relativeTo: paths.DIST // {string} Current working directory; Path to folder that file comments should be relative to
      // team: //{string} undefined; Name and email address of the translation team (ex: Team <team@example.com>)
    }))
    .pipe(gulp.dest(paths.join(paths.dist.languages, `${pkg.config.textdomain}.pot`)));
}

function wpLangPotomo () {
  return gulp.src(paths.join(paths.dist.languages, '*.po'))
    .pipe(require('gulp-potomo')({ poDel: true }))
    .pipe(gulp.dest(paths.join(paths.dist.languages)));
}

// function wpLangMoRename () {
//   return gulp.src([
//       paths.join(paths.dist.languages, '*.mo'),
//       paths.join('!' + paths.dist.languages, pkg.config.textdomain + '-*.mo' )
//     ])
//     .pipe(rename({ prefix: pkg.config.textdomain + '-' }))
//     .pipe(gulp.dest(paths.dist.languages));
// }
