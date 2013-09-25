'use strict';

//
// Third party modules.
//
var canihaz = require('canihaz')('smithy');

/**
 * Process Stylus files.
 *
 * @param {String} content the raw file content that needs to be processed
 * @param {Object} options supply optional options
 * @param {Function} done
 * @api public
 */
var styl = module.exports = function stylus(content, options, done) {
  if ('function' === typeof options) {
    done = options;
    options = Object.create(null);
  }

  //
  // Get the stylus processor.
  //
  canihaz.stylus(function requiredStylus(error, stylus) {
    if (error) return done(error);

    //
    // You can't have stylus without some nibbles.
    //
    canihaz.nib(function requiredNib(error, nib) {
      if (error) return done(error);

      var compiler = stylus(content)
        .set('filename', options.location)
        .use(nib())
        .import('nib');

      // Process the options.
      if (options.compress) compiler.define('compress', true);
      if (options.datauri) compiler.define('url', stylus.url());
      if (options.evil) compiler.define('eval', function evil(str) {
        return new stylus.nodes.String(eval(str.val));
      });

      // @TODO process the platform list by exposing them as modules.
      if (options.define) {
        Object.keys(options.define).forEach(function each(def) {
          compiler.define(
            def,
            options.define[def] ? stylus.nodes.true : stylus.nodes.false
          );
        });
      }

      // Everything is configured, compile.
      compiler.render(done);
    });
  });
};

//
// Configure the import check.
//
styl.imports = require('../import')();

//
// The extensions this pre-processor generates once the code has been compiled.
//
styl.extension = 'css';
