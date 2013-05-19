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