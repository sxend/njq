const vm = require('vm');
module.exports = function (command, args) {
  const scope = void 0;
  const context = { _: this };
  for (let arg in args) {
    context[arg] = args[arg];
  }
  return vm.runInNewContext(command === void 0 || command === null || command === "" ? "''" : command, context);
}
