describe('Smithy', function () {
  'use strict';

  var common = require('./common')
    , smithy = common.smithy
    , expect = common.expect;

  it('exposes each of the available meta-languages', function () {
    expect(smithy).to.have.property('styl');
    expect(smithy).to.have.property('sass');
    expect(smithy).to.have.property('less');
    expect(smithy).to.have.property('coffee');
  });
});
