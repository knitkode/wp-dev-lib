const path = require('path');

// the object to export
let paths = {};

// alias node `path.join` function, so it's easier to compose paths in other
// subfolders here in dev-lib, only one `require` in those files.
paths.join = path.join;

// set hyper basic paths
paths.DEV_LIB = paths.join(__dirname);
paths.CONFIG = paths.join(paths.DEV_LIB, '..');
paths.ROOT = paths.join(paths.CONFIG, '..'); // absolute root path
paths.root = path.relative(paths.DEV_LIB, './../'); // relative root path

// require package json to check if paths has been set there
const pkg = require(paths.join(paths.ROOT, 'package.json'));
// read the custom `"config": "paths": {}` object in `package.json`
let pkgPaths = pkg.config.paths || {};

// set main paths (all uppercase) with fallback
paths.TMP = paths.join(paths.ROOT, pkgPaths.tmp || '.tmp');
paths.SRC = paths.join(paths.ROOT, pkgPaths.src || 'src');
paths.APP = paths.join(paths.ROOT, pkgPaths.app || 'src/app');
paths.DIST = paths.join(paths.ROOT, pkgPaths.dist || 'build');
paths.distRel = paths.join(paths.root, pkgPaths.dist || 'build');
paths.DIST_STATIC = paths.join(paths.ROOT, pkgPaths['build-static'] || 'build-static');
paths.ENTRY_FILE = pkgPaths.entryFile || 'app.js';
paths.ENTRY_PATH = paths.join(paths.APP, paths.join(pkgPaths.entry || 'scripts'));
paths.ENTRY = paths.join(paths.APP, paths.join(pkgPaths.entry || 'scripts', paths.ENTRY_FILE));
paths.SECRETS = paths.join(paths.ROOT, pkgPaths.secrets || '..', 'secrets.json');

// set relative main paths (only the ones actually used)
paths.rel = {};
paths.rel.DIST_STATIC = pkgPaths['build-static'] || 'build-static';

// tmp paths (lowercase)
paths.tmp = {
  fonts: paths.join(paths.TMP, pkgPaths.assets || '', pkgPaths.tmpFonts || 'fonts'),
  images: paths.join(paths.TMP, pkgPaths.assets || '', pkgPaths.tmpImages || 'images'),
  scripts: paths.join(paths.TMP, pkgPaths.assets || '', pkgPaths.tmpScripts || 'scripts'),
  styles: paths.join(paths.TMP, pkgPaths.assets || '', pkgPaths.tmpStyles || 'styles'),
};

// source paths (lowercase)
paths.src = {
  npm: paths.join(paths.ROOT, pkgPaths.srcNpm || 'node_modules'),
  vendor: paths.join(paths.SRC, pkgPaths.srcVendor || 'vendor'),
  jekyll: paths.join(paths.SRC, pkgPaths.srcJekyll || 'jekyll'),
  php: paths.join(paths.SRC, pkgPaths.srcPhp || 'php'),
  views: paths.join(paths.SRC, pkgPaths.srcViews || 'views'),
  data: paths.join(paths.SRC, pkgPaths.srcData || 'data'),
  images: paths.join(paths.SRC, pkgPaths.srcImages || 'images'),
  layouts: paths.join(paths.APP, pkgPaths.srcLayouts || 'layouts'),
  fonts: paths.join(paths.APP, pkgPaths.srcFonts || 'fonts'),
  scripts: paths.join(paths.APP, pkgPaths.srcScripts || 'scripts'),
  styles: paths.join(paths.APP, pkgPaths.srcStyles || 'styles'),
};

// dist paths (lowercase)
paths.dist = {
  vendor: paths.join(paths.DIST, pkgPaths.distVendor || 'vendor'),
  jekyll: pkgPaths.distJekyll ? paths.join(paths.ROOT, pkgPaths.distJekyll) : paths.DIST,
  languages: paths.join(paths.DIST, pkgPaths.distLanguages || 'languages'),
  php: paths.join(paths.DIST, pkgPaths.distPhp || 'php'),
  assets: paths.join(paths.DIST, pkgPaths.distAssets || 'assets'),
  data: paths.join(paths.DIST, pkgPaths.distData || 'data'),
  images: paths.join(paths.DIST, pkgPaths.assets || '', pkgPaths.distImages || 'images'),
  fonts: paths.join(paths.DIST, pkgPaths.assets || '', pkgPaths.distFonts || 'fonts'),
  styles: paths.join(paths.DIST, pkgPaths.assets || '', pkgPaths.distStyles || 'styles'),
  scripts: paths.join(paths.DIST, pkgPaths.assets || '', pkgPaths.distScripts || 'scripts'),
};

module.exports = paths;
