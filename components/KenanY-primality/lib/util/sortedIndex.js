var createCallback = require('./createCallback');
var identity = require('./identity');

function sortedIndex(array, value, callback, thisArg) {
  var low = 0,
      high = array ? array.length : low;

  callback = callback ? createCallback(callback, thisArg, 1) : identity;
  value = callback(value);

  while (low < high) {
    var mid = (low + high) >>> 1;
    (callback(array[mid]) < value)
      ? low = mid + 1
      : high = mid;
  }
  return low;
}

module.exports = sortedIndex;