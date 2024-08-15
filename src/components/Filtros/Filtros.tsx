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
      <div>
        <div className={styles.filtrosPorTipo}>
          <div className={styles.tipos}>
            <div className={styles.tipo1Ref}>
              {" "}
              <div className={styles.tipo1Icon}></div>
              <h4 className={styles.tipoClass}>Ataque a símbolos y lugares </h4>
            </div>
            <Switch
              defaultChecked={tipoFilters.t1}
              onChange={handleTipoFilterChange("t1")}
            ></Switch>
          </div>

          <div className={styles.tipos}>
            <div className={styles.tipo2Ref}>
              {" "}
              <div className={styles.tipo2Icon}></div>
              <h4 className={styles.tipoClass}>
                Hostigamiento e intimidación{" "}
              </h4>
            </div>

            <Switch
              defaultChecked={tipoFilters.t2}
              onChange={handleTipoFilterChange("t2")}
            ></Switch>
          </div>

          <div className={styles.tipos}>
            <div className={styles.tipo3Ref}>
              {" "}
              <div className={styles.tipo3Icon}></div>
              <h4 className={styles.tipoClass}>
                Atentados contra la integridad física y la vida{" "}
              </h4>
            </div>
            <Switch
              defaultChecked={tipoFilters.t3}
              onChange={handleTipoFilterChange("t3")}
            ></Switch>
          </div>
        </div>
      </div>
    </div>
  );
}
