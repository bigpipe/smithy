'use strict';

//
// Native modules.
//
var path = require('path');

//
// Third party modules.
//
var canihaz = require('canihaz')('smithy');

/**
 * Process less files.
 *
 * @param {String} content the raw file content that needs to be processed
 * @param {Object} context processing details
 * @param {Function} done
 * @api public
 */
var less = module.exports = function less(content, context, done) {
  var bundle = this
    , configuration = bundle['pre:less'] || {};

  canihaz.less(function omgktnxbai(err, less) {
    if (err) return done(err);

    var parser = new less.Parser({
        filename: configuration.filename || bundle.meta.filename
      , paths: [
            bundle.meta.path
          , path.dirname(bundle.meta.location)
        ]
      , strictImports: configuration.strictImports || false
      , optimization: configuration.optimization || 1
    });

    parser.parse(content, function parsed(err, tree) {
      if (err) return done(module.exports.format(err));

      try { return done(null, tree.toCSS({ compress: false, yuicompress: false })); }
      catch (e) {return done(module.exports.format(err)); }
    });
  });
};

/**
 * For some odd reason, the less guys find it funny to generate and throw
 * pointless custom error messages.. so we need to provide our own
 * unfuckingifyzor for these errors.
 *
 * @param {Error} err some fake fucked up error obj
 * @returns {Error}
 */
less.format = function format(err) {
  var message = [
      ' Error type: ' + err.type + ' ' + err.filename + ':' + err.line
    , err.extract[1] ? (' > ' + err.line + '| ' + err.extract[1] || '') : ''
    , ''
    , ' ' + err.message
  ];

  var better = new Error(message.join('\n'));
  better.stack = err.stack;

  return better;
};

//
// Configure the import check.
//
less.imports = require('../import')();

//
// The extensions this pre-processor generates once the code has been compiled.
//
less.extensions = [ 'css' ];
