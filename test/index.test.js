describe('Smithy', function () {
  'use strict';

  var common = require('./common')
    , smithy = common.smithy
    , fs = common.fs
    , canihaz = common.canihaz
    , expect = common.expect;

  // preload the processors.
  before(function (done) {
    this.timeout(6E5);

    var i = 0;
    function iterate () { if (i++ === 3) done(); }

    canihaz['coffee-script'](iterate);
    canihaz.less(iterate);
    canihaz['node-sass'](iterate);
    canihaz.stylus(iterate);
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

    it('handles require statements in the content', function () {
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

  describe('#stylus', function () {
    it('can compile to extensions: [ CSS ]', function () {
      expect(smithy.styl).to.have.property('extensions');
      expect(smithy.styl.extensions).to.have.include('css');
    });

    it('by default exports to extension: CSS', function () {
      expect(smithy.styl).to.have.property('export', 'css');
    });

    it('defers handling of import statements to general function', function () {
      expect(smithy.styl).to.not.have.property('regexp');
    });

    it('exposes the stylus compiler',function (done) {
      var content = fs.readFileSync(__dirname + '/fixtures/stylus.styl', 'utf-8');

      smithy.styl(content, {}, function (error, processed) {
        expect(error).to.equal(null);
        expect(processed).to.include("#header {\n  color: #4d926f;\n");
        done();
      });
    });

    it('will return an error on false input', function (done) {
      smithy.styl('false css #garbage\ncolor:lol', {}, function (error, content) {
        expect(error).to.be.an.instanceof(Error);
        expect(error.message).to.include('color:lol\n\nexpected "indent", got "eos"\n');
        expect(content).to.equal(undefined);
        done();
      });
    });
  });

  describe('#less', function () {
    it('can compile to extensions: [ CSS ]', function () {
      expect(smithy.less).to.have.property('extensions');
      expect(smithy.less.extensions).to.have.include('css');
    });

    it('by default exports to extension: CSS', function () {
      expect(smithy.less).to.have.property('export', 'css');
    });

    it('defers handling of import statements to general function', function () {
      expect(smithy.less).to.not.have.property('regexp');
    });

    it('exposes the less compiler',function (done) {
      var content = fs.readFileSync(__dirname + '/fixtures/less.less', 'utf-8');

      smithy.less(content, { paths: [  __dirname + '/fixtures' ] }, function (error, processed) {
        expect(error).to.equal(null);
        expect(processed).to.include("#header {\n  color: #4d926f;\n");
        done();
      });
    });

    it('will return an error on false input', function (done) {
      smithy.less('false css #garbage\ncolor:lol', {}, function (error, content) {
        expect(error).to.be.an.instanceof(Error);
        expect(error.message).to.include(' > 2| color:lol\n\n Unrecognised input');
        expect(content).to.equal(undefined);
        done();
      });
    });
  });

});
