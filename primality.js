/*!
 * primality v1.2.0
 * (c) 2012–2013 Kenan Yildirim
 *
 * Includes functions from Lo-Dash
 * (c) 2012 John-David Dalton
 *
 * Available under MIT license
 */
(function(window, undefined) {

  /** Detect free variable `global` and use it as `window` */
  var freeGlobal = typeof global == 'object' && global;
  if (freeGlobal.global === freeGlobal) {
    window = freeGlobal;
  }

  var primality,

      /** Detect free variable `exports` */
      freeExports = typeof exports == 'object' && exports,

      objectRef = new function(){},

      /** Used to detect if a method is native */
      reNative = RegExp('^' + (objectRef.valueOf + '')
                  .replace(/[.*+?^=!:${}()|[\]\/\\]/g, '\\$&')
                  .replace(/valueOf|for [^\]]+/g, '.+?') + '$'),

      /** Native method shortcuts */
      toString = objectRef.toString,

      /** Native method shortcuts for methods with the same name as other primality methods */
      nativeIsArray = reNative.test(nativeIsArray = Array.isArray) && nativeIsArray,
      nativeIsFinite = window.isFinite,
      nativeIsNaN = window.isNaN,

      /** `Object#toString` result shortcuts */
      arrayClass = '[object Array]',
      numberClass = '[object Number]',

      /** Detect if `arguments` objects are `Object` objects (all but Opera < 10.5) */
      argsAreObjects = arguments.constructor == Object;

  /**
   * Checks if `value` is an array.
   *
   * @private
   * @param {Mixed} value The value to check.
   * @returns {Boolean} Returns `true` if the `value` is an array, else `false`.
   */
  var isArray = nativeIsArray || function(value) {
    return (argsAreObjects && value instanceof Array) || toString.call(value) == arrayClass;
  };

  /**
   * Checks if `value` is a number.
   *
   * @private
   * @param {Mixed} value The value to check.
   * @returns {Boolean} Returns `true` if the `value` is a number, else `false`.
   */
  function isNumber(value) {
    return typeof value == 'number' || toString.call(value) == numberClass;
  }

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
    return isNumber(value) && value != +value;
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
      for (var i = 0, l = input.length; i < l; i++) {
        if (!isPrime(input[i])) return false;
      }
      return true;
    }
    else {
      return isPrime(input);
    }
  };

  /**
   * Checks if `a` and `b` are twin primes
   *
   * <https://en.wikipedia.org/wiki/Twin_prime>
   *
   * @static
   * @memberOf primality
   * @param {Number} a First of the pair
   * @param {Number} b Second of the pair
   * @returns {Boolean} Returns `true` if `a` and `b` are twin primes
   * @example
   *
   * primality.areTwinPrimes(3, 5)
   * // => true
   */
  function areTwinPrimes(a, b) {
    if (Math.abs(a - b) != 2) return false;
    if (!primality([a, b])) return false;
    return true;
  }

  /**
   * Checks if `a` and `b` are sexy primes
   *
   * <https://en.wikipedia.org/wiki/Sexy_prime>
   *
   * @static
   * @memberOf primality
   * @param {Number} a First of the pair
   * @param {Number} b Second of the pair
   * @returns {Boolean} Returns `true` if `a` and `b` are sexy primes
   * @example
   *
   * primality.areSexyPrimes(5, 11)
   * // => true
   */
  function areSexyPrimes(a, b) {
    if (Math.abs(a - b) != 6) return false;
    if (!primality([a, b])) return false;
    return true;
  }

  /**
   * The semantic version number.
   *
   * @static
   * @memberOf primality
   * @type String
   */
  primality.VERSION = '1.1.1';

  primality.areTwinPrimes = areTwinPrimes;
  primality.areSexyPrimes = areSexyPrimes;

  /** Expose primality */
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
}(this));