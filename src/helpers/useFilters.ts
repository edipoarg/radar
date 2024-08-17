import { useEffect, useMemo, useState } from "react";
import type { AttacksData, Case } from "../../common/json-shape";

export type TipoFilters = Record<string, boolean>;
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
    someCase.tipo.some((individualTipo) => filters[individualTipo]);

const useHatredComponentFilter = (namesOfComponents: string[]) => {
  const initialFilters = useMemo(() => {
    const filters: HatredComponentFilters = {};
    namesOfComponents.forEach((name) => {
      filters[name] = true;
    });
    return filters;
  }, [namesOfComponents]);

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

const useAttackTypeFilter = (attackTypeNames: string[]) => {
  const initialFilters = useMemo(() => {
    const filters: HatredComponentFilters = {};
    attackTypeNames.forEach((name) => {
      filters[name] = true;
    });
    return filters;
  }, [attackTypeNames]);

  const [tipoFilters, setTipoFilters] = useState<TipoFilters>(initialFilters);

  return { tipoFilters, setTipoFilters };
};

export const useFilters = ({
  cases,
  min,
  max,
  componentNames,
  tiposNames,
}: AttacksData): FiltersUtilities => {
  const [dates, setDates] = useState({ min, max });
  const [filteredData, setFilteredData] = useState<Case[]>(cases);

  const { filtersByHatredComponent, setFiltersByHatredComponent } =
    useHatredComponentFilter(componentNames);

  const { tipoFilters, setTipoFilters } = useAttackTypeFilter(tiposNames);

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
