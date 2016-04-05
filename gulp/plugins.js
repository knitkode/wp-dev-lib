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
    // don't remove IDs from SVGs, they are often used
    // as hooks for embedding and styling
    svgoPlugins: [{cleanupIDs: false}]
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
  uglify: {
    preserveComments: 'some', // --comments
    toplevel: true,
    mangle: true, // --mangle
    compress: {
      drop_console: true, // --compress drop_console=true
      global_defs: {
        DEBUG: false // --define DEBUG=false
      }
    }
  },
  uglifyCustomScripts: { // @@temp see readme... \\
    mangleProps: true, // --mangle-props
    mangleRegex: '/^_/', // --mangle-regex='/^_/'
    reserveDomprops: true // --reserve-domprops
    // --name-cache .tmp/uglify-cache.json
  }
};
