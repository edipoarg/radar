import { useCallback, useEffect, useState } from "react";
import type { AttacksData, Case } from "../../common/json-shape";
import { isCaseTipoId, type CaseTipoId } from "../types/caseData";

type TipoFilter = Record<CaseTipoId, boolean>;

type FiltersUtilities = {
  setDates: (dates: { min: number; max: number }) => void;
  setTipoFilters: (setter: (oldFilters: TipoFilter) => TipoFilter) => void;
  tipoFilters: TipoFilter;
  filteredData: Case[];
};

export const useFilters = (attacksData: AttacksData): FiltersUtilities => {
  const { cases, min, max } = attacksData;

  const [dates, setDates] = useState({ min, max });
  const isWithinMinAndMaxDates = useCallback(
    (someCase: Case) =>
      someCase.date >= dates.min && someCase.date <= dates.max,
    [dates.min, dates.max],
  );

  const [tipoFilters, setTipoFilters] = useState({
    t1: true,
    t2: true,
    t3: true,
  });
  const isAllowedByTipoFilters = useCallback(
    (someCase: Case) =>
      someCase.tipoId
        .filter(isCaseTipoId)
        .some((individualTipo) => tipoFilters[individualTipo]),
    [tipoFilters],
  );

  const [filteredData, setFilteredData] = useState<Case[]>(cases);

  useEffect(() => {
    const newData = cases
      .filter(isWithinMinAndMaxDates)
      .filter(isAllowedByTipoFilters);
    setFilteredData(newData);
  }, [cases, isAllowedByTipoFilters, isWithinMinAndMaxDates]);

  return {
    setDates,
    setTipoFilters,
    filteredData,
    tipoFilters,
  };
};
