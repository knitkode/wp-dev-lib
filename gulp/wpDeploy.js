const ghPages = require('gh-pages');
const extend = require('extend');

module.exports = function deployGithub (callback) {
  return ghPages.publish(paths.DIST, extend({
    remote: 'github'
  }, pkg.config.deployGithub || {}), callback);
};
