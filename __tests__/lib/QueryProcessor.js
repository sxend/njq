const njq = require("../../lib/njq");

describe("njq.QueryProcessor", () => {
  describe("tryParse", () => {
    it("return object only when valid input json", () => {
      const processor = new njq.QueryProcessor({});
      expect(processor.tryParse(void 0)).toBeUndefined();
      expect(processor.tryParse("{")).toBeUndefined();
      expect(
        processor.tryParse(`{
          "foo": "bar"`)
      ).toBeUndefined();
      foo = expect(processor.tryParse(null)).toBeNull();
      expect(processor.tryParse(0)).toBe(0);
      expect(processor.tryParse("{}")).toMatchObject({});
      expect(processor.tryParse('{"foo": "bar"}')).toMatchObject({
        foo: "bar"
      });
    });
  });
  describe("applyQuery", () => {
    it("return match property", () => {
      const processor = new njq.QueryProcessor({
        query: "_.message"
      });
      expect(processor.applyQuery({ message: "hello" })).toBe("hello");
      expect(processor.applyQuery({ notfoundkey: "hello" })).toBeUndefined();
    });
    describe("with arg parameter", () => {
      it("inject arg parameter", () => {
        const processor = new njq.QueryProcessor({
          query: "_.message + foo",
          args: { foo: "bar" }
        });
        expect(processor.applyQuery({ message: "hello" })).toBe("hellobar");
      });
      describe("when use undefined arg value", () => {
        it("throw error", () => {
          const processor = new njq.QueryProcessor({
            query: "_.message + unmatched",
            args: { foo: "bar" }
          });
          expect(() => processor.applyQuery({ message: "hello" })).toThrow();
        });
      });
    });
  });
  describe("reStringify", () => {
    it("return compact json string", () => {
      const processor = new njq.QueryProcessor({
        pretty: false
      });
      expect(processor.reStringify({ foo: "bar" })).toBe('{"foo":"bar"}');
    });
    it("return pretty json string", () => {
      const processor = new njq.QueryProcessor({
        pretty: true
      });
      const prettyJSON = `{
  "foo": "bar"
}`;
      expect(processor.reStringify({ foo: "bar" })).toBe(prettyJSON);
    });
  });
});
