module.exports.main = function main() {
    const yargs = require('yargs')
        .usage('Usage: $0 [OPTION]... QUERY [FILE]...')
        .options('p', {
            alias: 'pretty',
            demandOption: true,
            describe: 'enable pretty print',
            type: 'boolean'
        })
        .help()
        .strict();
    if (yargs.argv.help) {
        yargs.showHelp();
        process.exit(0);
    } else if (yargs.argv['_'].length === 0) {
        yargs.showHelp();
        process.exit(1);
    }
    const options = {
        pretty: yargs.argv.pretty,
        query: yargs.argv['_'].shift(),
        files: yargs.argv['_'].concat()
    }
    new Processor(options).run();
};
class Processor {
    constructor(options) {
        this.options = options;
    }
    run() {
        if (this.options.files.length > 0) {
            // use files stream
        } else {
            // use stdin
        }
    }
}