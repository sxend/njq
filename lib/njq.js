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
    .options("arg", {
      describe: "key-value pair of passing to query [--arg KEY VALUE]",
      default: [],
      type: "array"
    })
    .nargs("arg", 2)
    .help()
    .strict();
  if (yargs.argv.help) {
    yargs.showHelp();
    process.exit(0);
  } else if (yargs.argv["_"].length === 0) {
    yargs.showHelp();
    process.exit(1);
  }
  const queryAndFiles = yargs.argv["_"].concat();
  const options = {
    pretty: yargs.argv.pretty,
    args: arrayToMap(yargs.argv.arg.concat()),
    query: queryAndFiles.shift(),
    files: queryAndFiles
  };
  await QueryProcessor.process(options);
};
function arrayToMap(arg) {
  const args = {};
  while (arg.length > 0) {
    args[arg.shift()] = arg.shift();
  }
  return args;
}
class QueryProcessor extends stream.Transform {
  constructor(options) {
    super();
    this.options = options;
    this._buffer = "";
  }
  static async process(options) {
    const sources =
      options.files.length > 0
        ? options.files.map(_ => fs.createReadStream(_))
        : [process.stdin];
    for (const source of sources) {
      source.pipe(new QueryProcessor(options)).pipe(process.stdout);
      await new Promise(resolve => source.on("end", resolve));
    }
  }
  _transform(chunk, encoding, callback) {
    this._buffer += chunk;
    const result = this.tryAppayQuery(this._buffer);
    if (result) {
      this._buffer = "";
      return callback(null, this.reStringify(result) + "\n");
    }
    callback(null);
  }
  tryAppayQuery(buffer) {
    const parsed = this.tryParse(buffer);
    if (parsed) {
      return this.applyQuery(parsed);
    }
  }
  tryParse(buffer) {
    try {
      return JSON.parse(buffer);
    } catch (e) {}
  }
  applyQuery(data) {
    const context = Object.assign({ _: data }, this.options.args);
    return vm.runInNewContext(this.options.query, context);
  }
  reStringify(data) {
    return this.options.pretty
      ? JSON.stringify(data, null, "  ")
      : JSON.stringify(data);
  }
}
module.exports.QueryProcessor = QueryProcessor;
