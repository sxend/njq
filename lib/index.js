module.exports = function njq(__json, __commands, __options) {
  __options = __options || {};
  __commands = [].concat(__commands);
  try {
    return (function() {
      var _ = this;
      for (var __i = 0; __i === 0 || __i < __commands.length; __i++) {
        _ = eval("(0, " + (__isEmpty(__commands[__i]) ? "''" : __commands[__i]) + " );");
      }
      return _;
    }).call(__parse(__json, __options));
  } catch (e) {
    if (__options.verbose) {
      console.error(e.stack);
    }
  }
}

function __isEmpty(o) {
  return o === void 0 || o === null || o === "";
}

function __parse(__json, __options) {
  try {
    return JSON.parse(__json);
  } catch (e) {
    if (__options.debug) {
      console.trace(e);
    }
  }
  return "";
}
