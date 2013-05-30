var objectTypes = require('./common').objectTypes;

var createCallback = require('./createCallback');

var forIn = function (collection, callback, thisArg) {
  var index, iterable = collection, result = iterable;
  if (!iterable) return result;
  if (!objectTypes[typeof iterable]) return result;
  callback = callback && typeof thisArg == 'undefined' ? callback : createCallback(callback, thisArg);

  for (index in iterable) {
    if (callback(iterable[index], index, collection) === false) return result;
  }
  return result
};

module.exports = forIn;