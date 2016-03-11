var cliArg = require('../lib/cli-arguments.js');
var assert = require('assert');

describe('cli-arguments function', function() {
  describe('apply empty args', function() {
    it('should return default options', function() {
      var result = cliArg([]);
      assert.equal(result.commands.length, 0);
      assert.equal(Object.keys(result.arg).length, 0);
      assert.equal(result.options.pretty, false);
      assert.equal(result.options.stream, false);
      assert.equal(result.options.verbose, false);
      assert.equal(result.options.debug, false);
    });
  });
  describe('apply --help, -h options', function() {
    it('should return options.help true', function() {
      var result = cliArg(['--help']);
      assert.equal(result.options.help, true);
      var result = cliArg(['-h']);
      assert.equal(result.options.help, true);
    });
  });
  describe('apply --verbose, -v options', function() {
    it('should return options.verbose true', function() {
      var result = cliArg(['--verbose']);
      assert.equal(result.options.verbose, true);
      var result = cliArg(['-v']);
      assert.equal(result.options.verbose, true);
    });
  });
  describe('apply --pretty, -p options', function() {
    it('should return options.pretty true', function() {
      var result = cliArg(['--pretty']);
      assert.equal(result.options.pretty, true);
      var result = cliArg(['-p']);
      assert.equal(result.options.pretty, true);
    });
  });
  describe('apply --stream, -s options', function() {
    it('should return options.stream true', function() {
      var result = cliArg(['--stream']);
      assert.equal(result.options.stream, true);
      var result = cliArg(['-s']);
      assert.equal(result.options.stream, true);
    });
  });
  describe('apply --DEBUG options', function() {
    it('should return options.debug true', function() {
      var result = cliArg(['--DEBUG']);
      assert.equal(result.options.debug, true);
    });
  });
  describe('apply --arg key value options', function() {
    it('should return arg object: {key: "value"}', function() {
      var result = cliArg(['--arg', 'key', 'value']);
      assert.equal(result.arg['key'], 'value');
    });
  });
  describe('apply --arg key1 value1 --arg key2 value2 options', function() {
    it('should return arg object: {key1: "value2", key2: "value2"}', function() {
      var result = cliArg(['--arg', 'key1', 'value1', '--arg', 'key2', 'value2']);
      assert.equal(result.arg['key1'], 'value1');
      assert.equal(result.arg['key2'], 'value2');
    });
  });

});
