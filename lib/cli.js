'use strict';
const fs = require('fs');
const njq = require('./index.js');
const CliArguments = require('./cli-arguments.js');
const Context = require('./context-builder.js');

module.exports = function(args, callback) {
  const cliArg = CliArguments(args);
  const reader = require('readline').createInterface({
    input: process.stdin
  });
  let buffer = "";
  reader.on('line', function(line) {
    buffer += line;
    buffer += "\n";
    const data = Context(buffer, cliArg.options);
    if (!data) {
      return;
    }
    buffer = "";
    const result = execute(data, cliArg);
    if (process.stdout.isTTY) {
      console.log(result);
    } else {
      stdOutput(result);
    }
    if (callback) {
      callback(result);
    }
  });
}
function execute(data, cliArg) {
  let result = njq(data, cliArg.commands, cliArg.options);
  result = result === void 0 || result === null ? String(result) : result;

  if (Object.prototype.toString.call(Object(result)) !== '[object String]') {
    result = cliArg.options.pretty ? JSON.stringify(result, null, "  ") : JSON.stringify(result) || "";
  }
  return result;
}

function stdOutput(data) {
  process.stdout.on('error', function(err) {
    if (err.code === "EPIPE") {
      process.exit(0);
    }
  });
  process.stdout.write(data + '\n');
}
