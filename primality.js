/*!
 * primality v1.4.0
 * (c) 2012–2013 Kenan Yildirim
 *
 * Includes functions from Lo-Dash
 * (c) 2012–2013 The Dojo Foundation
 *
 * Available under MIT license
 */
(function(window) {

  // Detect free variable `global` and use it as `window`
  var freeGlobal = typeof global == 'object' && global;
  if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
    window = freeGlobal;
  }

  var primality,
      freeExports = typeof exports == 'object' && exports,
      _ = null;

  // Try to import the _optional_ dependency Lo-Dash.
  // If it is unavailable, replicate the API.
  try {
    _ = require('lodash');
  } catch (e) {
    var arrayClass     = '[object Array]',
        numberClass    = '[object Number]',
        objectRef      = Object(),
        reNative       = RegExp('^' +
                           String(objectRef.valueOf)
                             .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
                             .replace(/valueOf|for [^\]]+/g, '.+?') + '$'
                         ),
        toString       = objectRef.toString,
        nativeIsArray  = reNative.test(nativeIsArray = Array.isArray) && nativeIsArray,
        nativeIsFinite = window.isFinite,
        nativeIsNaN    = window.isNaN,
        lodash         = {},
        support        = lodash.support = {};

    support.argsObject = arguments.constructor == Object;

    var isArray = nativeIsArray || function(value) {
      return (support.argsObject && value instanceof Array) || toString.call(value) == arrayClass;
    };

    function isFinite(value) {
      return nativeIsFinite(value) && !nativeIsNaN(parseFloat(value));
    }

    function isNumber(value) {
      return typeof value == 'number' || toString.call(value) == numberClass;
    }

    function isNaN(value) {
      return isNumber(value) && value != +value;
    }

    lodash.isArray  = isArray;
    lodash.isFinite = isFinite;
    lodash.isNumber = isNumber;
    lodash.isNaN    = isNaN;

    _ = lodash;
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
    else if (n % 1 || n * n < 2) return 1;
    else if (n % 2 === 0) return 2;
    else if (n % 3 === 0) return 3;
    else if (n % 5 === 0) return 5;

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
    if (_.isNaN(value) || !_.isFinite(value) || value % 1 || value < 2) {
      return false;
    }
    if (value !== leastFactor(value)) return false;
    return true;
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
    if (input === null || input === '') return null;
    else if (_.isArray(input)) {
      for (var i = 0, l = input.length; i < l; i++) {
        if (!isPrime(input[i])) return false;
      }
      return true;
    }
    else return isPrime(input);
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
   * Checks if `a` and `b` are cousin primes
   *
   * <https://en.wikipedia.org/wiki/Cousin_prime>
   *
   * @static
   * @memberOf primality
   * @param {Number} a First of the pair
   * @param {Number} b Second of the pair
   * @returns {Boolean} Returns `true` if `a` and `b` are cousin primes
   * @example
   *
   * primality.areCousinPrimes(3, 7)
   * // => true
   */
  function areCousinPrimes(a, b) {
    if (Math.abs(a - b) != 4) return false;
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
  primality.VERSION = '1.4.0';

  primality.areTwinPrimes = areTwinPrimes;
  primality.areCousinPrimes = areCousinPrimes;
  primality.areSexyPrimes = areSexyPrimes;

  /**
   * Expose Primality
   *
   * Some AMD build optimizers, like r.js, check for specific condition patterns
   * like the following:
   */
  if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
    /**
     * Expose Primality to the global object even when an AMD loader is present
     * in case Primality was injected by a third-party script and not intended
     * to be loaded as a module.
     */
    window.primality = primality;

    /**
     * Define as an anonymous module so, through path mapping, it can be
     * referenced as anything else
     */
    define(function() {
      return primality;
    });
  }

  /**
   * Check for `exports` after `define` in case a build optimizer adds an
   * `exports` object
   */
  else if (freeExports) {

    // Node.js or RingoJS v0.8.0+
    if (typeof module == 'object' && module && module.exports == freeExports) {
      (module.exports = primality).primality = primality;
    }

    // Narwhal or RingoJS v0.7.0-
    else {
      freeExports.primality = primality;
    }
  }

  // Browser or Rhino
  else {
    window.primality = primality;
  }
}(this));
