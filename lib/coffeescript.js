'use strict';

//
// Third party modules.
//
var canihaz = require('canihaz')('smithy');

/**
 * Process CoffeeScript files. The processor has no required options
 *
 * @param {String} content the raw file content that needs to be processed
 * @param {Object} options supply optional options
 * @param {Function} done
 * @api public
 */
var coffee = module.exports = function coffeescript(content, options, done) {
  if ('function' === typeof options) {
    done = options;
    options = Object.create(null);
  }

  canihaz['coffee-script'](function requiredCoffee(err, coffeescript) {
    if (err) return done(err);

    try { return done(null, coffeescript.compile(content, options)); }
    catch (e) { done(e); }
  });
};

//
// Configure the import check.
//
coffee.imports = require('../import')(/require.[\'\"]\.([^\'\"]+)[\'\"]/gm);

//
// Set of possible extensions this pre-processor can generate.
//
coffee.extensions = [ 'js' ];

//
// Default configuration on export extension.
//
coffee.export = 'js';
