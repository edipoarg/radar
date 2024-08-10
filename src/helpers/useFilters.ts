import { useEffect, useState } from "react";
import type { AttacksData, Case } from "../../common/json-shape";
import { isCaseTipoId, type CaseTipoId } from "../types/caseData";

export type TipoFilters = Record<CaseTipoId, boolean>;

type FiltersUtilities = {
  setDates: (dates: { min: number; max: number }) => void;
  setTipoFilters: (setter: (oldFilters: TipoFilters) => TipoFilters) => void;
  tipoFilters: TipoFilters;
  filteredData: Case[];
};

export const caseIsWithinMinAndMaxDatesWithDates =
  (dates: { min: number; max: number }) => (someCase: Case) =>
    someCase.date >= dates.min && someCase.date < dates.max;

export const caseIsAllowedByTipoFiltersWithFilters =
  (filters: TipoFilters) => (someCase: Case) =>
    someCase.tipoId
      .filter(isCaseTipoId)
      .some((individualTipo) => filters[individualTipo]);

export const useFilters = ({
  cases,
  min,
  max,
}: AttacksData): FiltersUtilities => {
  const [dates, setDates] = useState({ min, max });
  const [tipoFilters, setTipoFilters] = useState({
    t1: true,
    t2: true,
    t3: true,
  });
  const [filteredData, setFilteredData] = useState<Case[]>(cases);

  useEffect(() => {
    const newData = cases
      .filter(caseIsWithinMinAndMaxDatesWithDates(dates))
      .filter(caseIsAllowedByTipoFiltersWithFilters(tipoFilters));
    setFilteredData(newData);
  }, [cases, dates, tipoFilters]);

  return {
    setDates,
    setTipoFilters,
    filteredData,
    tipoFilters,
  };
};
