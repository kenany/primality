/*!
 * primality v1.5.7
 * (c) 2012–2013 Kenan Yildirim
 *
 * Includes functions from Lo-Dash
 * (c) 2012–2013 The Dojo Foundation
 *
 * Available under MIT license
 */
(function() {
  function require(path, parent, orig) {
    var resolved = require.resolve(path);
    if (null == resolved) {
      orig = orig || path;
      parent = parent || "root";
      var err = new Error('Failed to require "' + orig + '" from "' + parent + '"');
      err.path = orig;
      err.parent = parent;
      err.require = true;
      throw err;
    }
    var module = require.modules[resolved];
    if (!module.exports) {
      module.exports = {};
      module.client = module.component = true;
      module.call(this, module.exports, require.relative(resolved), module);
    }
    return module.exports;
  }
  require.modules = {};
  require.aliases = {};
  require.resolve = function(path) {
    if (path.charAt(0) === "/") path = path.slice(1);
    var paths = [ path, path + ".js", path + ".json", path + "/index.js", path + "/index.json" ];
    for (var i = 0; i < paths.length; i++) {
      var path = paths[i];
      if (require.modules.hasOwnProperty(path)) return path;
      if (require.aliases.hasOwnProperty(path)) return require.aliases[path];
    }
  };
  require.normalize = function(curr, path) {
    var segs = [];
    if ("." != path.charAt(0)) return path;
    curr = curr.split("/");
    path = path.split("/");
    for (var i = 0; i < path.length; ++i) {
      if (".." == path[i]) {
        curr.pop();
      } else if ("." != path[i] && "" != path[i]) {
        segs.push(path[i]);
      }
    }
    return curr.concat(segs).join("/");
  };
  require.register = function(path, definition) {
    require.modules[path] = definition;
  };
  require.alias = function(from, to) {
    if (!require.modules.hasOwnProperty(from)) {
      throw new Error('Failed to alias "' + from + '", it does not exist');
    }
    require.aliases[to] = from;
  };
  require.relative = function(parent) {
    var p = require.normalize(parent, "..");
    function lastIndexOf(arr, obj) {
      var i = arr.length;
      while (i--) {
        if (arr[i] === obj) return i;
      }
      return -1;
    }
    function localRequire(path) {
      var resolved = localRequire.resolve(path);
      return require(resolved, parent, path);
    }
    localRequire.resolve = function(path) {
      var c = path.charAt(0);
      if ("/" == c) return path.slice(1);
      if ("." == c) return require.normalize(p, path);
      var segs = parent.split("/");
      var i = lastIndexOf(segs, "deps") + 1;
      if (!i) i = 0;
      path = segs.slice(0, i + 1).join("/") + "/deps/" + path;
      return path;
    };
    localRequire.exists = function(path) {
      return require.modules.hasOwnProperty(localRequire.resolve(path));
    };
    return localRequire;
  };
  require.register("primality/primality.js", function(exports, require, module) {
    var primality;
    var WILSON_PRIMES = [ 5, 13, 563 ];
    var _ = require("./lib/util/");
    function factorial(value) {
      return value === 0 ? 1 : value * factorial(value - 1);
    }
    function mod(x, y) {
      if (y > 0) {
        if (x > 0) {
          return x % y;
        } else if (x === 0) {
          return 0;
        } else {
          return x - y * Math.floor(x / y);
        }
      } else if (y === 0) {
        return x;
      } else {
        throw new Error("Cannot calculate mod for a negative divisor");
      }
    }
    function leastFactor(n) {
      if (n === 0) return 0; else if (n % 1 || n * n < 2) return 1; else if (n % 2 === 0) return 2; else if (n % 3 === 0) return 3; else if (n % 5 === 0) return 5;
      var m = Math.sqrt(n);
      for (var i = 7; i <= m; i += 30) {
        if (n % i === 0) return i; else if (n % (i + 4) === 0) return i + 4; else if (n % (i + 6) === 0) return i + 6; else if (n % (i + 10) === 0) return i + 10; else if (n % (i + 12) === 0) return i + 12; else if (n % (i + 16) === 0) return i + 16; else if (n % (i + 22) === 0) return i + 22; else if (n % (i + 24) === 0) return i + 24;
      }
      return n;
    }
    function isPrime(value) {
      if (_.isNaN(value) || !_.isFinite(value) || value % 1 || value < 2) {
        return false;
      }
      if (value !== leastFactor(value)) return false;
      return true;
    }
    primality = function(input) {
      if (input === null || input === "") return null; else if (_.isArray(input)) {
        for (var i = 0, l = input.length; i < l; i++) {
          if (!isPrime(input[i])) return false;
        }
        return true;
      } else return isPrime(input);
    };
    function isRelated(a, b, difference) {
      return Math.abs(a - b) !== difference ? false : primality([ a, b ]);
    }
    function areTwinPrimes(a, b) {
      return isRelated(a, b, 2);
    }
    function areCousinPrimes(a, b) {
      return isRelated(a, b, 4);
    }
    function areSexyPrimes(a, b) {
      return isRelated(a, b, 6);
    }
    function isWilsonPrime(value) {
      return _.contains(WILSON_PRIMES, value) ? true : mod(factorial(value - 1) + 1, Math.pow(value, 2)) === 0;
    }
    primality.VERSION = "1.5.7";
    primality.areTwinPrimes = areTwinPrimes;
    primality.areCousinPrimes = areCousinPrimes;
    primality.areSexyPrimes = areSexyPrimes;
    primality.isWilsonPrime = isWilsonPrime;
    (module.exports = primality).primality = primality;
  });
  require.register("primality/lib/util/index.js", function(exports, require, module) {
    var _ = {};
    _.contains = require("./contains");
    _.isArray = require("./isArray");
    _.isFinite = require("./isFinite");
    _.isNaN = require("./isNaN");
    module.exports = _;
  });
  require.register("primality/lib/util/contains.js", function(exports, require, module) {
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
  require.register("primality/lib/util/isArray.js", function(exports, require, module) {
    var reNative = RegExp("^" + String(Object.prototype.valueOf).replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/valueOf|for [^\]]+/g, ".+?") + "$");
    var nativeIsArray = reNative.test(nativeIsArray = Array.isArray) && nativeIsArray;
    var isArray = nativeIsArray || function(value) {
      return value ? typeof value == "object" && toString.call(value) == arrayClass : false;
    };
    module.exports = isArray;
  });
  require.register("primality/lib/util/isFinite.js", function(exports, require, module) {
    var nativeIsFinite = root.isFinite;
    var nativeIsNaN = root.isNaN;
    function isFinite(value) {
      return nativeIsFinite(value) && !nativeIsNaN(parseFloat(value));
    }
    module.exports = isFinite;
  });
  require.register("primality/lib/util/isNaN.js", function(exports, require, module) {
    var toString = Object.prototype.toString;
    var numberClass = "[object Number]";
    function isNumber(value) {
      return typeof value == "number" || toString.call(value) == numberClass;
    }
    function isNaN(value) {
      return isNumber(value) && value != +value;
    }
    module.exports = isNaN;
  });
  require.alias("primality/primality.js", "primality/index.js");
  var objectTypes = {
    "boolean": false,
    "function": true,
    object: true,
    number: false,
    string: false,
    undefined: false
  };
  var root = objectTypes[typeof window] && window || this;
  var freeExports = objectTypes[typeof exports] && exports;
  var freeModule = objectTypes[typeof module] && module && module.exports == freeExports && module;
  var freeGlobal = objectTypes[typeof global] && global;
  if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal)) {
    root = freeGlobal;
  }
  var primality = require("primality");
  if (typeof define == "function" && typeof define.amd == "object" && define.amd) {
    root.primality = primality;
    define(function() {
      return primality;
    });
  } else if (freeExports && !freeExports.nodeType) {
    if (freeModule) {
      (freeModule.exports = primality).primality = primality;
    } else {
      freeExports.primality = primality;
    }
  } else {
    root.primality = primality;
  }
}).call(this);