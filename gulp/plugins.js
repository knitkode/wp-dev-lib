/* jshint node: true */
'use strict';

/**
 * Gulp Plugins shared options
 * @type {Object}
 */
module.exports = {
  autoprefixer: {
    browsers: ['> 1%', 'last 2 versions', 'ie 8']
  },
  concat: {
    newLine: '\n\n\n'
  },
  cssMqpacker: {
    sort: true
  },
  imagemin: {
    progressive: true,
    interlaced: true,
    svgoPlugins: [{
      // don't remove IDs from SVGs, they are often used
      // as hooks for embedding and styling
      cleanupIDs: false
      // removeViewBox: false,
    }]
  },
  // http://jscs.info/overview#options
  jscs: {
    configPath: '.jscsrc',
    fix: true
  },
  jsonEditor: {
    'indent_char': ' ',
    'indent_size': 2
  },
  // Based on default settings on http://modernizr.com/download/
  modernizr: {
    'cache' : true,
    'options': [
      'setClasses',
      'addTest',
      'testProp',
      'fnBind'
    ],
    'excludeTests': [],
    'crawl' : false,
    'customTests' : []
  },
  sass: {
    outputStyle: 'expanded',
    precision: 10,
    includePaths: ['.']
  },
  // https://www.npmjs.com/package/gulp-trimlines
  trimlines: {
    leading: false
  },
  // https://github.com/mishoo/UglifyJS2#the-simple-way
  uglify: {
    preserveComments: 'license', // --comments
    toplevel: true,
    mangle: true, // --mangle
    compress: {
      drop_console: true, // --compress drop_console=true
      global_defs: {
        DEBUG: false // --define DEBUG=false
      }
    },
  },
  uglifyCustomScripts: { // @@temp see readme... \\
    mangleProperties: { // --mangle-props
      regex: /^_(?!format|default|value|dirty|toggleActive|process)(.+)/, // --mangle-regex='/^_/'
    },
    nameCache: '../roots/.tmp/uglify--customize-name_cache.json', // --name-cache .tmp/uglify-cache.json
    compress: {
      unsafe: true // --compress unsafe=true
    }
    // reserveDomprops: true // --reserve-domprops
  }
};
