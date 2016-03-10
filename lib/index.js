module.exports = function(json, command) {
  try {
    return (function() {
      var require = void 0;
      var _ = this;
      return eval("(0, " + command + " );");
    }).call(JSON.parse(json));
  } catch (e) {
    process.exit(1);
  }
}
