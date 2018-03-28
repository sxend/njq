'use strict';

module.exports = function(args) {
  const cliArg = {};
  const argv = require('optimist')
    .boolean(['p', 'v', 'DEBUG'])
    .alias('p', 'pretty')
    .alias('v', 'verbose')
    .parse(args);
  cliArg.options = {
    help: argv.help,
    pretty: argv.pretty,
    stream: argv.stream,
    verbose: argv.verbose,
    debug: argv.DEBUG
  };
  const commands = argv['_'];

  const arg = {};
  if (argv.arg) {
    const keys = [].concat(argv.arg);
    for (let i = 0; i < keys.length; i++) {
      arg[keys[i]] = commands.shift();
    }
  }
  cliArg.options.arg = arg;
  cliArg.commands = commands;
  return cliArg;
}
