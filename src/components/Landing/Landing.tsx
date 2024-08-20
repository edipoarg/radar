import { useMemo, useState } from "react";
import { useLoaderData } from "react-router-dom";
import "./Landing.css";
import styles from "./Landing.module.css";
import Popup from "../Popup/Popup";
import Filters from "../Filters/Filters";
import Analisis from "../Analisis/Analisis";
import MonthsSlider from "../MonthsSlider/MonthsSlider";
import { RadarMap } from "../Map/Map";
import type { AttacksData, Attack } from "../../../common/json-shape";
import { useFilters } from "../../helpers/useFilters";

type LoaderData = {
  urls: {
    provincias: unknown;
    departamentos: unknown;
    departamentosBsAs: unknown;
    rutas: unknown;
    ataques: AttacksData;
  };
};

function Landing() {
  const { urls } = useLoaderData() as LoaderData;
  const { provincias, departamentos, departamentosBsAs, rutas, ataques } = urls;
  const { componentes, attacks, colorByAttackType } = ataques;
  /** Boundary dates are the earliest date that an attack can be from
   * and the latest date that an attack can be from in order to be shown on the map.
   */
  const boundaryDates = useMemo(
    () => ({
      min: new Date(ataques.min),
      max: new Date(ataques.max),
    }),
    [ataques.min, ataques.max],
  );

  // This data doesn't change when we apply filters
  const [analisisData] = useState({
    componentes,
    min: boundaryDates.min,
    max: boundaryDates.max,
    total: attacks.length,
  });

  const [popupInfo, setPopupInfo] = useState<Attack | null>(null);

  const { filteredData, setDates, setTipoFilters, tipoFilters } =
    useFilters(ataques);

  return (
    <div className={styles.Landing}>
      <Filters
        attacksCount={filteredData.length}
        tipoFilters={tipoFilters}
        setTipoFilters={setTipoFilters}
        colorByAttackType={colorByAttackType}
      />
      <RadarMap
        setPopupInfo={setPopupInfo}
        sourceData={{
          departamentos,
          departamentosBsAs,
          provincias,
          rutas,
        }}
        attacksToShow={filteredData}
        colorByAttackType={colorByAttackType}
      />
      <div className={styles["lower-floating-buttons"]}>
        <MonthsSlider boundaryDates={boundaryDates} setFilterDates={setDates} />
      </div>
      {popupInfo && <Popup attack={popupInfo} />}
      <Analisis {...analisisData} />
    </div>
  );
}

export default Landing;
