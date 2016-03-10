module.exports = function() {
  var json = require('fs').readFileSync('/dev/stdin', 'utf8');
  var result = require('./index')(json, process.argv[2]);
  result = result === void 0 || result === null ? String(result) : result;
  if (Object.prototype.toString.call(Object(result)) !== '[object String]') {
    result = JSON.stringify(result, null, " ");
  }
  console.log(result);
}
