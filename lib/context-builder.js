'use strict';

module.exports = function(json, options) {
  let context;
  try {
    context = JSON.parse(json);
  } catch (e) {
    if (options.debug) {
      console.trace(e);
    }
  }
  return context || "";
}
