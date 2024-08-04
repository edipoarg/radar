import { describe, expect, it } from "vitest";
import { sliderKnobToSliderKnobLabel } from "./dateHelpers";

describe("sliderKnobToSliderKnobLabel", () => {
  describe("when given july the 31st as a date", () => {
    const date = new Date("2024-07-31T03:24:00");
    const labelerByTotalMonthsAndValue = sliderKnobToSliderKnobLabel(date);
    describe("and given 7 as the total number of months", () => {
      const labelerByValue = labelerByTotalMonthsAndValue(7);
      describe("and given a knob value of 1, thus making the corresponding month february (zero-indexed)", () => {
        const label = labelerByValue(7);
        it("should return 2/2024", () => {
          expect(label).toEqual("2/2024");
        });
      });
    });
  });
});
