'use strict';
var assert = require('assert');
var sample = {
  message: "hello"
};
var json = JSON.stringify(sample);
var prettyJson = JSON.stringify(sample, null, "  ");

describe("cli", function() {
  describe('apply(["_"]) with' + json, function() {
    it('should return ' + json, function(done) {
      withCli(json, ["_"], function test(result) {
        assert.equal(result, json);
        done();
      });
    });
  });
  describe('apply(["-p", "_"]) with' + json, function() {
    it('should return ' + prettyJson, function(done) {
      withCli(prettyJson, ["-p", "_"], function test(result) {
        assert.equal(result, prettyJson);
        done();
      });
    });
  });
  describe('apply(["--pretty", "_"]) with' + json, function() {
    it('should return ' + prettyJson, function(done) {
      withCli(prettyJson, ["--pretty", "_"], function test(result) {
        assert.equal(result, prettyJson);
        done();
      });
    });
  });
  describe('apply(["_.message"]) with' + json, function() {
    it('should return ' + json, function(done) {
      withCli(json, ["_.message"], function test(result) {
        assert.equal(result, "hello");
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
