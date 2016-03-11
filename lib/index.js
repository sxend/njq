module.exports = function njq(__json, __commands, __options) {
  __commands = [].concat(__commands);
  try {
    return (function() {
      var _ = this;
      return eval("(0, " + __commands[0] + " );");
    }).call(JSON.parse(__json));
  } catch (e) {
    if (__options.verbose) {
      console.error(e.stack);
    }
    process.exit(1);
  }
}
