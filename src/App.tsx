import { useMemo, useState } from "react";
import { useLoaderData } from "react-router-dom";
import "./App.css";
import styles from "./App.module.css";
import Navlinks from "./routes/index";
import { Link as ScrollLink } from "react-scroll";
import Footer from "./components/Footer/Footer";
import Main2 from "./components/Main2/Main2";
import Popup from "./components/Popup/Popup";
import Filtros from "./components/Filtros/Filtros";
import Analisis from "./components/Analisis/Analisis";
import MonthsSlider from "./components/MonthsSlider/MonthsSlider";
import type { AttacksData, Case } from "../common/json-shape";
import { useFilters } from "./helpers/useFilters";
import { RadarMap } from "./components/Map/Map";

type LoaderData = {
  urls: {
    provincias: unknown;
    departamentos: unknown;
    departamentosBsAs: unknown;
    rutas: unknown;
    casos: AttacksData;
  };
};

function App() {
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
    <div id={Navlinks.homeAnchor} className={styles.App}>
      <Filtros
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
          to={Navlinks.main2Anchor} // ID del elemento de destino (Main2)
          spy={true} // Activa el modo espía
          smooth={true} // Activa el desplazamiento suave
          duration={500} // Duración de la animación (en milisegundos)
          offset={-70} // Ajusta un offset opcional (si tienes un encabezado fijo)
        >
          <div className={styles.toMain2}>
            <h4 className={styles.plusBoton}>+</h4>
          </div>
        </ScrollLink>
      </div>
      {popupInfo && <Popup popupCase={popupInfo} />}
      <Main2 />
      <Analisis {...analisisData} />
      <Footer />
    </div>
  );
}

export default App;
