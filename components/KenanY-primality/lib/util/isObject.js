var objectTypes = require('./common').objectTypes;

function isObject(value) {
  return value ? objectTypes[typeof value] : false;
}

module.exports = isObject;