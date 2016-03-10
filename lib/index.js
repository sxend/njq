module.exports = function(json, command) {
  try {
    var _ = JSON.parse(json);
    eval([
      "var result = (function() {",
      "return (0, " + command + " );",
      "})();"
    ].join("\n"));
    return result === void 0 ? "" : result;
  } catch (e) {
    process.exit(1);
  }
}
