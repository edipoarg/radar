import styles from "./filtros.module.css";
import { Switch } from "@mui/material";
import PropTypes from "prop-types";
import MapGap from "./MapGap";

export default function Filtros({
  caseCount,
  handleTipoFilter,
  tipoFilters,
  setTipoFilters,
}) {
  const handleTipoFilterChange = (tipoId) => (event) => {
    setTipoFilters((prevFilters) => ({
      ...prevFilters,
      [tipoId]: event.target.checked,
    }));
    handleTipoFilter();
  };

  return (
    <div className={styles.filtros}>
      <div className={styles.gap}></div>

      <div className={styles.filtrosBox}>
        <div className={styles.boxes}>
          <div className={styles.botonFiltros}>
            <br />
          </div>

          <div className={styles.display}>
            <h4>casos:</h4>
            <h1 className={styles.cantCasos}>{caseCount}</h1>
          </div>
          <div>
            <div className={styles.filtroTipo}>
              <div className={styles.tipos}>
                <div className={styles.tipo1Ref}>
                  {" "}
                  <div className={styles.tipo1Icon}></div>
                  <h4 className={styles.tipoClass}>
                    Ataque a símbolos y lugares{" "}
                  </h4>
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
        <MapGap />
      </div>

      <div className={styles.gap2}></div>
    </div>
  );
}

Filtros.propTypes = {
  caseCount: PropTypes.number.isRequired,
  handleTipoFilter: PropTypes.func.isRequired,
  tipoFilters: PropTypes.shape({
    t1: PropTypes.string.isRequired,
    t2: PropTypes.string.isRequired,
    t3: PropTypes.string.isRequired,
  }).isRequired,
  setTipoFilters: PropTypes.func.isRequired,
};
