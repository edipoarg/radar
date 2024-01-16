import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import MapGL, { NavigationControl } from "react-map-gl/maplibre";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import "./App.css";

import { Link as ScrollLink } from "react-scroll";
import Footer from "./components/footer.jsx";

import {
  ProvSource,
  DepsSource,
  BsAsSource,
  RutasSource,
} from "./components/Sources.jsx";
import { Markers } from "./components/Markers.jsx";
import Main2 from "./components/Main2.jsx";
import Popup from "./components/Popup.jsx";
import Filtros from "./components/filtros.jsx"; // Cambia la ruta a tu formulario
import Analisis from "./components/analisis.jsx";

import mystyle from "./mystyle.json";
import MonthsSlider from "./components/MonthsSlider.jsx";

//estilos/////////////////////
const style = {
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
  const { provincias, departamentos, departamentosBsAs, rutas } = urls;
  const { tipos, componentes } = urls.casos;
  const cases = urls.casos.cases.map((c) => ({ ...c, date: new Date(c.date) }));
  const globalDates = {
    min: new Date(urls.casos.min),
    max: new Date(urls.casos.max),
  };

  const handleTipoFilter = () => {
    const filteredDataByType = filteredDataByTime.filter(
      (event) => tipoFilters[event.tipoId],
    );
    setFilteredData(filteredDataByType);
  };

  const [tipoFilters, setTipoFilters] = useState({
    t1: true,
    t2: true,
    t3: true,
  });
  // Estado para controlar la visibilidad de "Filtros"
  const [analisisData] = useState({
    tipos,
    componentes,
    min: globalDates.min,
    max: globalDates.max,
    total: cases.length,
  });

  const [filtrosVisible, setFiltrosVisible] = useState(true);

  const [setHoveredFeatureId] = useState(null);
  const [hoveredMarkerId, setHoveredMarkerId] = useState(null);
  const [popupInfo, setPopupInfo] = useState(null);

  const [dates, setDates] = useState(globalDates);
  const [filteredData, setFilteredData] = useState(cases);
  const [filteredDataByTime, setFilteredDataByTime] = useState([]);

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

  // Función para cambiar la visibilidad de "Filtros"
  const toggleFiltrosVisibility = () => {
    setFiltrosVisible(!filtrosVisible);
  };

  const handleHover = (event) => {
    setHoveredFeatureId(event.features?.[0]?.id || null);
  };

  const handleLeave = () => setHoveredFeatureId(null);

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
      height: " 90vh",
    },
    mapStyle: mystyle,
  };

  // Step 1: Create a state variable for the close button
  const [isCloseButtonClicked, setIsCloseButtonClicked] = useState(false);

  // Step 2: Create a click handler for the close button
  const handleClickCloseButton = () => {
    // Toggle the state when the button is clicked
    setIsCloseButtonClicked(!isCloseButtonClicked);

    // Add any additional logic you want when the button is clicked
  };

  return (
    <div className="App">
      {filtrosVisible && (
        <Filtros
          caseCount={filteredData.length}
          handleTipoFilter={handleTipoFilter}
          tipoFilters={tipoFilters}
          setTipoFilters={setTipoFilters}
        ></Filtros>
      )}
      <div id="mapGap"></div>
      <div id="botonFiltrosMain">
        {/* Render different button content based on the state */}
        <a
          id="closeButton"
          aria-label="Hide"
          onClick={() => {
            handleClickCloseButton();
            toggleFiltrosVisibility();
          }}
          href="#"
          className={`simple-button ${isCloseButtonClicked ? "transformed-button" : "simple-button"}`}
        >
          {isCloseButtonClicked ? (
            <div>
              <h5 id="botonFiltrosMap">FILTROS</h5>
            </div>
          ) : (
            <>X</>
          )}
        </a>
      </div>
      <div id="mapGap"></div>

      <MapGL
        id="mapa"
        mapLib={maplibregl}
        {...mapProps}
        onHover={handleHover} // Asignar la función handleProvinciasHover al evento onHover
        onLeave={handleLeave} // Asignar la función handleProvinciasLeave al evento onLeave
      >
        {/* Capa interactiva para provincias */}

        <ProvSource data={provincias} style={style.provincias} />
        <DepsSource data={departamentos} style={style.departamentos} />
        <BsAsSource data={departamentosBsAs} style={style.country} />
        <RutasSource data={rutas} style={style.rutas} />

        {!!(filteredData && filteredData.length) && (
          <Markers
            data={filteredData}
            setPopupInfo={setPopupInfo}
            setMarker={setHoveredMarkerId}
            selected={hoveredMarkerId}
            tipoFilters={tipoFilters}
            handleTipoFilter={handleTipoFilter}
          />
        )}
        <NavigationControl position="top-right" />
      </MapGL>

      <div className="lower-floating-buttons">
        <MonthsSlider {...{ globalDates, setDates }} />
        <ScrollLink
          id="toMain2Container"
          to="Main2" // ID del elemento de destino (Main2)
          spy={true} // Activa el modo espía
          smooth={true} // Activa el desplazamiento suave
          duration={500} // Duración de la animación (en milisegundos)
          offset={-70} // Ajusta un offset opcional (si tienes un encabezado fijo)
        >
          <div id="toMain2">
            <h4 id="plusBoton">+</h4>
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
