import { expect, it, describe } from "vitest";
import { parseTsvDateToUTCMillis, mapChomp, Classifier } from "../utils.cjs";

describe("parseTsvDateToJsDate", () => {
  it("parses DD/MM/YYYY dates correctly", () => {
    let d = parseTsvDateToUTCMillis("10/12/1999");
    expect(d).toEqual(Date.UTC(1999, 11, 10));
  });

  ["10/12/19", "10/12/1999/2", "12/14/1999"].map((d) =>
    describe(`with ${d}`, () => {
      it(`errors on invalid date: ${d}`, () => {
        let D = parseTsvDateToUTCMillis(d);
        expect(D).toBe(null);
      });
    }),
  );
});

describe("mapChomp", () => {
  it("should take a ';' separated string and split it to a chomped array", () => {
    const r = mapChomp(" this ; is;a;  cruel cruel; world");
    expect(r[0]).toBe("this");
    expect(r[1]).toBe("is");
    expect(r[2]).toBe("a");
    expect(r[3]).toBe("cruel cruel");
    expect(r[4]).toBe("world");
  });
});

describe("Classifier", () => {
  it("should map entries to the correct byId and byName hashes", () => {
    const C = new Classifier();
    C.classify([0, 1, 2], ["zero", "one", "two"], 0);
    C.classify([0, 1, 2], ["zero", "one"], 1);
    C.classify([0, 2], ["zero", "one"], 2);

    expect(C.byId["0"]).toStrictEqual([0, 1, 2]);
    expect(C.byId["1"]).toStrictEqual([0, 1]);
    expect(C.byId["2"]).toStrictEqual([0, 1, 2]);

    expect(C.byName["zero"]).toStrictEqual([0, 1, 2]);
    expect(C.byName["one"]).toStrictEqual([0, 1, 2]);
    expect(C.byName["two"]).toStrictEqual([0]);
  });
});
