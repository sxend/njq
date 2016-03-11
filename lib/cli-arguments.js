var argv = require('optimist')
  .boolean(['h', 'p', 's', 'v', 'DEBUG'])
  .alias('h', 'help')
  .alias('p', 'pretty')
  .alias('s', 'stream')
  .alias('v', 'verbose')
  .string('foo')
  .argv
exports.options = {
  help: argv.help,
  pretty: argv.pretty,
  stream: argv.stream,
  verbose: argv.verbose,
  debug: argv.DEBUG
};
var commands = argv['_'];

var arg = {};
if (argv.arg) {
  var keys = [].concat(argv.arg);
  for (var i = 0; i < keys.length; i++) {
    arg[keys[i]] = commands.shift();
  }
}
exports.arg = arg;
exports.commands = commands;
