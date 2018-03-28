const njq = require('../lib/index');
const assert = require('assert');
const options = {
  verbose: true,
  debug: true
};
const sample = {
  message: "Hello"
};
const json = JSON.stringify(sample);
const _ = require('lodash');

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
  describe('apply "_.message + special_arg" with special_arg: ", World." ', function() {
    it('should return Hello, World.', function() {
      const special = _.assignIn(options, {
        arg: {
          special_arg: ", World."
        }
      })
      assert.equal(njq(json, "_.message + special_arg", special), "Hello, World.");
    });
  });
});
