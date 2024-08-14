import { useEffect, useMemo, useState } from "react";
import type { AttacksData, Case, Clasificacion } from "../../common/json-shape";
import { isCaseTipoId, type CaseTipoId } from "../types/caseData";

export type TipoFilters = Record<CaseTipoId, boolean>;
type HatredComponentFilters = Record<string, boolean>;

type FiltersUtilities = {
  setDates: (dates: { min: number; max: number }) => void;
  setTipoFilters: (setter: (oldFilters: TipoFilters) => TipoFilters) => void;
  tipoFilters: TipoFilters;
  filteredData: Case[];
  filtersByHatredComponent: HatredComponentFilters;
  setFiltersByHatredComponent: (newFilters: HatredComponentFilters) => void;
};

export const caseIsWithinMinAndMaxDatesWithDates =
  (dates: { min: number; max: number }) => (someCase: Case) =>
    someCase.date >= dates.min && someCase.date <= dates.max;

export const caseIsAllowedByTipoFiltersWithFilters =
  (filters: TipoFilters) => (someCase: Case) =>
    someCase.tipoId
      .filter(isCaseTipoId)
      .some((individualTipo) => filters[individualTipo]);

const useHatredComponentFilter = (componentes: Clasificacion) => {
  const initialFilters = useMemo(() => {
    const namesOfComponents = Object.keys(componentes.byName);
    const filters: HatredComponentFilters = {};
    namesOfComponents.forEach((name) => {
      filters[name] = true;
    });
    return filters;
  }, [componentes]);

  const [filtersByHatredComponent, setFiltersByHatredComponent] =
    useState<HatredComponentFilters>(initialFilters);

  return {
    filtersByHatredComponent,
    setFiltersByHatredComponent,
  };
};

const caseHasANonFilteredHateComponent =
  (filterByHatredComponent: HatredComponentFilters) => (aCase: Case) =>
    aCase.componente.some(
      (componenteName) => filterByHatredComponent[componenteName],
    );

export const useFilters = ({
  cases,
  min,
  max,
  componentes,
}: AttacksData): FiltersUtilities => {
  const [dates, setDates] = useState({ min, max });
  const [tipoFilters, setTipoFilters] = useState({
    t1: true,
    t2: true,
    t3: true,
  });
  const [filteredData, setFilteredData] = useState<Case[]>(cases);

  const { filtersByHatredComponent, setFiltersByHatredComponent } =
    useHatredComponentFilter(componentes);

  useEffect(() => {
    const newData = cases
      .filter(caseIsWithinMinAndMaxDatesWithDates(dates))
      .filter(caseIsAllowedByTipoFiltersWithFilters(tipoFilters))
      .filter(caseHasANonFilteredHateComponent(filtersByHatredComponent));
    setFilteredData(newData);
  }, [cases, dates, tipoFilters, filtersByHatredComponent]);

  return {
    setDates,
    setTipoFilters,
    filteredData,
    tipoFilters,
    filtersByHatredComponent,
    setFiltersByHatredComponent,
  };
};
