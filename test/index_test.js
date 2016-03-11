var njq = require('../lib/index');
var assert = require('assert');
var options = {
  verbose: true,
  debug: true
};
var sample = {
  message: "Hello"
};
var json = JSON.stringify(sample);

describe('njq (with input json: ' + json + ')', function() {
  describe('apply ""', function() {
    it('should return ""', function() {
      assert.equal(njq(json, "", options), "");
    });
  });
  describe('apply null', function() {
    it('should return ""', function() {
      assert.equal(njq(json, null, options), "");
    });
  });
  describe('apply void 0', function() {
    it('should return ""', function() {
      assert.equal(njq(json, void 0, options), "");
    });
  });
  describe('apply []', function() {
    it('should return ""', function() {
      assert.equal(njq(json, [], options), "");
    });
  });
  describe('apply [""]', function() {
    it('should return ""', function() {
      assert.equal(njq(json, [""], options), "");
    });
  });
  describe('apply [null]', function() {
    it('should return ""', function() {
      assert.equal(njq(json, [null], options), "");
    });
  });
  describe('apply [void 0]', function() {
    it('should return ""', function() {
      assert.equal(njq(json, [void 0], options), "");
    });
  });
  describe('apply _', function() {
    it('should return ' + json, function() {
      assert.equal(JSON.stringify(njq(json, "_", options)), json);
    });
  });
  describe('apply ["_"]', function() {
    it('should return ' + json, function() {
      assert.equal(JSON.stringify(njq(json, ["_"], options)), json);
    });
  });
  describe('apply "_.message"', function() {
    it('should return Hello', function() {
      assert.equal(njq(json, '_.message', options), "Hello");
    });
  });
});
