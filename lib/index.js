module.exports = function(json, commands, options) {
  'use strict';
  options = options || {};
  commands = [].concat(commands);
  try {
    let context = "";
    try {
      context = JSON.parse(json);
    } catch (e) {
      if (options.debug) {
        console.trace(e);
      }
    }
    for (let i = 0; i === 0 || i < commands.length; i++) {
      context = scope.call(context, commands[i], options.arg);
    }
    return context;
  } catch (e) {
    if (options.verbose) {
      console.error(e.stack);
    }
  }
}

function scope(__command, __args) {
  var _ = this;
  var module = void 0;
  var exports = void 0;
  var require = void 0;
  var scope = void 0;
  for (var __name in __args) {
    eval("var " + __name + " = '" + __args[__name] + "';");
  }
  return eval("(0, " + (__command === void 0 || __command === null || __command === "" ? "''" : __command) + " );");
}
