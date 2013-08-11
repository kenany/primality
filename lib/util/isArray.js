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