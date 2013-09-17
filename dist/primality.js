/*!
 * primality v1.6.0
 * Copyright 2012–2013 Kenan Yildirim
 *
 * This browser build of primality includes code licensed by other authors.
 * See LICENSE.txt for the full licenses.
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
    if (!module._resolving && !module.exports) {
      var mod = {};
      mod.exports = {};
      mod.client = mod.component = true;
      module._resolving = true;
      module.call(this, mod.exports, require.relative(resolved), mod);
      delete module._resolving;
      module.exports = mod.exports;
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
  require.register("KenanY-factorial/index.js", function(exports, require, module) {
    module.exports = factorial;
    function factorial(v) {
      return v === 0 ? 1 : v * factorial(v - 1);
    }
  });
  require.register("component-global/index.js", function(exports, require, module) {
    module.exports = function() {
      return this;
    }();
  });
  require.register("KenanY-is-finite/index.js", function(exports, require, module) {
    var global = require("global");
    var nativeIsFinite = global.isFinite;
    var nativeIsNaN = global.isNaN;
    module.exports = function(value) {
      return nativeIsFinite(value) && !nativeIsNaN(parseFloat(value));
    };
  });
  require.register("KenanY-is-nan/index.js", function(exports, require, module) {
    var numberClass = "[object Number]";
    var objectProto = Object.prototype;
    var toString = objectProto.toString;
    function isNumber(value) {
      return typeof value == "number" || toString.call(value) == numberClass;
    }
    module.exports = function(value) {
      return isNumber(value) && value != +value;
    };
  });
  require.register("yields-isArray/index.js", function(exports, require, module) {
    var isArray = Array.isArray;
    var str = Object.prototype.toString;
    module.exports = isArray || function(val) {
      return !!val && "[object Array]" == str.call(val);
    };
  });
  require.register("Nami-Doc-contains/index.js", function(exports, require, module) {
    module.exports = function(arr, el) {
      if ("string" === typeof arr) return !!~arr.indexOf(el);
      var i = 0, len = arr.length >>> 0;
      while (i < len) {
        if (el === arr[i++]) {
          return true;
        }
      }
      return false;
    };
  });
  require.register("primality/primality.js", function(exports, require, module) {
    var factorial = require("factorial");
    var _ = {};
    try {
      _.contains = require("lodash.contains");
      _.isArray = require("lodash.isarray");
      _.isFinite = require("lodash.isfinite");
      _.isNaN = require("lodash.isnan");
    } catch (e) {
      _.contains = require("contains");
      _.isArray = require("isArray");
      _.isFinite = require("is-finite");
      _.isNaN = require("is-nan");
    }
    var WILSON_PRIMES = [ 5, 13, 563 ];
    var WIEFERICH_PRIMES = [ 1093, 3511 ];
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
    var primality = function(input) {
      if (input === null || input === "") return null; else if (_.isArray(input)) {
        var i = input.length;
        while (i--) {
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
      return _.contains(WILSON_PRIMES, value) ? true : (factorial(value - 1) + 1) % Math.pow(value, 2) === 0;
    }
    function isWieferichPrime(value) {
      return _.contains(WIEFERICH_PRIMES, value) ? true : (Math.pow(2, value - 1) - 1) % Math.pow(value, 2) === 0;
    }
    primality.VERSION = "1.6.0";
    primality.areTwinPrimes = areTwinPrimes;
    primality.areCousinPrimes = areCousinPrimes;
    primality.areSexyPrimes = areSexyPrimes;
    primality.isWilsonPrime = isWilsonPrime;
    primality.isWieferichPrime = isWieferichPrime;
    (module.exports = primality).primality = primality;
  });
  require.alias("KenanY-factorial/index.js", "primality/deps/factorial/index.js");
  require.alias("KenanY-factorial/index.js", "primality/deps/factorial/index.js");
  require.alias("KenanY-factorial/index.js", "factorial/index.js");
  require.alias("KenanY-factorial/index.js", "KenanY-factorial/index.js");
  require.alias("KenanY-is-finite/index.js", "primality/deps/is-finite/index.js");
  require.alias("KenanY-is-finite/index.js", "is-finite/index.js");
  require.alias("component-global/index.js", "KenanY-is-finite/deps/global/index.js");
  require.alias("KenanY-is-nan/index.js", "primality/deps/is-nan/index.js");
  require.alias("KenanY-is-nan/index.js", "is-nan/index.js");
  require.alias("yields-isArray/index.js", "primality/deps/isArray/index.js");
  require.alias("yields-isArray/index.js", "isArray/index.js");
  require.alias("Nami-Doc-contains/index.js", "primality/deps/contains/index.js");
  require.alias("Nami-Doc-contains/index.js", "contains/index.js");
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