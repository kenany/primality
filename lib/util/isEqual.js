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