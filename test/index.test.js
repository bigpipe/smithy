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

  describe('#coffeescript', function () {
    it('can compile to extensions: [ JS ]', function () {
      expect(smithy.coffee).to.have.property('extensions');
      expect(smithy.coffee.extensions).to.have.include('js');
    });

    it('by default exports to extension: JS', function () {
      expect(smithy.coffee).to.have.property('export', 'js');
    });

    it('handles require import statements', function () {
      expect(smithy.coffee).to.have.property('regexp');
      expect(smithy.coffee.regexp.toString()).to.equal(/require.[\'\"]\.([^\'\"]+)[\'\"]/gm.toString());
      expect(smithy.coffee.regexp.test('require "./random.coffee"')).to.equal(true);
    });
  });
});
