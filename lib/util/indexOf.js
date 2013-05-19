var sortedIndex = require('./sortedIndex');

var nativeMax = require('./common').nativeMax;

function indexOf(array, value, fromIndex) {
  var index = -1,
      length = array ? array.length : 0;

  if (typeof fromIndex == 'number') {
    index = (fromIndex < 0 ? nativeMax(0, length + fromIndex) : fromIndex || 0) - 1;
  } else if (fromIndex) {
    index = sortedIndex(array, value);
    return array[index] === value ? index : -1;
  }
  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}

module.exports = indexOf;