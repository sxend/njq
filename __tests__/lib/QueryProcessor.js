const njq = require('../../lib/njq');

describe("njq.QueryProcessor", () => {
  describe("tryParse", () => {
    it("return object", () => {
      const processor = new njq.QueryProcessor({});
      expect(processor.tryParse("{}")).toMatchObject({});
    });
  });
});