(function(window, undefined) {

  /** Detect free variable `global` and use it as `window` */
  var freeGlobal = typeof global == 'object' && global;
  if (freeGlobal.global === freeGlobal) {
    window = freeGlobal;
  }

  var primality,

      /** Detect free variable `exports` */
      freeExports = typeof exports == 'object' && exports,

      /** Used to detect if a method is native */
      reNative = RegExp('^' + ({}.valueOf + '')
                  .replace(/[.*+?^=!:${}()|[\]\/\\]/g, '\\$&')
                  .replace(/valueOf|for [^\]]+/g, '.+?') + '$'),

      /* Native method shortcuts for methods with the same name as other primality methods */
      nativeIsArray = reNative.test(nativeIsArray = Array.isArray) && nativeIsArray,
      nativeIsFinite = window.isFinite,
      nativeIsNaN = window.isNaN,

      /** `Object#toString` result shortcuts */
      arrayClass = '[object Array]',
      numberClass = '[object Number]';

  /**
   * Checks if `value` is an array.
   *
   * @private
   * @param {Mixed} value The value to check.
   * @returns {Boolean} Returns `true` if the `value` is an array, else `false`.
   */
  var isArray = nativeIsArray || function(value) {
    return toString.call(value) == arrayClass;
  };

  /**
   * Checks if `value` is `NaN`.
   *
   * Note: This is not the same as native `isNaN`, which will return true for
   * `undefined` and other values. See <http://es5.github.com/#x15.1.2.4>.
   *
   * @private
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
   * booleans and empty strings. See <http://es5.github.com/#x15.1.2.5>.
   *
   * @private
   * @param {Mixed} value The value to check.
   * @returns {Boolean} Returns `true` if the `value` is a finite number, else `false`.
   */
  function isFinite(value) {
    return nativeIsFinite(value) && !nativeIsNaN(parseFloat(value));
  }

  /**
   * Finds the smallest factor of `n`
   *
   * @private
   * @param {Number} value The value to check
   * @returns {Number}
   *   The smallest prime that divides n
   *   NaN if n is NaN or Infinity
   *   0 if n is 0
   *   1 if n = 1, n = -1, or n is not an integer
   */
  function leastFactor(n) {
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
   * Checks if `value` is prime.
   *
   * @private
   * @param {Number} value The value to check
   * @returns {Boolean} Returns `true` if `value` is prime
   */
  function isPrime(value) {
    if (isNaN(value) || !isFinite(value) || value % 1 || value < 2) return false;
    if (value == leastFactor(value)) return true;
    return false;
  }

  /**
   * Creates a new primality instance.
   *
   * @name primality
   * @constructor
   * @param {Mixed} input A number, string, or array to check the primality of.
   * @returns {Boolean} Returns `true` if `input` is prime.
   * @example
   *
   * primality(7);
   * // => true
   *
   * primality('13');
   * // => true
   *
   * primality([17, 19, 23]);
   * // => true
   */
  primality = function(input) {
    if (input === null || input === '') {
      return null;
    }
    else if (isArray(input)) {
      var _i, _len;
      for (_i = 0, _len = input.length; _i < _len; _i++) {
        if (!isPrime(input[_i])) return false;
      }
      return true;
    }
    else {
      return isPrime(input);
    }
  };

  /**
   * The semantic version number.
   *
   * @static
   * @memberOf primality
   * @type String
   */
  primality.VERSION = '1.1.0';

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