'use strict';

//
// Third party modules.
//
var canihaz = require('canihaz')('smithy');

/**
 * Process sass files.
 *
 * @param {String} content the raw file content that needs to be processed
 * @param {Object} context processing details
 * @param {Function} done
 * @api public
 */
var sass = module.exports = function sass(content, context, done) {
  var bundle = this;

  canihaz['node-sass'](function omgktnxbai(err, sass) {
    if (err) return done(err);

    sass.render(content, done);
  });
};

//
// Configure the import check.
//
sass.imports = require('../import')();

//
// The extensions this pre-processor generates once the code has been compiled.
//
sass.extensions = [ 'css' ];
