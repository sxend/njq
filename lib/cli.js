var minimist = require('minimist');
var fs = require('fs');
var njq = require('./index');

module.exports = function() {
  var options = minimist(process.argv.slice(2)) || {};

  var json = fs.readFileSync('/dev/stdin', 'utf8'); // FIXME remove dev/stdin
  var result = njq(json, process.argv[process.argv.length - 1], options);

  result = result === void 0 || result === null ? String(result) : result;

  if (Object.prototype.toString.call(Object(result)) !== '[object String]') {
    result = options.pretty ? JSON.stringify(result, null, " ") : JSON.stringify(result);
  }

  console.log(result); // FIXME
}
