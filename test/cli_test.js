'use strict';
var assert = require('assert');
var json = JSON.stringify({
  message: "hello"
});
describe("cli", function() {
  describe('apply(["_"]) with' + json, function() {
    it('should ', function(done) {
      withCli(json, ["_"], function test(result) {
        assert.equal(result, json);
        done();
      });
    });
  });
});

function withCli(data, args, callback) {
  let stdin = require('mock-stdin').stdin();
  require('../lib/cli.js')(args, function(result) {
    callback(result);
    stdin.restore();
  });
  stdin.send(data);
  stdin.end();
}
