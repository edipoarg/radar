import { useEffect, useMemo, useState } from "react";
import type { AttacksData, Attack } from "../../common/json-shape";

export type TipoFilters = Record<string, boolean>;
type HatredComponentFilters = Record<string, boolean>;

type FiltersUtilities = {
  setDates: (dates: { min: number; max: number }) => void;
  setTipoFilters: (setter: (oldFilters: TipoFilters) => TipoFilters) => void;
  tipoFilters: TipoFilters;
  filteredData: Attack[];
  filtersByHatredComponent: HatredComponentFilters;
  setFiltersByHatredComponent: (newFilters: HatredComponentFilters) => void;
};

export const attackIsWithinMinAndMaxDatesWithDates =
  (dates: { min: number; max: number }) => (attack: Attack) =>
    attack.date >= dates.min && attack.date <= dates.max;

export const attackIsAllowedByTipoFiltersWithFilters =
  (filters: TipoFilters) => (attack: Attack) =>
    attack.tipo.some((individualTipo) => filters[individualTipo]);

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

const attackHasANonFilteredHateComponent =
  (filterByHatredComponent: HatredComponentFilters) => (attack: Attack) =>
    attack.componente.some(
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
  attacks,
  min,
  max,
  componentNames,
  tiposNames,
}: AttacksData): FiltersUtilities => {
  const [dates, setDates] = useState({ min, max });
  const [filteredData, setFilteredData] = useState<Attack[]>(attacks);

  const { filtersByHatredComponent, setFiltersByHatredComponent } =
    useHatredComponentFilter(componentNames);

  const { tipoFilters, setTipoFilters } = useAttackTypeFilter(tiposNames);

  useEffect(() => {
    const newData = attacks
      .filter(attackIsWithinMinAndMaxDatesWithDates(dates))
      .filter(attackIsAllowedByTipoFiltersWithFilters(tipoFilters))
      .filter(attackHasANonFilteredHateComponent(filtersByHatredComponent));
    setFilteredData(newData);
  }, [attacks, dates, tipoFilters, filtersByHatredComponent]);

  return {
    setDates,
    setTipoFilters,
    filteredData,
    tipoFilters,
    filtersByHatredComponent,
    setFiltersByHatredComponent,
  };
};
