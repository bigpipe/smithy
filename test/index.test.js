describe('Smithy', function () {
  'use strict';

  var common = require('./common')
    , smithy = common.smithy
    , fs = common.fs
    , canihaz = common.canihaz
    , expect = common.expect;

  // preload the processor.
  before(function (done) {
   canihaz['coffee-script'](done);
  });

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
      expect(smithy.coffee.regexp.toString()).to.equal(/require.['"]\.([^'"]+)['"]/gm.toString());
      expect(smithy.coffee.regexp.test('require "./random.coffee"')).to.equal(true);
      expect(smithy.coffee.regexp.test('require "./path/random.js"')).to.equal(true);
    });

    it('exposes the coffeescript compiler',function (done) {
      var content = fs.readFileSync(__dirname + '/fixtures/coffeescript.coffee', 'utf-8');

      smithy.coffee(content, {}, function (error, processed) {
        expect(error).to.equal(null);
        expect(processed).to.include("square;\n\n  number = 42;\n\n  opposite = ");
        done();
      });
    });

    it('will return an error on false input', function (done) {
      smithy.coffee(undefined, {}, function (error, content) {
        expect(error).to.be.an.instanceof(Error);
        expect(error.message).to.include('Cannot call method');
        expect(content).to.equal(undefined);
        done();
      });
    });
  });
});
