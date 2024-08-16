import type { CaseTipoId } from "../../types/caseData";
import Filter from "./Filter/Filter";
import styles from "./Filtros.module.css";

type Filters = Record<CaseTipoId, boolean>;

interface Props {
  caseCount: number;
  tipoFilters: Filters;
  setTipoFilters: (callback: (prevFilters: Filters) => Filters) => void;
}

export default function Filtros({
  caseCount,
  tipoFilters,
  setTipoFilters,
}: Props) {
  const handleTipoFilterChange =
    (tipoId: "t1" | "t2" | "t3") => (checked: boolean) => {
      setTipoFilters((prevFilters: Filters) => ({
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
        <Filter
          description="Ataque a símbolos y lugares"
          iconClassname={styles.tipo1Icon}
          onChange={handleTipoFilterChange("t1")}
          value={tipoFilters.t1}
        />
        <Filter
          description="Hostigamiento e intimidación"
          iconClassname={styles.tipo2Icon}
          onChange={handleTipoFilterChange("t2")}
          value={tipoFilters.t2}
        />
        <Filter
          description="Atentados contra la integridad física y la vida"
          iconClassname={styles.tipo3Icon}
          onChange={handleTipoFilterChange("t3")}
          value={tipoFilters.t3}
        />
      </div>
    </div>
  );
}
