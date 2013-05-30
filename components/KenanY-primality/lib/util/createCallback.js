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