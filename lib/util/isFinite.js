var nativeIsFinite = root.isFinite;
var nativeIsNaN = root.isNaN;

function isFinite(value) {
  return nativeIsFinite(value) && !nativeIsNaN(parseFloat(value));
}

module.exports = isFinite;