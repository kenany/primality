  var objectTypes = {
    'boolean': false,
    'function': true,
    'object': true,
    'number': false,
    'string': false,
    'undefined': false
  };

  var freeExports = objectTypes[typeof exports] && exports;

  var freeModule = objectTypes[typeof module] && module && module.exports == freeExports && module;

  var freeGlobal = objectTypes[typeof global] && global;
  if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal)) {
    window = freeGlobal;
  }

  if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
    window.primality = require('primality');
    define(function() {
      return require('primality');
    });
  }
  else if (freeExports && !freeExports.nodeType) {
    if (freeModule) {
      (freeModule.exports = require('primality')).primality = require('primality');
    }
    else {
      freeExports.primality = require('primality');
    }
  }
  else {
    window.primality = require('primality');
  }
}(this));