const paths = require('../paths');
const pkg = require(paths.join(paths.ROOT, 'package.json'));
const gulp = require('gulp');
const del = require('del');
const ghPages = require('gh-pages');
const extend = require('extend');
const rename = require('gulp-rename');

/**
 * WordPress Deploy task
 *
 * It deploys to github page including the right `README.md` file
 */
module.exports = function wpDeploy (callback) {
  return gulp.series(
    wpDeployCopyReadme,
    wpDeployDistributableSource,
    wpDeployCleanReadme,
    wpAssetsBeforePublish,
    wpAssetsBeforePublishClean,
  )(callback);
}

/**
 * Copy readme
 *
 * It copies the just autogenerated readme.md file to the dist folder renaming
 * it to uppercase. This will be deployed to the dist branch `master` for
 * readiblity on github or gitlab but it will later be removed from the
 * distributable zip.
 */
function wpDeployCopyReadme() {
  return gulp.src(paths.join(paths.ROOT, 'readme.md'))
    .pipe(rename('README.md'))
    .pipe(gulp.dest(paths.DIST));
}

/**
 * Deploy distributable source
 *
 * Deploys the distributable source to a public or a private repo, by default
 * to the `master` branch of the GitHbu project's repo
 */
function wpDeployDistributableSource (callback) {
  return ghPages.publish(paths.DIST, extend({
    remote: 'origin',
    branch: 'master',
  }, pkg.config.deployGithub || {}), callback);
}

/**
 * Clan readme
 *
 * It deletes the just autogenerated readme.md file from the root folder, over
 * there we already have the README.md file which is the one targeting the
 * `develop` branch.
 */
function wpDeployCleanReadme() {
  return del([
      paths.join(paths.ROOT, 'readme.md',
        paths.join(paths.DIST, 'README.md'
    ]), { force: true });
}

/**
 * Copy assets for WordPress publish
 *
 * Grabs the banners, icons and screenshot from the `wpAssets` path indicated
 * in the project's package.json and copy them to the dist folder.
 */
function wpAssetsBeforePublish() {
  const uiPath = paths.join(paths.ROOT, pkg.config.paths.wpAssets);
  return gulp.src([
    // '!' + paths.join(uiPath, '_*.svg'),
    // '!' + paths.join(uiPath, '.dev.svg'),
    // paths.join(uiPath, 'banner.svg'),
    paths.join(uiPath, 'banner-772x250.png'),
    paths.join(uiPath, 'banner-1544x500.png'),
    paths.join(uiPath, 'icon.svg'),
    paths.join(uiPath, 'icon-128x128.png'),
    paths.join(uiPath, 'icon-256x256.png'),
    paths.join(uiPath, 'screenshot-*.png'),
    paths.join(uiPath, 'screenshot-*.jpg'),
  ])
  .pipe(gulp.dest(paths.dist.assets));
}

/**
 * Clean private assets for WordPress publish
 *
 * This is needed just because the negation path in the above task does not work
 */
function wpAssetsBeforePublishClean() {
  return del([
    paths.join(paths.dist.assets, '**/_*.svg'),
    paths.join(paths.dist.assets, '**/*.dev.svg'),
    paths.join(paths.dist.assets, '**/_*.png'),
    paths.join(paths.dist.assets, '**/*.dev.png'),
  ], { force: true });
}
