module.exports = function(__command, __args) {
  const _ = this;
  const module = void 0;
  const exports = void 0;
  const require = void 0;
  const scope = void 0;
  for (let __name in __args) {
    eval("var " + __name + " = '" + __args[__name] + "';");
  }
  return eval("(0, " + (__command === void 0 || __command === null || __command === "" ? "''" : __command) + " );");
}
