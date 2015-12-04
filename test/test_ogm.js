var assert = require('assert');
var ogm = require('../index');

describe('test OGM functionality', function() {

  describe('Should generate correct checkdigits', function() {
    it('checkdigits for 1115532822 should equal 36', function() {
      var control = ogm.calculateCheckDigits(1115532822);
      assert(control === '36');

      control = ogm.calculateCheckDigits('1115532822');
      assert(control === '36');
    });

    it('checkdigits for 1115532786 should equal 97', function() {
      var control = ogm.calculateCheckDigits(1115532786);
      assert(control === '97');

      var control = ogm.calculateCheckDigits('1115532786');
      assert(control === '97');
    });

    it('checkdigits for 0000035134 should equal 20', function() {
      var control = ogm.calculateCheckDigits(35134);
      assert(control === '20');

      var control = ogm.calculateCheckDigits('0000035134');
      assert(control === '20');
    });

    it('checkdigits for 1261001168 should equal 04', function() {
      var control = ogm.calculateCheckDigits(1261001168);
      assert(control === '04');

      var control = ogm.calculateCheckDigits('1261001168');
      assert(control === '04');
    });



  })
  describe('#isValidOGM(ogm) - valid cases', function() {
    it('+++123/1234/12328+++', function() {
      var result = ogm.isValidOGM('+++123/1234/12328+++');
      assert.ok(result);
    });

    it('+++700/8000/93329+++', function() {

      var result = ogm.isValidOGM('+++700/8000/93329+++');
      assert.ok(result);
    });

    it('+++256/8657/23137+++', function() {
      var result = ogm.isValidOGM('+++256/8657/23137+++');
      assert.ok(result);
    });


    // when division is zero, control should be 97
    it('+++700/8000/90497+++', function() {
      var result = ogm.isValidOGM('+++700/8000/90497+++');
      assert.ok(result);
    });


    // zero should be added if control < 10
    it('+++700/8000/90602+++, < 10', function() {
      var result = ogm.isValidOGM('+++700/8000/90602+++');
      assert.ok(result);
    });

    // leading zeroes
    it('+++007/8000/90605+++, leading zeroes', function() {
      var result = ogm.isValidOGM('+++007/8000/90605+++');
      assert.ok(result);
    });

  });

  describe('#isValidOGM(ogm) - invalid cases', function() {

    // wrong +
    it('++700/8000/90602+++, wrong plusses', function() {
      var result = ogm.isValidOGM('++700/8000/90602+++');
      assert.ok(!result);
    });

    // wrong +
    it('+++700/8000/90602+ , wrong plusses', function() {
      var result = ogm.isValidOGM('+++700/8000/90602+');
      assert.ok(!result);
    });

    // wrong control
    it('+++700/8000/90607+++, wrong control', function() {
      var result = ogm.isValidOGM('++700/8000/90607+++');
      assert.ok(!result);
    });

    //too short
    it('+++70/0800/10029+++, wrong length', function() {
      var result = ogm.isValidOGM('+++70/0800/10029+++,');
      assert.ok(!result);
    });
  });

  describe('#generateOGM(numbers)', function() {
    it('+++700/8000/90497+++ should be generated', function() {
      var og = ogm.generateOGM(7008000904);
      assert(og === '+++700/8000/90497+++');
    });

    it('+++700/8000/90602+++ should be generated', function() {
      var og = ogm.generateOGM(7008000906);
      assert(og === '+++700/8000/90602+++');
    });

    it('+++700/8000/93329+++ should be generated', function() {
      var og = ogm.generateOGM(7008000933);
      assert(og === '+++700/8000/93329+++');
    });

    it('+++007/8000/90605+++ should be generated, leading zeros', function() {
      var og = ogm.generateOGM('0078000906');
      assert(og === '+++007/8000/90605+++');

      og = ogm.generateOGM(78000906);
      assert(og === '+++007/8000/90605+++');
    });

    it('+++000/8000/90655+++ should be generated, leading zeros', function() {
      var og = ogm.generateOGM('0008000906');
      assert(og === '+++000/8000/90655+++');

      og = ogm.generateOGM(8000906);
      assert(og === '+++000/8000/90655+++');
    });

  });

  describe('#generateRandomOGM()', function() {
    it('should be able to generate a valid Random ogm', function () {

      for (var i = 0; i < 20; i++) {
        var og = ogm.generateRandomOGM();
        var isValid = ogm.isValidOGM(og);
        assert(isValid);
      }
    });
  });

  describe('#getStrippedOGM(ogm)', function () {
    it('+++000/8000/90655+++ should generate 000800090655', function () {
      var stripped = ogm.getStrippedOGM('+++000/8000/90655+++');
      assert(stripped === '000800090655');
    });
    
    it('+++700/8000/93329+++  should generate 700800093329 ', function () {
      var stripped = ogm.getStrippedOGM('+++700/8000/93329+++ ');
      assert(stripped === '700800093329');
    });
  });
});
