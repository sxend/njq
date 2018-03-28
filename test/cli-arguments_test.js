const cliArg = require('../lib/cli-arguments.js');
const assert = require('assert');

describe('cli-arguments function', function() {
  describe('apply empty args', function() {
    it('should return default options', function() {
      let result = cliArg([]);
      assert.equal(result.commands.length, 0);
      assert.equal(Object.keys(result.options.arg).length, 0);
      assert.equal(result.options.pretty, false);
      assert.equal(result.options.verbose, false);
      assert.equal(result.options.debug, false);
    });
  });
  describe('apply --verbose, -v options', function() {
    it('should return options.verbose true', function() {
      let result = cliArg(['--verbose']);
      assert.equal(result.options.verbose, true);
      result = cliArg(['-v']);
      assert.equal(result.options.verbose, true);
    });
  });
  describe('apply --pretty, -p options', function() {
    it('should return options.pretty true', function() {
      let result = cliArg(['--pretty']);
      assert.equal(result.options.pretty, true);
      result = cliArg(['-p']);
      assert.equal(result.options.pretty, true);
    });
  });
  describe('apply --DEBUG options', function() {
    it('should return options.debug true', function() {
      let result = cliArg(['--DEBUG']);
      assert.equal(result.options.debug, true);
    });
  });
  describe('apply --arg key value options', function() {
    it('should return arg object: {key: "value"}', function() {
      let result = cliArg(['--arg', 'key', 'value']);
      assert.equal(result.options.arg['key'], 'value');
    });
  });
  describe('apply --arg key1 value1 --arg key2 value2 options', function() {
    it('should return arg object: {key1: "value2", key2: "value2"}', function() {
      let result = cliArg(['--arg', 'key1', 'value1', '--arg', 'key2', 'value2']);
      assert.equal(result.options.arg['key1'], 'value1');
      assert.equal(result.options.arg['key2'], 'value2');
    });
  });

});
