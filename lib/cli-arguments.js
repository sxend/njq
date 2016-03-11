'use strict';

module.exports = function(args) {
  let cliArg = {};
  let argv = require('optimist')
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
  let commands = argv['_'];

  let arg = {};
  if (argv.arg) {
    let keys = [].concat(argv.arg);
    for (let i = 0; i < keys.length; i++) {
      arg[keys[i]] = commands.shift();
    }
  }
  cliArg.options.arg = arg;
  cliArg.commands = commands;
  return cliArg;
}
