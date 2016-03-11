var assert = require('assert');
var sample = {
  "message": "value"
};
var json = JSON.stringify(sample);
var options = {
  verbose: true,
  debug: true
}
var buildContext = require('../lib/context-builder.js');

describe("context-builder", function() {
  describe('apply ' + json, function() {
    it('returns ' + json, function() {
      assert.equal(JSON.stringify(buildContext(json, options)), json);
    });
  });
  describe('apply null', function() {
    it('returns ""', function() {
      assert.equal(buildContext(null, options), "");
    });
  });
  describe('apply void 0', function() {
    it('returns ""', function() {
      assert.equal(buildContext(void 0, options), "");
    });
  });
  describe('apply ""', function() {
    it('returns ""', function() {
      assert.equal(buildContext("", options), "");
    });
  });
});
