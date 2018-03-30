const vm = require('vm');
module.exports = function (__command, __args) {
  const scope = void 0;
  const context = { _: this };
  for (let __name in __args) {
    context[__name] = __args[__name];
  }
  return vm.runInNewContext(__command === void 0 || __command === null || __command === "" ? "''" : __command, context);
}
