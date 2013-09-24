'use strict';

//
// Third party modules.
//
var canihaz = require('canihaz')('smithy');

/**
 * Process Stylus files.
 *
 * @param {String} content the raw file content that needs to be processed
 * @param {Object} context processing details
 * @param {Function} done
 * @api public
 */
var styl = module.exports = function stylus(content, context, done) {
  var bundle = this
    , configuration = bundle['pre:stylus'] || {};

  canihaz.stylus(function omgktnxbai(err, stylus) {
    if (err) return done(err);

    // You can't have stylus without some nibbles.
    canihaz.nib(function omgktnxbai(err, nib) {
      if (err) return done(err);

      var compiler = stylus(content)
        .set('filename', bundle.meta.location)
        .use(nib())
        .import('nib');

      // Process the options.
      if (configuration.compress) compiler.define('compress', true);
      if (configuration.datauri) compiler.define('url', stylus.url());
      if (configuration.evil) compiler.define('eval', function evil(str) {
        return new stylus.nodes.String(eval(str.val));
      });

      // @TODO process the platform list by exposing them as modules.
      if (configuration.define) {
        Object.keys(configuration.define).forEach(function each(def) {
          compiler.define(
              def
            , configuration.define[def]
              ? stylus.nodes.true
              : stylus.nodes.false
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
styl.import = require('../import')();

//
// The extensions this pre-processor generates once the code has been compiled.
//
styl.extensions = [ 'css' ];
