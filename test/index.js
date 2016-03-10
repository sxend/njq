var njq = require('../lib');
var assert = require('assert');

describe('njq', function() {
  describe('apply()', function() {
    it('should return Hello', function() {
      var json = JSON.stringify({message: "Hello"});
      assert.equal(njq(json, '_.message'), "Hello");
    });
    it('should return origin', function() {
      var json = JSON.stringify({message: "Hello"});
      assert.equal(JSON.stringify(njq(json, '_')), json);
    });
  });
});
