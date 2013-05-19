define(['../../dist/primality'], function(primality) {
  describe('primality', function() {
    it('should expose version number', function () {
      primality.VERSION.should.match(/[0-9]+\.[0-9]+\.[0-9]+/);
    });
    it('should expose public constructor', function () {
      primality.should.be.a('function');
    });
    describe('numbers', function() {
      it('should return true when value is prime', function() {
        primality(7).should.equal(true);
        primality(new Number(11)).should.equal(true);
      });
      it('should return false when value is not prime', function() {
        primality(6).should.equal(false);
        primality(new Number(8)).should.equal(false);
      });
      describe('special cases', function() {
        it('should return false for 1', function() {
          primality(1).should.equal(false);
          primality(new Number(1)).should.equal(false);
        });
      });
    });
    describe('strings', function() {
      it('should turn strings into numbers', function() {
        primality('13').should.equal(true);
        primality(new String('24')).should.equal(false);
      });
    });
    describe('arrays', function() {
      it('should return true if an array of prime numbers is passed', function() {
        primality([17, 19, 23]).should.equal(true);
        primality(new Array(29, 30, 31)).should.equal(false);
      });
    });
    describe('classes', function() {
      it('are twin primes', function() {
        primality.areTwinPrimes(3, 5).should.equal(true);
        primality.areTwinPrimes(5, 6).should.equal(false);
        primality.areTwinPrimes(12, 14).should.equal(false);
      });
      it('are cousin primes', function() {
        primality.areCousinPrimes(3, 7).should.equal(true);
        primality.areCousinPrimes(7, 10).should.equal(false);
        primality.areCousinPrimes(14, 18).should.equal(false);
      });
      it('are sexy primes', function() {
        primality.areSexyPrimes(5, 11).should.equal(true);
        primality.areSexyPrimes(11, 16).should.equal(false);
        primality.areSexyPrimes(18, 24).should.equal(false);
      });
      it('is a wilson prime', function() {
        primality.isWilsonPrime(5).should.equal(true);
        primality.isWilsonPrime(13).should.equal(true);
        primality.isWilsonPrime(563).should.equal(true);
        primality.isWilsonPrime(564).should.equal(false);
      });
    });
  });
});