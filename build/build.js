
/**
 * Require the given path.
 *
 * @param {String} path
 * @return {Object} exports
 * @api public
 */

function require(path, parent, orig) {
  var resolved = require.resolve(path);

  // lookup failed
  if (null == resolved) {
    orig = orig || path;
    parent = parent || 'root';
    var err = new Error('Failed to require "' + orig + '" from "' + parent + '"');
    err.path = orig;
    err.parent = parent;
    err.require = true;
    throw err;
  }

  var module = require.modules[resolved];

  // perform real require()
  // by invoking the module's
  // registered function
  if (!module.exports) {
    module.exports = {};
    module.client = module.component = true;
    module.call(this, module.exports, require.relative(resolved), module);
  }

  return module.exports;
}

/**
 * Registered modules.
 */

require.modules = {};

/**
 * Registered aliases.
 */

require.aliases = {};

/**
 * Resolve `path`.
 *
 * Lookup:
 *
 *   - PATH/index.js
 *   - PATH.js
 *   - PATH
 *
 * @param {String} path
 * @return {String} path or null
 * @api private
 */

require.resolve = function(path) {
  if (path.charAt(0) === '/') path = path.slice(1);
  var index = path + '/index.js';

  var paths = [
    path,
    path + '.js',
    path + '.json',
    path + '/index.js',
    path + '/index.json'
  ];

  for (var i = 0; i < paths.length; i++) {
    var path = paths[i];
    if (require.modules.hasOwnProperty(path)) return path;
  }

  if (require.aliases.hasOwnProperty(index)) {
    return require.aliases[index];
  }
};

/**
 * Normalize `path` relative to the current path.
 *
 * @param {String} curr
 * @param {String} path
 * @return {String}
 * @api private
 */

require.normalize = function(curr, path) {
  var segs = [];

  if ('.' != path.charAt(0)) return path;

  curr = curr.split('/');
  path = path.split('/');

  for (var i = 0; i < path.length; ++i) {
    if ('..' == path[i]) {
      curr.pop();
    } else if ('.' != path[i] && '' != path[i]) {
      segs.push(path[i]);
    }
  }

  return curr.concat(segs).join('/');
};

/**
 * Register module at `path` with callback `definition`.
 *
 * @param {String} path
 * @param {Function} definition
 * @api private
 */

require.register = function(path, definition) {
  require.modules[path] = definition;
};

/**
 * Alias a module definition.
 *
 * @param {String} from
 * @param {String} to
 * @api private
 */

require.alias = function(from, to) {
  if (!require.modules.hasOwnProperty(from)) {
    throw new Error('Failed to alias "' + from + '", it does not exist');
  }
  require.aliases[to] = from;
};

/**
 * Return a require function relative to the `parent` path.
 *
 * @param {String} parent
 * @return {Function}
 * @api private
 */

require.relative = function(parent) {
  var p = require.normalize(parent, '..');

  /**
   * lastIndexOf helper.
   */

  function lastIndexOf(arr, obj) {
    var i = arr.length;
    while (i--) {
      if (arr[i] === obj) return i;
    }
    return -1;
  }

  /**
   * The relative require() itself.
   */

  function localRequire(path) {
    var resolved = localRequire.resolve(path);
    return require(resolved, parent, path);
  }

  /**
   * Resolve relative to the parent.
   */

  localRequire.resolve = function(path) {
    var c = path.charAt(0);
    if ('/' == c) return path.slice(1);
    if ('.' == c) return require.normalize(p, path);

    // resolve deps by returning
    // the dep in the nearest "deps"
    // directory
    var segs = parent.split('/');
    var i = lastIndexOf(segs, 'deps') + 1;
    if (!i) i = 0;
    path = segs.slice(0, i + 1).join('/') + '/deps/' + path;
    return path;
  };

  /**
   * Check if module is defined at `path`.
   */

  localRequire.exists = function(path) {
    return require.modules.hasOwnProperty(localRequire.resolve(path));
  };

  return localRequire;
};

require.register("KenanY-primality/primality.js", function(exports, require, module){
/*!
 * primality v1.5.7
 * (c) 2012–2013 Kenan Yildirim
 *
 * Includes functions from Lo-Dash
 * (c) 2012–2013 The Dojo Foundation
 *
 * Available under MIT license
 */
var primality;

var WILSON_PRIMES = [5, 13, 563];

var _ = require('./lib/util/');

/**
 * Returns the factorial of `value`
 *
 * @private
 * @param {Number} value
 * @returns {Number} The factorial of `value`.
 */
function factorial(value) {
  return value === 0 ? 1 : value * factorial(value - 1);
}

/**
 * Returns the modulus of two numbers.
 *
 * @private
 * @param {Number} x
 * @param {Number} y
 * @returns {Number}
 */
function mod(x, y) {
  if (y > 0) {
    if (x > 0) {
      return x % y;
    }
    else if (x === 0) {
      return 0;
    }
    else {
      return x - y * Math.floor(x / y);
    }
  }
  else if (y === 0) {
    return x;
  }
  else {
    throw new Error('Cannot calculate mod for a negative divisor');
  }
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
 * Checks if `a` and `b` are primes which differ by `difference`.
 *
 * @private
 * @param {Number} a First of the pair
 * @param {Number} b Second of the pair
 * @param {Number} difference
 * @returns {Boolean}
 */
function isRelated(a, b, difference) {
  return Math.abs(a - b) !== difference
    ? false
    : primality([a, b]);
}
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
  return isRelated(a, b, 2);
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
  return isRelated(a, b, 4);
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
  return isRelated(a, b, 6);
}

/**
 * Checks if `value` is a Wilson prime.
 *
 * <https://en.wikipedia.org/wiki/Wilson_prime>
 *
 * @static
 * @memberOf primality
 * @param {Number} value
 * @returns {Boolean} Returns `true` if `value` is a Wilson prime.
 * @example
 *
 * primality.isWilsonPrime(5);
 * // => true
 */
function isWilsonPrime(value) {
  return _.contains(WILSON_PRIMES, value)
         ? true
         : mod(factorial(value - 1) + 1, Math.pow(value, 2)) === 0;
}

/**
 * The semantic version number.
 *
 * @static
 * @memberOf primality
 * @type String
 */
primality.VERSION = '1.5.7';

primality.areTwinPrimes = areTwinPrimes;
primality.areCousinPrimes = areCousinPrimes;
primality.areSexyPrimes = areSexyPrimes;
primality.isWilsonPrime = isWilsonPrime;

// Expose Primality
(module.exports = primality).primality = primality;
});
require.register("KenanY-primality/lib/util/index.js", function(exports, require, module){
var _ = {};

_.contains = require('./contains');
_.isArray = require('./isArray');
_.isFinite = require('./isFinite');
_.isNaN = require('./isNaN');

module.exports = _;
});
require.register("KenanY-primality/lib/util/contains.js", function(exports, require, module){
var nativeMax = Math.max;

function basicIndexOf(array, value) {
  var index = -1;
  var length = array.length;

  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}

function contains(collection, target) {
  return basicIndexOf(collection, target) > -1;
}

module.exports = contains;
});
require.register("KenanY-primality/lib/util/isArray.js", function(exports, require, module){
var reNative = RegExp('^' +
  String(Object.prototype.valueOf)
    .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    .replace(/valueOf|for [^\]]+/g, '.+?') + '$'
);

var nativeIsArray = reNative.test(nativeIsArray = Array.isArray) && nativeIsArray;

var isArray = nativeIsArray || function(value) {
  return value ? (typeof value == 'object' && toString.call(value) == arrayClass) : false;
};

module.exports = isArray;
});
require.register("KenanY-primality/lib/util/isFinite.js", function(exports, require, module){
var objectTypes = {
  'boolean': false,
  'function': true,
  'object': true,
  'number': false,
  'string': false,
  'undefined': false
};

var freeGlobal = objectTypes[typeof global] && global;
if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal)) {
  window = freeGlobal;
}

var nativeIsFinite = window.isFinite;
var nativeIsNaN = window.isNaN;

function isFinite(value) {
  return nativeIsFinite(value) && !nativeIsNaN(parseFloat(value));
}

module.exports = isFinite;
});
require.register("KenanY-primality/lib/util/isNaN.js", function(exports, require, module){
var toString = Object.prototype.toString;
var numberClass = '[object Number]';

function isNumber(value) {
  return typeof value == 'number' || toString.call(value) == numberClass;
}

function isNaN(value) {
  return isNumber(value) && value != +value;
}

module.exports = isNaN;
});
require.register("primality-docs/js/main.js", function(exports, require, module){
// TODO
});

require.alias("KenanY-primality/primality.js", "primality-docs/deps/primality/primality.js");
require.alias("KenanY-primality/lib/util/index.js", "primality-docs/deps/primality/lib/util/index.js");
require.alias("KenanY-primality/lib/util/contains.js", "primality-docs/deps/primality/lib/util/contains.js");
require.alias("KenanY-primality/lib/util/isArray.js", "primality-docs/deps/primality/lib/util/isArray.js");
require.alias("KenanY-primality/lib/util/isFinite.js", "primality-docs/deps/primality/lib/util/isFinite.js");
require.alias("KenanY-primality/lib/util/isNaN.js", "primality-docs/deps/primality/lib/util/isNaN.js");
require.alias("KenanY-primality/primality.js", "primality-docs/deps/primality/index.js");
require.alias("KenanY-primality/primality.js", "KenanY-primality/index.js");

