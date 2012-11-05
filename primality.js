(function(window, undefined) {
  var freeGlobal = typeof global == 'object' && global;
  if (freeGlobal.global === freeGlobal) {
    window = freeGlobal;
  }

  var primality,
      freeExports = typeof exports == 'object' && exports,
      nativeIsFinite = window.isFinite,
      nativeIsNaN = window.isNaN,
      numberClass = '[object Number]';

  /**
   * Checks if `value` is `NaN`.
   *
   * Note: This is not the same as native `isNaN`, which will return true for
   * `undefined` and other values. See http://es5.github.com/#x15.1.2.4.
   *
   * @param {Mixed} value The value to check.
   * @returns {Boolean} Returns `true` if the `value` is `NaN`, else `false`.
   */
  function isNaN(value) {
    return toString.call(value) == numberClass && value != +value;
  }

  /**
   * Checks if `value` is, or can be coerced to, a finite number.
   *
   * Note: This is not the same as native `isFinite`, which will return true for
   * booleans and empty strings. See http://es5.github.com/#x15.1.2.5.
   *
   * @param {Mixed} value The value to check
   * @returns {Boolean} Returns `true` if the `value` is a finite number, else `false`
   */
  function isFinite(value) {
    return nativeIsFinite(value) && !nativeIsNaN(parseFloat(value));
  }

  /**
   * Checks if `value` is prime.
   *
   * @param {Number} value The value to check
   * @returns {Boolean} Returns `true` if `value` is prime
   */
  function isPrime(value) {
    if (isNaN(value) || !isFinite(value) || value % 1 || value < 2) return false;
    if (value == leastFactor(value)) return true;
    return false;
  }

  /**
   * Finds the smallest factor of `n`
   *
   * @param {Number} value The value to check
   * @returns {Number}
   *   The smallest prime that divides n
   *   NaN if n is NaN or Infinity
   *   0 if n is 0
   *   1 if n = 1, n = -1, or n is not an integer
   */
  function leastFactor(n) {
    if (isNaN(n) || !isFinite(n)) return NaN;
    if (n === 0) return 0;
    if (n % 1 || n * n < 2) return 1;
    if (n % 2 === 0) return 2;
    if (n % 3 === 0) return 3;
    if (n % 5 === 0) return 5;
    var m = Math.sqrt(n);
    for (var i = 7; i <= m; i += 30) {
      if (n % i === 0)        return i;
      if (n % (i + 4) === 0)  return i + 4;
      if (n % (i + 6) === 0)  return i + 6;
      if (n % (i + 10) === 0) return i + 10;
      if (n % (i + 12) === 0) return i + 12;
      if (n % (i + 16) === 0) return i + 16;
      if (n % (i + 22) === 0) return i + 22;
      if (n % (i + 24) === 0) return i + 24;
    }
    return n;
  }

  /**
   * Creates a new primality instance.
   *
   * @constructor
   * @this {primality}
   * @param A number to check the primality of
   */
  primality = function(input) {
    if (input === null || input === '') {
      return null;
    }
    return isPrime(input);
  };

  primality.version = '1.0.0';

  if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
    window.primality = primality;
    define(function() {
      return primality;
    });
  }
  else if (freeExports) {
    if (typeof module == 'object' && module && module.exports == freeExports) {
      (module.exports = primality).primality = primality;
    }
    else {
      freeExports.primality = primality;
    }
  }
  else {
    window.primality = primality;
  }
}).call(this);