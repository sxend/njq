'use strict';

const sandbox = require('./sandbox.js');
const Context = require('./context-builder.js');

module.exports = function(data, commands, options) {
  if (isString(data)) {
    data = Context(data, options);
  }
  options = options || {};
  commands = [].concat(commands);
  try {
    for (let i = 0; i === 0 || i < commands.length; i++) {
      data = sandbox(data, commands[i], options.arg);
    }
    return data;
  } catch (e) {
    if (options.verbose) {
      console.error(e.stack);
    }
  }
}

const ProtoToString = Object.prototype.toString;

function isString(data) {
  return ProtoToString.call(data) === '[object String]';
}