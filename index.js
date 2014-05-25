'use strict';

//
// Define set of pre-processors to expose.
//
var processors = {
  coffee: 'coffeescript',
  coffeescript: 'coffeescript',
  css: 'rework',
  js: 'restyle',
  json: 'restyle',
  less: 'less',
  sass: 'sass',
  styl: 'stylus',
  stylus: 'stylus'
};

//
// Generate lazy requiring statements to keep the memory footprint low.
//
Object.keys(processors).forEach(function lazyrequire(extension) {
  var cache;

  Object.defineProperty(exports, extension, {
      get: function getter() {
        return cache || (cache = require('./lib/' + processors[extension]));
      }
  });
});

//
// Expose map of preprocessors by file extension.
//
exports.processors = processors;

//
// Expose list of extensions.
//
exports.extensions = Object.keys(processors).map(function map(ext) {
  return '.' + ext;
});
