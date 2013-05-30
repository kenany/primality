var toString = require('./common').toString;
var numberClass = '[object Number]';

function isNumber(value) {
  return typeof value == 'number' || toString.call(value) == numberClass;
}

module.exports = isNumber;