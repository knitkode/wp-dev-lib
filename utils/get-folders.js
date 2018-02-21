const fs = require('fs');
const path = require('path');

/**
 * Get folders
 *
 * {@link http://stackoverflow.com/a/23398200/1938970 source}
 */
module.exports = function (dir) {
  return fs.readdirSync(dir)
    .filter(function(file) {
      return fs.statSync(path.join(dir, file)).isDirectory();
    });
};
