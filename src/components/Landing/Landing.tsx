import { useMemo, useState } from "react";
import { useLoaderData } from "react-router-dom";
import "./Landing.css";
import styles from "./Landing.module.css";
import Navlinks from "../../routes/index";
import { Link as ScrollLink } from "react-scroll";
import Footer from "../Footer/Footer";
import SiteSummary from "../SiteSummary/SiteSummary";
import Popup from "../Popup/Popup";
import Filters from "../Filters/Filters";
import Analisis from "../Analisis/Analisis";
import MonthsSlider from "../MonthsSlider/MonthsSlider";
import { RadarMap } from "../Map/Map";
import type { AttacksData, Case } from "../../../common/json-shape";
import { useFilters } from "../../helpers/useFilters";

type LoaderData = {
  urls: {
    provincias: unknown;
    departamentos: unknown;
    departamentosBsAs: unknown;
    rutas: unknown;
    casos: AttacksData;
  };
};

function Landing() {
  const { urls } = useLoaderData() as LoaderData;
  const { provincias, departamentos, departamentosBsAs, rutas, casos } = urls;
  const { componentes, cases } = casos;
  /** Boundary dates are the earliest date that a case can be from
   * and the latest date that a case can be from in order to be shown on the map.
   */
  const boundaryDates = useMemo(
    () => ({
      min: new Date(casos.min),
      max: new Date(casos.max),
    }),
    [casos.min, casos.max],
  );

  // This data doesn't change when we apply filters
  const [analisisData] = useState({
    componentes,
    min: boundaryDates.min,
    max: boundaryDates.max,
    total: cases.length,
  });

  const [popupInfo, setPopupInfo] = useState<Case | null>(null);

  const { filteredData, setDates, setTipoFilters, tipoFilters } =
    useFilters(casos);

  return (
    <div id={Navlinks.homeAnchor} className={styles.Landing}>
      <Filters
        caseCount={filteredData.length}
        tipoFilters={tipoFilters}
        setTipoFilters={setTipoFilters}
      />
      <RadarMap
        setPopupInfo={setPopupInfo}
        sourceData={{
          departamentos,
          departamentosBsAs,
          provincias,
          rutas,
        }}
        casesToShow={filteredData}
      />
      <div className={styles["lower-floating-buttons"]}>
        <MonthsSlider boundaryDates={boundaryDates} setFilterDates={setDates} />
        <ScrollLink
          to={Navlinks.siteSummary} // ID del elemento de destino (SiteSummary)
          spy={true} // Activa el modo espía
          smooth={true} // Activa el desplazamiento suave
          duration={500} // Duración de la animación (en milisegundos)
          offset={-70} // Ajusta un offset opcional (si tienes un encabezado fijo)
        >
          <div className={styles.toSiteSummary}>
            <h4 className={styles.plusBoton}>+</h4>
          </div>
        </ScrollLink>
      </div>
      {popupInfo && <Popup popupCase={popupInfo} />}
      <SiteSummary />
      <Analisis {...analisisData} />
      <Footer />
    </div>
  );
}

export default Landing;
