'use strict';

module.exports = function(json, options) {
  let context;
  try {
    context = json === "" || json === null || json === void 0 ? "" : JSON.parse(json);
  } catch (e) {
    if (options.debug) {
      console.trace(e);
    }
  }
  return context || "";
}
