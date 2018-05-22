module.exports.main = function main() {
    const yargs = require('yargs')
        .usage('Usage: $0 [OPTION]... QUERY [FILE]...')
        .options('p', {
            alias: 'pretty',
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
                const rl = require('readline').createInterface({
                    input: fs.createReadStream(this.options.files.shift())
                });
                await this.consumeReadLine(rl);
            }
            process.exit(0);
        } else {
            const rl = require('readline').createInterface({
                input: process.stdin
            });
            await this.consumeReadLine(rl);
            process.exit(0);
        }
    }
    async consumeReadLine(rl) {
        return new Promise((resolve) => {
            let buffer = "";
            rl.on('line', (line) => {
                buffer += line;
                const result = this.tryAppayQuery(buffer, {});
                if (result) {
                    buffer = "";
                    this.output(result);
                }
            });
            rl.on('close', () => {
                const result = this.tryAppayQuery(buffer, {});
                if (result) {
                    buffer = "";
                    this.output(result);
                }
                resolve();
            });
        });
    }
    createOutPutString(data) {
        return this.options.pretty ? JSON.stringify(data, null, "  ") : JSON.stringify(data);
    }
    output(data) {
        process.stdout.write(this.createOutPutString(data));
        process.stdout.write('\n');
    }
    tryAppayQuery(buffer, vars) {
        if (!buffer) {
            return;
        }
        const data = this.tryParse(buffer);
        if (data) {
            return this.applyQuery(this.options.query, data, vars);
        }
    }
    tryParse(buffer) {
        try {
            return JSON.parse(buffer)
        } catch (e) {
        }
    }
    applyQuery(query, data, vars) {
        const vm = require('vm');
        const context = Object.assign({ _: data }, vars);
        return vm.runInNewContext(query === void 0 || query === null || query === "" ? "''" : query, context);
    }
}