/**
 * Gulp Plugins shared options
 * @type {Object}
 */
module.exports = {
  autoprefixer: {
    browsers: ['> 1%', 'last 2 versions', 'ie 9']
  },
  babel: {
    presets: ['es2015']
  },
  base64: {
    // baseDir: PATHS.src.root,
    extensions: ['svg', 'png', 'gif'],
    maxImageSize: 8 * 1024,
    debug: false
  },
  concat: {
    newLine: '\n\n\n'
  },
  cssnano: {
    safe: true, // @see https://github.com/ben-eb/cssnano/issues/28 \\
    // @@tomonitor https://github.com/ben-eb/cssnano/issues/136 \\
    reduceIdents: false,
    zindex: false, // http://cssnano.co/optimisations/#optimise-z-index-unsafe-
    discardUnused: false // let's disable all the unsafe options
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
  // https://github.com/mishoo/UglifyJS2#api-reference
  uglify: {
    toplevel: true,
    compress: {
      drop_console: true,
      global_defs: {
        DEBUG: false
      }
    },
    output: {
      comments: 'license',
    }
  },
  uglifyCustomScripts: {
    mangle: {
      properties: {
        regex: /^_(?!format|default|value|dirty|toggleActive|process)(.+)/,
      }
    },
    compress: {
      unsafe: true
    }
  },
  readmeToMarkdown: {
    screenshot_ext: ['jpg', 'jpg', 'png'],
    // extract: {
    //   'changelog': 'CHANGELOG'
    // }
  }
};
