import { useMemo, useState } from "react";
import { useLoaderData } from "react-router-dom";
import "./Landing.css";
import styles from "./Landing.module.css";
import Popup from "../Popup/Popup";
import Filters from "../Filters/Filters";
import MonthsSlider from "../MonthsSlider/MonthsSlider";
import { RadarMap } from "../Map/Map";
import type { AttacksData, Attack } from "../../../common/json-shape";
import { useFilters } from "../../helpers/useFilters";
import jsonToCsvExport from "json-to-csv-export";

type LoaderData = {
  urls: {
    provincias: unknown;
    departamentos: unknown;
    departamentosBsAs: unknown;
    rutas: unknown;
    ataques: AttacksData;
  };
};

const makeAttackSerializable = (attack: Attack) => ({
  ...attack,
  coords: `${attack.coords.latitude}, ${attack.coords.longitude}`,
});

function Landing() {
  const { urls } = useLoaderData() as LoaderData;
  const { provincias, departamentos, departamentosBsAs, rutas, ataques } = urls;
  const { colorByAttackType } = ataques;
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

  const [popupInfo, setPopupInfo] = useState<Attack | null>(null);

  const { filteredData, setDates, setTipoFilters, tipoFilters } =
    useFilters(ataques);

  const serializableFilteredAttacks = filteredData.map(makeAttackSerializable);

  return (
    <article className={styles.Landing}>
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
        <button
          type="button"
          onClick={() => {
            jsonToCsvExport({ data: serializableFilteredAttacks });
          }}
        >
          Descargar data
        </button>
      </div>
      {popupInfo && <Popup attack={popupInfo} />}
    </article>
  );
}

export default Landing;
