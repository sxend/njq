var fs = require('fs');
var njq = require('./index.js');
var cliArg = require('./cli-arguments.js')(process.argv.slice(2));

module.exports = function() {
  var lines = [];
  var reader = require('readline').createInterface({
    input: process.stdin
  });
  reader.on('line', function(line) {
    lines.push(line);
  });
  process.stdin.on('end', function() {
    var result = njq(lines.join('\n'), cliArg.commands, cliArg.options);

    result = result === void 0 || result === null ? String(result) : result;

    if (Object.prototype.toString.call(Object(result)) !== '[object String]') {
      result = cliArg.options.pretty ? JSON.stringify(result, null, "  ") : JSON.stringify(result);
    }

    console.log(result.toString()); // FIXME
  });
}
