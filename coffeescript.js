'use strict';

//
// Third party modules.
//
var canihaz = require('canihaz')('smithy');

/**
 * Process CoffeeScript files.
 *
 * @param {String} content the raw file content that needs to be processed
 * @param {Object} context processing details
 * @param {Function} done
 * @api public
 */
var coffee = module.exports = function coffeescript(content, context, done) {
  var bundle = this
    , configuration = bundle['pre:coffee-script'] || {};

  canihaz['coffee-script'](function drinking(err, coffeescript) {
    if (err) return done(err);

    try { return done(null, coffeescript.compile(content)); }
    catch (e) { done(e); }
  });
};

//
// Configure the import check.
//
coffee.import = require('./import')(/require.[\'\"]\.([^\'\"]+)[\'\"]/gm);

//
// The extensions this pre-processor generates once the code has been compiled.
//
coffee.extensions = [ 'js' ];
