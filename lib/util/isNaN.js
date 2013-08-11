var toString = Object.prototype.toString;
var numberClass = '[object Number]';

function isNumber(value) {
  return typeof value == 'number' || toString.call(value) == numberClass;
}

function isNaN(value) {
  return isNumber(value) && value != +value;
}

module.exports = isNaN;