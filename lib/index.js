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
    let args = Object.keys(options.arg || {}).map((name) => {
      return "var " + name + " = '" + options.arg[name] + "';"
    });
    for (let i = 0; i === 0 || i < commands.length; i++) {
      let command = commands[i] === void 0 || commands[i] === null || commands[i] === "" ? "''" : commands[i];
      context = scope.call(context, command, args);
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
  for (var __i = 0; __i < __args.length; __i++) {
    eval(__args[__i]);
  }
  return eval("(0, " + __command + " );");
}
