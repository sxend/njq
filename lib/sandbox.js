const vm = require('vm');
module.exports = function (data, command, args) {
  const context = Object.assign({ _: data }, args);
  return vm.runInNewContext(command === void 0 || command === null || command === "" ? "''" : command, context);
}
