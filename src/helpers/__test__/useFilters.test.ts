import { describe, expect, it } from "vitest";
import type { TipoFilters } from "../useFilters";
import {
  caseIsAllowedByTipoFiltersWithFilters,
  caseIsWithinMinAndMaxDatesWithDates,
} from "../useFilters";
import type { Case } from "../../../common/json-shape";

const emptyCase: Case = {
  componente: [],
  coords: {
    latitude: 1,
    longitude: 1,
  },
  date: 0,
  id: 1,
  provincia: "",
  source: "",
  tipo: [],
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
      it("returns true", () => {
        expect(caseIsOnAprilFifth(theCase)).toBeTruthy();
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
  describe("when given filters allowing for type 'tipo uno', but not for tipo dos or tipo tres", () => {
    const tipoFilters: TipoFilters = {
      "tipo uno": true,
      "tipo dos": false,
      "tipo tres": false,
    };
    const caseIsAllowedByT1Filter =
      caseIsAllowedByTipoFiltersWithFilters(tipoFilters);
    describe("And given a t1 case", () => {
      const theCase: Case = { ...emptyCase, tipo: ["tipo uno"] };
      it("should return true", () => {
        expect(caseIsAllowedByT1Filter(theCase)).toBeTruthy();
      });
    });
    describe("And given a tipo 2 case", () => {
      const theCase: Case = { ...emptyCase, tipo: ["tipo dos"] };
      it("should return false", () => {
        expect(caseIsAllowedByT1Filter(theCase)).toBeFalsy();
      });
    });
    describe("And given a case that is both tipo uno and tipo dos", () => {
      const theCase: Case = { ...emptyCase, tipo: ["tipo uno", "tipo dos"] };
      it("should return true", () => {
        expect(caseIsAllowedByT1Filter(theCase)).toBeTruthy();
      });
    });
  });
});
