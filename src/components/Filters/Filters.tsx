import { getColorByAttack } from "../../helpers/colorByAttackType";
import type { TipoFilters } from "../../helpers/useFilters";
import Filter from "./Filter/Filter";
import styles from "./Filters.module.css";

interface Props {
  tipoFilters: TipoFilters;
  setTipoFilters: (callback: (prevFilters: TipoFilters) => TipoFilters) => void;
  colorByAttackType: Record<string, string>;
}

export default function Filters({
  tipoFilters,
  setTipoFilters,
  colorByAttackType,
}: Props) {
  const handleTipoFilterChange = (tipoId: string) => (checked: boolean) => {
    setTipoFilters((prevFilters: TipoFilters) => ({
      ...prevFilters,
      [tipoId]: checked,
    }));
  };

  return (
    <div className={styles.filtros}>
      <div className={styles.filtrosPorTipo}>
        {Object.entries(tipoFilters).map(([tipoFilterName, value]) => (
          <Filter
            iconColor={getColorByAttack(colorByAttackType, tipoFilterName)}
            key={tipoFilterName}
            description={tipoFilterName}
            onChange={handleTipoFilterChange(tipoFilterName)}
            value={value}
          />
        ))}
      </div>
    </div>
  );
}
