var error = require('formula-errors');
var should = require('should');

describe('formulaCompiler', function() {
  describe('#constructor()', function () {


    it('it should do basic stuff', function () {

      var CHOOSE = require('./CHOOSE');

      CHOOSE(1).should.equal(error.na);
      CHOOSE(1, 'fooa').should.equal('fooa');
      CHOOSE(3, 'fooa', 'foob', 'fooc').should.equal('fooc');
      CHOOSE(2, 'fooa').should.equal(error.value);
      CHOOSE(255, 'fooa').should.equal(error.value);

    });

  });

});

