import type { TipoFilters } from "../../helpers/useFilters";
import Filter from "./Filter/Filter";
import styles from "./Filters.module.css";

interface Props {
  caseCount: number;
  tipoFilters: TipoFilters;
  setTipoFilters: (callback: (prevFilters: TipoFilters) => TipoFilters) => void;
}

export default function Filters({
  caseCount,
  tipoFilters,
  setTipoFilters,
}: Props) {
  const handleTipoFilterChange = (tipoId: string) => (checked: boolean) => {
    setTipoFilters((prevFilters: TipoFilters) => ({
      ...prevFilters,
      [tipoId]: checked,
    }));
  };

  return (
    <div className={styles.filtros}>
      <header>
        <h4>casos:</h4>
        <h1 className={styles.cantCasos}>{caseCount}</h1>
      </header>
      <div className={styles.filtrosPorTipo}>
        {Object.entries(tipoFilters).map(([tipoFilterName, value]) => (
          <Filter
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
