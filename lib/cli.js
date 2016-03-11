'use strict';
let fs = require('fs');
let njq = require('./index.js');
let cliArg = require('./cli-arguments.js')(process.argv.slice(2));

module.exports = function() {
  let lines = [];
  let reader = require('readline').createInterface({
    input: process.stdin
  });
  reader.on('line', function(line) {
    lines.push(line);
  });
  process.stdin.on('end', function() {
    let result = njq(lines.join('\n'), cliArg.commands, cliArg.options);

    result = result === void 0 || result === null ? String(result) : result;

    if (Object.prototype.toString.call(Object(result)) !== '[object String]') {
      result = cliArg.options.pretty ? JSON.stringify(result, null, "  ") : JSON.stringify(result) || "";
    }
    if (process.stdout.isTTY) {
      console.log(result.toString());
    } else {
      process.stdout.on('error', function(err) {
        if (err.code == "EPIPE") {
          process.exit(0);
        }
      });
      process.stdout.write(result.toString() + '\n');
    }
  });
}
