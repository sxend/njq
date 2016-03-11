module.exports = function(__command, __args) {
  var _ = this;
  var module = void 0;
  var exports = void 0;
  var require = void 0;
  var scope = void 0;
  for (var __name in __args) {
    eval("var " + __name + " = '" + __args[__name] + "';");
  }
  return eval("(0, " + (__command === void 0 || __command === null || __command === "" ? "''" : __command) + " );");
}
