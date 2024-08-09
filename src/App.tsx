import { useCallback, useEffect, useMemo, useState } from "react";
import { useLoaderData } from "react-router-dom";
import type { MapStyle } from "react-map-gl/maplibre";
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
import type { AttacksData, Case } from "../common/json-shape";
import type { CaseTipoId } from "./types/caseData";

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

  const [tipoFilters, setTipoFilters] = useState({
    t1: true,
    t2: true,
    t3: true,
  });

  const [analisisData] = useState({
    componentes,
    min: boundaryDates.min,
    max: boundaryDates.max,
    total: cases.length,
  });

  const [selectedMarkerId, setSelectedMarkerId] = useState<null | string>(null);

  const [popupInfo, setPopupInfo] = useState<Case | null>(null);

  const [dates, setDates] = useState({ min: casos.min, max: casos.max });
  const [filteredData, setFilteredData] = useState<Case[]>(cases);
  const [filteredDataByTime, setFilteredDataByTime] = useState<Case[]>([]);

  const handleTipoFilter = useCallback(() => {
    const filteredDataByType = filteredDataByTime.filter((event: Case) =>
      event.tipoId.some(
        (individualTipo) => tipoFilters[individualTipo as CaseTipoId],
      ),
    );
    setFilteredData(filteredDataByType);
  }, [filteredDataByTime, tipoFilters]);

  useEffect(() => {
    const checkDate = (eachCase: Case) =>
      eachCase.date >= dates.min && eachCase.date <= dates.max;
    const newData = cases.filter((c) => checkDate(c));

    setFilteredDataByTime(newData);
    // Aplicar también los filtros de tipo a los datos filtrados por tiempo
    const filteredDataByType = newData.filter((event) =>
      event.tipoId.some(
        (individualTipo) => tipoFilters[individualTipo as CaseTipoId],
      ),
    );
    setFilteredData(filteredDataByType);
  }, [dates, tipoFilters, cases]);

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
    mapStyle: mystyle as MapStyle,
  };

  return (
    <div id={Navlinks.homeAnchor} className={styles.App}>
      <Filtros
        caseCount={filteredData.length}
        handleTipoFilter={handleTipoFilter}
        tipoFilters={tipoFilters}
        setTipoFilters={setTipoFilters}
      />
      <MapGL
        mapLib={maplibregl}
        {...{
          ...mapProps,
          style: { ...mapProps.style, marginTop: "8vh" },
        }}
      >
        {/* Capa interactiva para provincias */}

        <ProvSource data={provincias} style={mapSourceStyles.provincias} />
        <DepsSource
          data={departamentos}
          style={mapSourceStyles.departamentos}
        />
        <BsAsSource data={departamentosBsAs} style={mapSourceStyles.country} />
        <RutasSource data={rutas} style={mapSourceStyles.rutas} />

        {filteredData.length !== 0 && (
          <Markers
            data={filteredData}
            setPopupInfo={setPopupInfo}
            setMarker={setSelectedMarkerId}
            selected={selectedMarkerId}
            tipoFilters={tipoFilters}
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
      {popupInfo && <Popup popupCase={popupInfo} />}
      <Main2 />
      <Analisis {...analisisData} />
      <Footer />
    </div>
  );
}

export default App;
