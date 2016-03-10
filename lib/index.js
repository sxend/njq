module.exports = function(json, command, options) {
  try {
    return (function() {
      var _ = this;
      return eval("(0, " + command + " );");
    }).call(JSON.parse(json));
  } catch (e) {
    if (options.verbose) {
      console.error(e.stack);
    }
    process.exit(1);
  }
}
