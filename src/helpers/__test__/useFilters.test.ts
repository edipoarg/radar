import { describe, expect, it } from "vitest";
import type { TipoFilters } from "../useFilters";
import {
  attackIsAllowedByTipoFiltersWithFilters,
  attackIsWithinMinAndMaxDatesWithDates,
} from "../useFilters";
import type { Attack } from "../../../common/json-shape";

const emptyAttackInstance: Attack = {
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

describe("attackIsWithinMinAndMaxDatesWithDates", () => {
  describe("when passed dates April the 5th 2024, 0:00 GMT-3 and April the 6th 2024, 0:00 GMT-3", () => {
    const attackIsOnAprilFifth = attackIsWithinMinAndMaxDatesWithDates({
      min: 1712286000000,
      max: 1712372400000,
    });
    describe("when passed an attack that happened at April the 5th 0:00 GMT-3", () => {
      const attack: Attack = { ...emptyAttackInstance, date: 1712286000000 };
      it("returns true", () => {
        expect(attackIsOnAprilFifth(attack)).toBeTruthy();
      });
    });
    describe("when passed an attack that happened at April the 6th 0:00 GMT-3", () => {
      const attack: Attack = { ...emptyAttackInstance, date: 1712372400000 };
      it("returns true", () => {
        expect(attackIsOnAprilFifth(attack)).toBeTruthy();
      });
    });
    describe("when passed an attack that happened at April the 5th 15:00 GMT-3", () => {
      const attack: Attack = { ...emptyAttackInstance, date: 1712340000000 };
      it("returns true", () => {
        expect(attackIsOnAprilFifth(attack)).toBeTruthy();
      });
    });
    describe("when passed an attack that happened at April the 5th 2023, a year prior, at 15:00 GMT-3", () => {
      const attack: Attack = { ...emptyAttackInstance, date: 1680717600000 };
      it("returns false", () => {
        expect(attackIsOnAprilFifth(attack)).toBeFalsy();
      });
    });
  });
});

describe("attackIsAllowedByTipoFiltersWithFilters", () => {
  describe("when given filters allowing for type 'tipo uno', but not for tipo dos or tipo tres", () => {
    const tipoFilters: TipoFilters = {
      "tipo uno": true,
      "tipo dos": false,
      "tipo tres": false,
    };
    const attackIsAllowedByT1Filter =
      attackIsAllowedByTipoFiltersWithFilters(tipoFilters);
    describe("And given a tipo uno attack", () => {
      const attack: Attack = { ...emptyAttackInstance, tipo: ["tipo uno"] };
      it("should return true", () => {
        expect(attackIsAllowedByT1Filter(attack)).toBeTruthy();
      });
    });
    describe("And given a tipo 2 attack", () => {
      const attack: Attack = { ...emptyAttackInstance, tipo: ["tipo dos"] };
      it("should return false", () => {
        expect(attackIsAllowedByT1Filter(attack)).toBeFalsy();
      });
    });
    describe("And given an attack that is both tipo uno and tipo dos", () => {
      const attack: Attack = {
        ...emptyAttackInstance,
        tipo: ["tipo uno", "tipo dos"],
      };
      it("should return true", () => {
        expect(attackIsAllowedByT1Filter(attack)).toBeTruthy();
      });
    });
  });
});
