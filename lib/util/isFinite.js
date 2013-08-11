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