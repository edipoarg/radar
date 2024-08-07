import { useCallback, useEffect, useMemo, useState } from "react";
import { useLoaderData } from "react-router-dom";
import MapGL, { NavigationControl } from "react-map-gl/maplibre";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import "./App.css";
import styles from "./App.module.css";
import Navlinks from "./routes/index";
import { Link as ScrollLink } from "react-scroll";
import Footer from "./components/Footer/Footer";
import {
  ProvSource,
  DepsSource,
  BsAsSource,
  RutasSource,
} from "./components/Sources/Sources";
import { Markers } from "./components/Markers/Markers";
import Main2 from "./components/Main2/Main2";
import Popup from "./components/Popup/Popup";
import Filtros from "./components/Filtros/Filtros";
import Analisis from "./components/Analisis/Analisis";
import mystyle from "./mystyle.json";
import MonthsSlider from "./components/MonthsSlider/MonthsSlider";
/** @import { AttacksData } from "../common/json-shape" */

const mapSourceStyles = {
  country: {
    fillColor: "#bacbff",
    fillOpacity: 0.6,
    color: "#2b3bcd",
    weight: 0.2,
  },
  departamentos: {
    fillColor: "#bacbff",
    fillOpacity: 0,
    color: "black",
    weight: 2,
    lineColor: "#198EC8",
    lineWidth: [
      [0, 3],
      [6, 6],
      [14, 9],
      [22, 18],
    ],
  },
  provincias: {
    fillColor: "#bacbff",
    color: "#2b3bcd",
    weight: 2,
    lineColor: "#b2b7f5",
    fillOpacity: 1,
    lineWidth: 2,
  },

  rutas: {
    fillColor: "#bacbff",
    color: "#2b3bcd",
    weight: 2,
    lineColor: "white",
    lineOpacity: 1,
    lineWidth: 2,
  },
};

function App() {
  const { urls } = useLoaderData();
  const { provincias, departamentos, departamentosBsAs, rutas, casos } = urls;
  /** @type {AttacksData} */
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

  const [tipoFilters, setTipoFilters] = useState({
    t1: true,
    t2: true,
    t3: true,
  });

  // Estado para controlar la visibilidad de "Filtros"
  const [analisisData] = useState({
    componentes,
    min: boundaryDates.min,
    max: boundaryDates.max,
    total: cases.length,
  });

  const [filtrosVisible, setFiltrosVisible] = useState(true);
  const [selectedMarkerId, setSelectedMarkerId] = useState(null);
  const [popupInfo, setPopupInfo] = useState(null);

  const [dates, setDates] = useState(boundaryDates);
  const [filteredData, setFilteredData] = useState(cases);
  const [filteredDataByTime, setFilteredDataByTime] = useState([]);

  const handleTipoFilter = useCallback(() => {
    const filteredDataByType = filteredDataByTime.filter(
      (event) => tipoFilters[event.tipoId],
    );
    setFilteredData(filteredDataByType);
  }, [filteredDataByTime, tipoFilters]);

  useEffect(() => {
    const checkDate = (e) => e.date >= dates.min && e.date <= dates.max;
    const newData = cases.filter(checkDate);

    setFilteredDataByTime(newData);
    // Aplicar también los filtros de tipo a los datos filtrados por tiempo
    const filteredDataByType = newData.filter(
      (event) => tipoFilters[event.tipoId],
    );
    setFilteredData(filteredDataByType);
  }, [dates, tipoFilters]);

  const toggleFiltrosVisibility = () => {
    setFiltrosVisible(!filtrosVisible);
  };

  const mapProps = {
    initialViewState: {
      longitude: -72.0, // Coordenada longitudinal de Argentina
      latitude: -40.0, // Coordenada latitudinal de Argentina
      zoom: 2.7, //zoom inicial
      minZoom: 2, // Nivel mínimo de zoom permitido
      maxZoom: 15, // Nivel máximo de zoom permitido
    },
    style: {
      width: "100vw",
      height: "90vh",
    },
    mapStyle: mystyle,
  };

  const [isCloseButtonClicked, setIsCloseButtonClicked] = useState(false);
  const handleClickCloseButton = () => {
    setIsCloseButtonClicked(!isCloseButtonClicked);
  };

  return (
    <div id={Navlinks.homeAnchor} className={styles.App}>
      {filtrosVisible && (
        <Filtros
          caseCount={filteredData.length}
          handleTipoFilter={handleTipoFilter}
          tipoFilters={tipoFilters}
          setTipoFilters={setTipoFilters}
        />
      )}
      <div className={styles.botonFiltrosMain}>
        {/* FIXME: Why is this not a button? */}
        {/* Render different button content based on the state */}
        <a
          aria-label="Hide"
          onClick={() => {
            handleClickCloseButton();
            toggleFiltrosVisibility();
          }}
          href="#"
          className={`${styles.closeButton} ${styles["simple-button"]} ${isCloseButtonClicked ? styles["transformed-button"] : ""}`}
        >
          {isCloseButtonClicked ? (
            <div>
              <h5 className={styles.botonFiltrosMap}>FILTROS</h5>
            </div>
          ) : (
            <>X</>
          )}
        </a>
      </div>
      <MapGL
        mapLib={maplibregl}
        {...{ ...mapProps, style: { ...mapProps.style, marginTop: "8vh" } }}
      >
        {/* Capa interactiva para provincias */}

        <ProvSource data={provincias} style={mapSourceStyles.provincias} />
        <DepsSource
          data={departamentos}
          style={mapSourceStyles.departamentos}
        />
        <BsAsSource data={departamentosBsAs} style={mapSourceStyles.country} />
        <RutasSource data={rutas} style={mapSourceStyles.rutas} />

        {!!(filteredData && filteredData.length) && (
          <Markers
            data={filteredData}
            setPopupInfo={setPopupInfo}
            setMarker={setSelectedMarkerId}
            selected={selectedMarkerId}
            tipoFilters={tipoFilters}
            handleTipoFilter={handleTipoFilter}
          />
        )}
        <NavigationControl position="top-right" />
      </MapGL>
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
      {popupInfo && <Popup {...popupInfo} />}
      <Main2 />
      <Analisis {...analisisData} />
      <Footer />
    </div>
  );
}

export default App;
