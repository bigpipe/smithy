'use strict';

var chai = require('chai');
chai.Assertion.includeStack = true;

//
// Expose smithy
//
exports.smithy = require('../');

//
// Expose our assertions.
//
exports.expect = chai.expect;
