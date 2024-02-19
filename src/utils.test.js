import { expect, it, describe } from "vitest";
import { newDate, chomp /* mapChomp, Classifier  */ } from "./utils.js";

describe("newDate", () => {
  it("parses DD/MM/YYYY dates correctly", () => {
    let d = newDate("10/12/1999");
    expect(d).toEqual(new Date(1999, 12, 10));
  });

  ["10/12/19", "10/12/1999/2", "12/14/1999"].map((d) =>
    it(`errors on invalid date: ${d}`, () => {
      let D = newDate(d);
      expect(D).toBe(null);
    }),
  );
});

describe("chomp", () => {
  it("should remove all trailing and preceding space", () => {
    expect(chomp(" lol")).toBe("lol");
    expect(chomp("lol ")).toBe("lol");
  });
});
