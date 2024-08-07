import { expect, it, describe } from "vitest";
import { parseTsvDateToUTCMillis } from "../utils.cjs";

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
