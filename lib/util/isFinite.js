var nativeIsFinite = require('./common').nativeIsFinite;
var nativeIsNaN = require('./common').nativeIsNaN;

function isFinite(value) {
  return nativeIsFinite(value) && !nativeIsNaN(parseFloat(value));
}

module.exports = isFinite;