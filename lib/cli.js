'use strict';
let fs = require('fs');
let njq = require('./index.js');
let CliArguments = require('./cli-arguments.js');

module.exports = function() {
  let cliArg = CliArguments(process.argv.slice(2));
  let lines = [];
  let reader = require('readline').createInterface({
    input: process.stdin
  });
  reader.on('line', function(line) {
    lines.push(line);
  });
  process.stdin.on('end', function() {
    let result = execute(lines.join('\n'), cliArg);
    if (process.stdout.isTTY) {
      console.log(result.toString());
    } else {
      stdOutput(result.toString(), cliArg.options);
    }
  });
}

function execute(json, cliArg) {
  let result = njq(json, cliArg.commands, cliArg.options);

  result = result === void 0 || result === null ? String(result) : result;

  if (Object.prototype.toString.call(Object(result)) !== '[object String]') {
    result = cliArg.options.pretty ? JSON.stringify(result, null, "  ") : JSON.stringify(result) || "";
  }
  return result;
}

function stdOutput(result) {
  process.stdout.on('error', function(err) {
    if (err.code === "EPIPE") {
      process.exit(0);
    }
  });
  process.stdout.write(result + '\n');
}
