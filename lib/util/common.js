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