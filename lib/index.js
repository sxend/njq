'use strict';

let scope = require('./scope.js');

module.exports = function(json, commands, options) {

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
