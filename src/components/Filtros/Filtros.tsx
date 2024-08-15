import type { CaseTipoId } from "../../types/caseData";
import styles from "./Filtros.module.css";
import { Switch } from "@mui/material";

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
    (tipoId: "t1" | "t2" | "t3") =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setTipoFilters((prevFilters: Filters) => ({
        ...prevFilters,
        [tipoId]: event.target.checked,
      }));
    };

  return (
    <div className={styles.filtros}>
      <header>
        <h4>casos:</h4>
        <h1 className={styles.cantCasos}>{caseCount}</h1>
      </header>
      <div className={styles.filtrosPorTipo}>
        <div className={styles.tipo}>
          <div className={styles.tipoLabel}>
            <div className={`${styles.tipoIcon} ${styles.tipo1Icon}`}></div>
            <p className={styles.tipoDescription}>
              Ataque a símbolos y lugares{" "}
            </p>
          </div>
          <Switch
            defaultChecked={tipoFilters.t1}
            onChange={handleTipoFilterChange("t1")}
          />
        </div>

        <div className={styles.tipo}>
          <div className={styles.tipoLabel}>
            <div className={`${styles.tipoIcon} ${styles.tipo2Icon}`}></div>
            <p className={styles.tipoDescription}>
              Hostigamiento e intimidación
            </p>
          </div>
          <Switch
            defaultChecked={tipoFilters.t2}
            onChange={handleTipoFilterChange("t2")}
          />
        </div>

        <div className={styles.tipo}>
          <div className={styles.tipoLabel}>
            <div className={`${styles.tipoIcon} ${styles.tipo3Icon}`}></div>
            <p className={styles.tipoDescription}>
              Atentados contra la integridad física y la vida
            </p>
          </div>
          <Switch
            defaultChecked={tipoFilters.t3}
            onChange={handleTipoFilterChange("t3")}
          />
        </div>
      </div>
    </div>
  );
}
