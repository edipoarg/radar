import { useMemo, useState } from "react";
import { useLoaderData } from "react-router-dom";
import styles from "./Landing.module.css";
import Popup from "../Popup/Popup";
import Filters from "../Filters/Filters";
import MonthsSlider from "../MonthsSlider/MonthsSlider";
import { RadarMap } from "../Map/Map";
import type { AttacksData, Attack } from "../../../common/json-shape";
import { useFilters } from "../../helpers/useFilters";
import jsonToCsvExport from "json-to-csv-export";
import { ReportPopupContent } from "../ReportPopupContent/ReportPopupContent";
import ReactPopup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { Drawer } from "../Drawer/Drawer";
import { useTogglable } from "../../helpers/useTogglable";

type LoaderData = {
  urls: {
    provincias: unknown;
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
  const { provincias, departamentosBsAs, rutas, ataques } = urls;
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
  const [drawerIsOpen, toggleDrawerIsOpen] = useTogglable();

  return (
    <article className={styles.Landing}>
      <RadarMap
        setPopupInfo={setPopupInfo}
        sourceData={{
          departamentosBsAs,
          provincias,
          rutas,
        }}
        attacksToShow={filteredData}
        colorByAttackType={colorByAttackType}
      />
      <article
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          backgroundColor: "white",
          display: "flex",
          padding: "1rem",
        }}
      >
        <h4>casos:</h4>
        <p>{filteredData.length}</p>
      </article>
      <button
        type="button"
        style={{
          position: "absolute",
          top: "5vh",
        }}
        onClick={toggleDrawerIsOpen}
      >
        OPEN OR CLOSE DRAWER
      </button>
      <Drawer
        open={drawerIsOpen}
        visibleContent={
          <div>
            <Filters
              tipoFilters={tipoFilters}
              setTipoFilters={setTipoFilters}
              colorByAttackType={colorByAttackType}
            />
            <MonthsSlider
              boundaryDates={boundaryDates}
              setFilterDates={setDates}
            />
          </div>
        }
        hiddenContent={<div>This is invisible content!</div>}
      />

      <button
        type="button"
        style={{
          position: "absolute",
          top: "10px",
        }}
        onClick={() => {
          jsonToCsvExport({ data: serializableFilteredAttacks });
        }}
      >
        Descargar data
      </button>
      <ReactPopup
        modal
        trigger={
          <button type="button" className={styles.reportButton}>
            Reportá
          </button>
        }
        position="center center"
      >
        <ReportPopupContent />
      </ReactPopup>

      {popupInfo && <Popup attack={popupInfo} />}
    </article>
  );
}

export default Landing;
