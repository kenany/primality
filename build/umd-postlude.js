  var objectTypes = {
    'boolean': false,
    'function': true,
    'object': true,
    'number': false,
    'string': false,
    'undefined': false
  };

  var root = (objectTypes[typeof window] && window) || this;

  var freeExports = objectTypes[typeof exports] && exports;

  var freeModule = objectTypes[typeof module] && module && module.exports == freeExports && module;

  var freeGlobal = objectTypes[typeof global] && global;
  if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal)) {
    root = freeGlobal;
  }

  var primality = require('primality');

  if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
    root.primality = primality;
    define(function() {
      return primality;
    });
  }
  else if (freeExports && !freeExports.nodeType) {
    if (freeModule) {
      (freeModule.exports = primality).primality = primality;
    }
    else {
      freeExports.primality = primality;
    }
  }
  else {
    root.primality = primality;
  }
}.call(this));