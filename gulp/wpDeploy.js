const paths = require('../paths');
const pkg = require(paths.join(paths.ROOT, 'package.json'));
const gulp = require('gulp');
const ghPages = require('gh-pages');
const extend = require('extend');

/**
 * WordPress Deploy task
 *
 * It deploys to github page including the right `README.md` file
 */
module.exports = function wpDeploy (callback) {
  return gulp.series(
    // wpDeployCopyReadme,
    wpDeployGithubMaster,
    // wpDeployCleanReadme,
  )(callback);
}

// function wpDeployCopyReadme (callback) {
//   return gulp.src(paths.join(paths.SRC, 'readme.md'))
//     .pipe(gulp.dest(paths.DIST));
// }

function wpDeployGithubMaster (callback) {
  return ghPages.publish(paths.DIST, extend({
    remote: 'github',
    branch: 'master',
  }, pkg.config.deployGithub || {}), callback);
}

// function wpDeployCleanReadme () {
//   return del([
//   	paths.join(paths.SRC, 'readme.md')
//   	paths.join(paths.DIST, '*.md')
//   ]);
// }
