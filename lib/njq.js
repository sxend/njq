const fs = require("fs");
const stream = require("stream");
const vm = require("vm");

module.exports.main = async function main() {
  const yargs = require("yargs")
    .usage("Usage: $0 [OPTION]... QUERY [FILE]...")
    .options("p", {
      alias: "pretty",
      describe: "enable pretty print",
      type: "boolean"
    })
    .help()
    .strict();
  if (yargs.argv.help) {
    yargs.showHelp();
    process.exit(0);
  } else if (yargs.argv["_"].length === 0) {
    yargs.showHelp();
    process.exit(1);
  }
  const queries = yargs.argv["_"].concat();
  const options = {
    pretty: yargs.argv.pretty,
    args: yargs.argv.args,
    query: queries.shift(),
    files: queries.concat()
  };
  await QueryProcessor.process(options);
};

class QueryProcessor extends stream.Transform {
  constructor(options) {
    super();
    this.options = options;
    this._buffer = "";
  }
  static async process(options) {
    if (options.files.length > 0) {
      while (options.files.length > 0) {
        const fileStream = fs.createReadStream(options.files.shift());
        fileStream.pipe(new QueryProcessor(options)).pipe(process.stdout);
        await new Promise(resolve => fileStream.on("end", resolve));
      }
    } else {
      process.stdin.pipe(new QueryProcessor(options)).pipe(process.stdout);
      await new Promise(resolve => process.stdin.on("end", resolve));
    }
  }
  _transform(chunk, encoding, callback) {
    this._buffer += chunk;
    const result = this.tryAppayQuery();
    if (result) {
      this._buffer = "";
      return callback(null, this.createOutPutString(result) + "\n");
    }
    callback(null);
  }
  tryAppayQuery() {
    const parsed = this.tryParse();
    if (parsed) {
      return this.applyQuery(parsed);
    }
  }
  tryParse() {
    if (!this._buffer) {
      return;
    }
    try {
      return JSON.parse(this._buffer);
    } catch (e) {}
  }
  applyQuery(data) {
    const query = this.options.query;
    const context = Object.assign({ _: data }, this.options.args);
    return vm.runInNewContext(
      query === void 0 || query === null || query === "" ? "''" : query,
      context
    );
  }
  createOutPutString(data) {
    return this.options.pretty
      ? JSON.stringify(data, null, "  ")
      : JSON.stringify(data);
  }
}