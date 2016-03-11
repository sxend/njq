var fs = require('fs');
var njq = require('./index.js');
var cliArg = require('./cli-arguments.js')(process.argv.slice(2));

module.exports = function() {
  var json = fs.readFileSync('/dev/stdin', 'utf8'); // FIXME remove dev/stdin
  var result = njq(json, cliArg.commands, cliArg.options);

  result = result === void 0 || result === null ? String(result) : result;

  if (Object.prototype.toString.call(Object(result)) !== '[object String]') {
    result = cliArg.options.pretty ? JSON.stringify(result, null, "  ") : JSON.stringify(result);
  }

  console.log(result.toString()); // FIXME
}
