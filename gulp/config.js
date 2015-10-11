/* jshint node: true */
'use strict';

var overridenIsDist = global.CONFIG ? global.CONFIG.isDist : false;
/**
 * Config informations
 * @type {Object}
 */
module.exports = {
  creditsPlaceholder: '/*! @license credits */',
  credits: [
    '/*!',
    ' * <%= pkg.config.namePretty %> v<%= pkg.version %> (<%= pkg.homepage %>)',
    ' * <%= pkg.description %>',
    ' * Copyright (c) <%= pkg.config.startYear %><% if (new Date().getFullYear() > pkg.config.startYear) { %>-<%= new Date().getFullYear() %><% } %> <%= pkg.author.name %> <<%= pkg.author.email %>> (<%= pkg.author.url %>)',
    ' * @license <%= pkg.license %> (Last change on: <% var d = new Date(); print(d.getDate() + "-" + d.getMonth() + "-" + d.getFullYear()) %>)',
    ' */'
  ].join('\n'),
  argv: require('minimist')(process.argv.slice(2)),
  isDist: overridenIsDist || !!require('minimist')(process.argv.slice(2)).dist // read --dist arg (i.e. `gulp build --dist`)
};
