;(function(){

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
require.register("primality/primality.js", function(exports, require, module){
/*!
 * primality v1.5.0
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
 * Checks if `a` is a Wilson prime.
 *
 * <https://en.wikipedia.org/wiki/Wilson_prime>
 *
 * @static
 * @memberOf primality
 * @param {Number} a
 * @returns {Boolean} Returns `true` if `a` is a Wilson prime.
 * @example
 *
 * primality.isWilsonPrime(5);
 * // => true
 */
function isWilsonPrime(a) {
  if (_.indexOf(WILSON_PRIMES, a) > -1) {
    return true;
  }
  return false;
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
primality.isWilsonPrime = isWilsonPrime;

// Expose Primality
(module.exports = primality).primality = primality;
});
require.register("primality/lib/util/index.js", function(exports, require, module){
var _ = {};

_.indexOf = require('./indexOf');
_.isArray = require('./isArray');
_.isFinite = require('./isFinite');
_.isNaN = require('./isNaN');

module.exports = _;
});
require.register("primality/lib/util/common.js", function(exports, require, module){
var window = window || {};

var freeGlobal = typeof global == 'object' && global;
if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
  window = freeGlobal;
}

var indicatorObject = {};
var objectTypes = {
  'boolean': false,
  'function': true,
  'object': true,
  'number': false,
  'string': false,
  'undefined': false
};
var objectRef = Object();
var hasOwnProperty = objectRef.hasOwnProperty;

var reNative = RegExp('^' +
  String(objectRef.valueOf)
    .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    .replace(/valueOf|for [^\]]+/g, '.+?') + '$'
);

var nativeIsArray = reNative.test(nativeIsArray = Array.isArray) && nativeIsArray;
var nativeIsFinite = window.isFinite;
var nativeIsNaN = window.isNaN;
var nativeKeys = reNative.test(nativeKeys = Object.keys) && nativeKeys;
var nativeMax = Math.max;

var toString = objectRef.toString;

module.exports = {
  hasOwnProperty: hasOwnProperty,
  indicatorObject: indicatorObject,
  nativeIsArray: nativeIsArray,
  nativeIsFinite: nativeIsFinite,
  nativeIsNaN: nativeIsNaN,
  nativeKeys: nativeKeys,
  nativeMax: nativeMax,
  objectRef: objectRef,
  objectTypes: objectTypes,
  reNative: reNative,
  toString: toString
};
});
require.register("primality/lib/util/createCallback.js", function(exports, require, module){
var indicatorObject = require('./common').indicatorObject;
var identity = require('./identity');
var isEqual = require('./isEqual');
var keys = require('./keys');

function createCallback(func, thisArg, argCount) {
  if (func == null) {
    return identity;
  }
  var type = typeof func;
  if (type != 'function') {
    if (type != 'object') {
      return function(object) {
        return object[func];
      };
    }
    var props = keys(func);
    return function(object) {
      var length = props.length,
          result = false;
      while (length--) {
        if (!(result = isEqual(object[props[length]], func[props[length]], indicatorObject))) {
          break;
        }
      }
      return result;
    };
  }
  if (typeof thisArg != 'undefined') {
    if (argCount === 1) {
      return function(value) {
        return func.call(thisArg, value);
      };
    }
    if (argCount === 2) {
      return function(a, b) {
        return func.call(thisArg, a, b);
      };
    }
    if (argCount === 4) {
      return function(accumulator, value, index, collection) {
        return func.call(thisArg, accumulator, value, index, collection);
      };
    }
    return function(value, index, collection) {
      return func.call(thisArg, value, index, collection);
    };
  }
  return func;
}

module.exports = createCallback;
});
require.register("primality/lib/util/forIn.js", function(exports, require, module){
var objectTypes = require('./common').objectTypes;

var createCallback = require('./createCallback');

var forIn = function (collection, callback, thisArg) {
  var index, iterable = collection, result = iterable;
  if (!iterable) return result;
  if (!objectTypes[typeof iterable]) return result;
  callback = callback && typeof thisArg == 'undefined' ? callback : createCallback(callback, thisArg);

  for (index in iterable) {
    if (callback(iterable[index], index, collection) === false) return result;
  }
  return result
};

module.exports = forIn;
});
require.register("primality/lib/util/identity.js", function(exports, require, module){
function identity(value) {
  return value;
}

module.exports = identity;
});
require.register("primality/lib/util/indexOf.js", function(exports, require, module){
var sortedIndex = require('./sortedIndex');

var nativeMax = require('./common').nativeMax;

function indexOf(array, value, fromIndex) {
  var index = -1,
      length = array ? array.length : 0;

  if (typeof fromIndex == 'number') {
    index = (fromIndex < 0 ? nativeMax(0, length + fromIndex) : fromIndex || 0) - 1;
  } else if (fromIndex) {
    index = sortedIndex(array, value);
    return array[index] === value ? index : -1;
  }
  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}

module.exports = indexOf;
});
require.register("primality/lib/util/isArray.js", function(exports, require, module){
var nativeIsArray = require('./common').nativeIsArray;

module.exports = nativeIsArray;
});
require.register("primality/lib/util/isEqual.js", function(exports, require, module){
var hasOwnProperty = require('./common').hasOwnProperty;
var indicatorObject = require('./common').indicatorObject;
var toString = require('./common').toString;

var createCallback = require('./createCallback');
var forIn = require('./forIn');
var isFunction = require('./isFunction');

var argsClass = '[object Arguments]';
var arrayClass = '[object Array]';
var boolClass = '[object Boolean]';
var dateClass = '[object Date]';
var numberClass = '[object Number]';
var objectClass = '[object Object]';
var regexpClass = '[object RegExp]';
var stringClass = '[object String]';

function isEqual(a, b, callback, thisArg, stackA, stackB) {
  var whereIndicator = callback === indicatorObject;
  if (typeof callback == 'function' && !whereIndicator) {
    callback = createCallback(callback, thisArg, 2);
    var result = callback(a, b);
    if (typeof result != 'undefined') {
      return !!result;
    }
  }
  if (a === b) {
    return a !== 0 || (1 / a == 1 / b);
  }
  var type = typeof a,
      otherType = typeof b;

  if (a === a &&
      (!a || (type != 'function' && type != 'object')) &&
      (!b || (otherType != 'function' && otherType != 'object'))) {
    return false;
  }
  if (a == null || b == null) {
    return a === b;
  }
  var className = toString.call(a),
      otherClass = toString.call(b);

  if (className == argsClass) {
    className = objectClass;
  }
  if (otherClass == argsClass) {
    otherClass = objectClass;
  }
  if (className != otherClass) {
    return false;
  }
  switch (className) {
    case boolClass:
    case dateClass:
      return +a == +b;

    case numberClass:
      return (a != +a)
        ? b != +b
        : (a == 0 ? (1 / a == 1 / b) : a == +b);

    case regexpClass:
    case stringClass:
      return a == String(b);
  }
  var isArr = className == arrayClass;
  if (!isArr) {
    if (hasOwnProperty.call(a, '__wrapped__ ') || hasOwnProperty.call(b, '__wrapped__')) {
      return isEqual(a.__wrapped__ || a, b.__wrapped__ || b, callback, thisArg, stackA, stackB);
    }
    if (className != objectClass) {
      return false;
    }
    var ctorA = a.constructor,
        ctorB = b.constructor;

    if (ctorA != ctorB && !(
          isFunction(ctorA) && ctorA instanceof ctorA &&
          isFunction(ctorB) && ctorB instanceof ctorB
        )) {
      return false;
    }
  }
  stackA || (stackA = []);
  stackB || (stackB = []);

  var length = stackA.length;
  while (length--) {
    if (stackA[length] == a) {
      return stackB[length] == b;
    }
  }
  var size = 0;
  result = true;

  stackA.push(a);
  stackB.push(b);

  if (isArr) {
    length = a.length;
    size = b.length;

    result = size == a.length;
    if (!result && !whereIndicator) {
      return result;
    }
    while (size--) {
      var index = length,
          value = b[size];

      if (whereIndicator) {
        while (index--) {
          if ((result = isEqual(a[index], value, callback, thisArg, stackA, stackB))) {
            break;
          }
        }
      } else if (!(result = isEqual(a[size], value, callback, thisArg, stackA, stackB))) {
        break;
      }
    }
    return result;
  }
  forIn(b, function(value, key, b) {
    if (hasOwnProperty.call(b, key)) {
      size++;
      return (result = hasOwnProperty.call(a, key) && isEqual(a[key], value, callback, thisArg, stackA, stackB));
    }
  });

  if (result && !whereIndicator) {
    forIn(a, function(value, key, a) {
      if (hasOwnProperty.call(a, key)) {
        return (result = --size > -1);
      }
    });
  }
  return result;
}

module.exports = isEqual;
});
require.register("primality/lib/util/isFinite.js", function(exports, require, module){
var nativeIsFinite = require('./common').nativeIsFinite;
var nativeIsNaN = require('./common').nativeIsNaN;

function isFinite(value) {
  return nativeIsFinite(value) && !nativeIsNaN(parseFloat(value));
}

module.exports = isFinite;
});
require.register("primality/lib/util/isFunction.js", function(exports, require, module){
function isFunction(value) {
  return typeof value == 'function';
}

module.exports = isFunction;
});
require.register("primality/lib/util/isNaN.js", function(exports, require, module){
var isNumber = require('./isNumber');

function isNaN(value) {
  return isNumber(value) && value != +value
}

module.exports = isNaN;
});
require.register("primality/lib/util/isNumber.js", function(exports, require, module){
var toString = require('./common').toString;
var numberClass = '[object Number]';

function isNumber(value) {
  return typeof value == 'number' || toString.call(value) == numberClass;
}

module.exports = isNumber;
});
require.register("primality/lib/util/isObject.js", function(exports, require, module){
var objectTypes = require('./common').objectTypes;

function isObject(value) {
  return value ? objectTypes[typeof value] : false;
}

module.exports = isObject;
});
require.register("primality/lib/util/keys.js", function(exports, require, module){
var hasOwnProperty = require('./common').hasOwnProperty;
var nativeKeys = require('./common').nativeKeys;
var objectTypes = require('./common').objectTypes;

var isObject = require('./isObject');

var shimKeys = function (object) {
  var index, iterable = object, result = [];
  if (!iterable) return result;
  if (!(objectTypes[typeof object])) return result;

  for (index in iterable) {
    if (hasOwnProperty.call(iterable, index)) {
      result.push(index);
    }
  }
  return result
};

module.exports = !nativeKeys ? shimKeys : function(object) {
  if (!isObject(object)) {
    return [];
  }
  return nativeKeys(object);
};
});
require.register("primality/lib/util/sortedIndex.js", function(exports, require, module){
var createCallback = require('./createCallback');
var identity = require('./identity');

function sortedIndex(array, value, callback, thisArg) {
  var low = 0,
      high = array ? array.length : low;

  callback = callback ? createCallback(callback, thisArg, 1) : identity;
  value = callback(value);

  while (low < high) {
    var mid = (low + high) >>> 1;
    (callback(array[mid]) < value)
      ? low = mid + 1
      : high = mid;
  }
  return low;
}

module.exports = sortedIndex;
});
require.alias("primality/primality.js", "primality/index.js");

if (typeof exports == "object") {
  module.exports = require("primality");
} else if (typeof define == "function" && define.amd) {
  define(function(){ return require("primality"); });
} else {
  this["primality"] = require("primality");
}})();