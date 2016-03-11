module.exports = function njq(__json, __commands, __options) {
  __options = __options || {};
  __commands = [].concat(__commands);
  try {
    return (function() {
      var _ = this;
      // FIXME hide global object 
      return eval("(0, " + (__isEmpty(__commands[0]) ? "''" : __commands[0]) + " );");
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
