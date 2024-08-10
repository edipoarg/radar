import { describe, expect, it } from "vitest";
import type { TipoFilters } from "../useFilters";
import {
  caseIsAllowedByTipoFiltersWithFilters,
  caseIsWithinMinAndMaxDatesWithDates,
} from "../useFilters";
import type { Case } from "../../../common/json-shape";

const emptyCase: Case = {
  componente: [],
  componenteId: [],
  coords: {
    latitude: 1,
    longitude: 1,
  },
  date: 0,
  id: 1,
  provincia: "",
  source: "",
  tipo: [],
  tipoId: [],
  title: "",
};

describe("caseIsWithinMinAndMaxDatesWithDates", () => {
  describe("when passed dates April the 5th 2024, 0:00 GMT-3 and April the 6th 2024, 0:00 GMT-3", () => {
    const caseIsOnAprilFifth = caseIsWithinMinAndMaxDatesWithDates({
      min: 1712286000000,
      max: 1712372400000,
    });
    describe("when passed a case that happened at April the 5th 0:00 GMT-3", () => {
      const theCase: Case = { ...emptyCase, date: 1712286000000 };
      it("returns true", () => {
        expect(caseIsOnAprilFifth(theCase)).toBeTruthy();
      });
    });
    describe("when passed a case that happened at April the 6th 0:00 GMT-3", () => {
      const theCase: Case = { ...emptyCase, date: 1712372400000 };
      it("returns false", () => {
        expect(caseIsOnAprilFifth(theCase)).toBeFalsy();
      });
    });
    describe("when passed a case that happened at April the 5th 15:00 GMT-3", () => {
      const theCase: Case = { ...emptyCase, date: 1712340000000 };
      it("returns true", () => {
        expect(caseIsOnAprilFifth(theCase)).toBeTruthy();
      });
    });
    describe("when passed a case that happened at April the 5th 2023, a year prior, at 15:00 GMT-3", () => {
      const theCase: Case = { ...emptyCase, date: 1680717600000 };
      it("returns false", () => {
        expect(caseIsOnAprilFifth(theCase)).toBeFalsy();
      });
    });
  });
});

describe("caseIsAllowedByTipoFiltersWithFilters", () => {
  describe("when given filters allowing for t1, but not for t2 or t3", () => {
    const tipoFilters: TipoFilters = {
      t1: true,
      t2: false,
      t3: false,
    };
    const caseIsAllowedByT1Filter =
      caseIsAllowedByTipoFiltersWithFilters(tipoFilters);
    describe("And given a t1 case", () => {
      const theCase: Case = { ...emptyCase, tipoId: ["t1"] };
      it("should return true", () => {
        expect(caseIsAllowedByT1Filter(theCase)).toBeTruthy();
      });
    });
    describe("And given a t2 case", () => {
      const theCase: Case = { ...emptyCase, tipoId: ["t2"] };
      it("should return false", () => {
        expect(caseIsAllowedByT1Filter(theCase)).toBeFalsy();
      });
    });
    describe("And given a case that is both t1 and t2", () => {
      const theCase: Case = { ...emptyCase, tipoId: ["t1", "t2"] };
      it("should return true", () => {
        expect(caseIsAllowedByT1Filter(theCase)).toBeTruthy();
      });
    });
  });
});
