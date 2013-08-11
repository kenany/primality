var nativeMax = Math.max;

function basicIndexOf(array, value) {
  var index = -1;
  var length = array.length;

  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}

function contains(collection, target) {
  return basicIndexOf(collection, target) > -1;
}

module.exports = contains;