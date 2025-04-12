import { getColorByAttack } from "../../../../helpers/colorByAttackType";
import type { TipoFilters } from "../../../../helpers/useFilters";
import Filter from "./TypeFilter/TypeFilter";
import styles from "./FiltersByType.module.css";

interface Props {
  tipoFilters: TipoFilters;
  setTipoFilters: (callback: (prevFilters: TipoFilters) => TipoFilters) => void;
  colorByAttackType: Record<string, string>;
  className?: string;
}

export default function FiltersByType({
  tipoFilters,
  setTipoFilters,
  colorByAttackType,
  className,
}: Props) {
  const handleTipoFilterChange = (tipoId: string) => (checked: boolean) => {
    setTipoFilters((prevFilters: TipoFilters) => ({
      ...prevFilters,
      [tipoId]: checked,
    }));
  };

  return (
    <div className={`${styles.filtros} ${className ?? ""}`}>
      {Object.entries(tipoFilters).map(([tipoFilterName, value]) => (
        <Filter
          color={getColorByAttack(colorByAttackType, tipoFilterName)}
          key={tipoFilterName}
          description={tipoFilterName}
          onChange={handleTipoFilterChange(tipoFilterName)}
          value={value}
        />
      ))}
    </div>
  );
}
