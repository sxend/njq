'use strict';

let sandbox = require('./sandbox.js');
let Context = require('./context-builder.js');

module.exports = function(json, commands, options) {
  options = options || {};
  commands = [].concat(commands);
  try {
    let context = Context(json, options);
    for (let i = 0; i === 0 || i < commands.length; i++) {
      context = sandbox.call(context, commands[i], options.arg);
    }
    return context;
  } catch (e) {
    if (options.verbose) {
      console.error(e.stack);
    }
  }
}
