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
    const queries = yargs.argv['_'].concat();
    const options = {
        pretty: yargs.argv.pretty,
        query: queries.shift(),
        files: queries.concat()
    }
    new Processor(options).process();
};
class Processor {
    constructor(options) {
        this.options = options;
    }
    async process() {
        if (this.options.files.length > 0) {
            const fs = require('fs');
            while (this.options.files.length > 0) {
                const reader = require('readline').createInterface({
                    input: fs.createReadStream(this.options.files.shift())
                });
                await this.startReader(reader);
            }
            process.exit(0);
        } else {
            const reader = require('readline').createInterface({
                input: process.stdin
            });
            await this.startReader(reader);
            process.exit(0);
        }
    }
    async startReader(reader) {
        return new Promise((resolve) => {
            let buffer = "";
            reader.on('line', (line) => {
                buffer += line;
                const result = this.tryAppayQuery(buffer, {});
                if (result) {
                    buffer = "";
                    this.output(result);
                }
            });
            reader.on('close', () => {
                const result = this.tryAppayQuery(buffer, {});
                if (result) {
                    buffer = "";
                    this.output(result);
                }
                resolve();
            });
        });
    }
    output(result) {
        process.stdout.write((this.options.pretty ? JSON.stringify(result, null, "  ") : JSON.stringify(result)) + '\n');
    }
    tryAppayQuery(buffer, vars) {
        if (!buffer) {
            return;
        }
        let data;
        let result;
        try {
            data = JSON.parse(buffer);
        } catch (e) {
        }
        if (data) {
            result = this.applyQuery(this.options.query, data, vars);
        }
        return result;
    }
    applyQuery(query, data, vars) {
        const vm = require('vm');
        const context = Object.assign({ _: data }, vars);
        return vm.runInNewContext(query === void 0 || query === null || query === "" ? "''" : query, context);
    }
}