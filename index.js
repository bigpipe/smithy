'use strict';

//
// Define set of pre-processors to expose.
//
var processors = {
    styl: 'stylus'
  , less: 'less'
  , sass: 'sass'
  , coffee: 'coffeescript'
};

//
// Generate lazy requiring statements to keep the memory footprint low.
//
Object.keys(processors).forEach(function lazyrequire(extension) {
  var cache;

  Object.defineProperty(exports, extension, {
      get: function getter() {
        return cache || (cache = require('./' + processors[extension]));
      }
  });
});
