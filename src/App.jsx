import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import MapGL, { NavigationControl } from "react-map-gl/maplibre";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import "./App.css";

import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import { motion } from 'framer-motion';
import CloseButton from 'react-bootstrap/CloseButton';
import Footer from "./components/footer.jsx"

import { ProvSource, DepsSource, BsAsSource, RutasSource} from "./components/Sources.jsx";
import { Markers } from "./components/Markers.jsx";
import Main2 from "./components/Main2.jsx";
import Popup from "./components/Popup.jsx";
import Filtros from './components/filtros.jsx'; // Cambia la ruta a tu formulario
import Analisis from './components/analisis.jsx'

import mystyle from "./mystyle.json";
import MonthsSlider from "./components/MonthsSlider.jsx";

//estilos/////////////////////
const now = new Date()

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

const emptyFilters = {byId: {}, byName: {}};

function App() {
  const {urls} = useLoaderData();
  const {provincias, departamentos, departamentosBsAs, rutas} = urls;

  const handleTipoFilter = () => {
    const filteredDataByType = filteredDataByTime.filter(event => tipoFilters[event.tipoId]);
    setFilteredData(filteredDataByType);
  };

  const [tipoFilters, setTipoFilters] = useState({
    t1: true,
    t2: true,
    t3: true,

  });
  // Estado para controlar la visibilidad de "Filtros"
  const [casesData, setCasesData] = useState([]);
  const [analisisData, setAnalisisData] = useState({
    min: now,
    max: now,
    tipos: emptyFilters,
    componentes: emptyFilters
  });

  const [filtrosVisible, setFiltrosVisible] = useState(true);

  const [hoveredFeatureId, setHoveredFeatureId] = useState(null);
  const [hoveredMarkerId, setHoveredMarkerId] = useState(null);
  const [popupInfo, setPopupInfo] = useState(null);

  const [filteredData, setFilteredData] = useState(casesData);
  const [months, setMonths] = useState(0);
  const [dates, setDates] = useState({min: now, max: now});
  const [monthRange, setMonthRange] = useState([0, 0]);
  const [filteredDataByTime, setFilteredDataByTime] = useState([]);

  useEffect(() => {
    const {tipos, componentes} = urls.casos;
    const cases = urls.casos.cases.map(c => ({...c, date: new Date(c.date)}));
    const max = new Date(urls.casos.max)
    const min = new Date(urls.casos.min)
    const yearsDiff = max.getFullYear() - min.getFullYear();
    const monthDiff = max.getMonth() - min.getMonth();

    const totalMonths = yearsDiff * 12 + monthDiff + 1;

    setCasesData(cases);
    setAnalisisData({tipos, componentes, min, max, total: cases.length})
    setDates({min, max});
    setMonths(totalMonths);
    setMonthRange([0, totalMonths]);
  }, [])

  useEffect(() => setFilteredData(casesData), [casesData])

  useEffect(() => {
    const from = new Date(dates.min)
    from.setMonth(from.getMonth() + monthRange[0])

    const to = new Date(dates.min)
    to.setMonth(to.getMonth() + monthRange[1])

    const checkDate = (e) => e.date >= from && e.date <= to;
    const newData = casesData.filter(checkDate);
    setFilteredDataByTime(newData);
    // Aplicar también los filtros de tipo a los datos filtrados por tiempo
    const filteredDataByType = newData.filter(event => tipoFilters[event.tipoId]);
    setFilteredData(filteredDataByType);
  }, [monthRange, dates, casesData, tipoFilters]);

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
        >
        </Filtros>
      )}
      <div id='mapGap'></div>
      <div id='botonFiltrosMain'>
        {/* Render different button content based on the state */}
        <CloseButton
          id="closeButton"
          aria-label="Hide"
          onClick={() => { handleClickCloseButton(); toggleFiltrosVisibility(); }}
          className={isCloseButtonClicked ? "transformed-button" : "simple-button"}
        >
          {isCloseButtonClicked ? (
            // Content when the button is clicked
            // You can use any JSX or HTML here
            <div><h5 id= 'botonFiltrosMap'>FILTROS</h5></div>
          ) : (
            // Content when the button is not clicked
            // You can use any JSX or HTML here
            <div>X</div>
          )}
        </CloseButton>
      </div>
      <div id='mapGap'></div>

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
        <RutasSource data={rutas} style={style.rutas}/>

        {casesData && (
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

      <MonthsSlider
          className="slider-container"
          monthRange={monthRange}
          setMonthRange={setMonthRange}
          totalMonths={months}
          startDateLabel="2/2020"
          endDateLabel="9/2023"
        />  

      <ScrollLink id='toMain2Container'
                  to="Main2" // ID del elemento de destino (Main2)
                  spy={true} // Activa el modo espía
                  smooth={true} // Activa el desplazamiento suave
                  duration={500} // Duración de la animación (en milisegundos)
                  offset={-70} // Ajusta un offset opcional (si tienes un encabezado fijo)
      >
        <div id="toMain2">
          <h4 id='plusBoton'>+</h4>
        </div>
      </ScrollLink>

      {popupInfo && <Popup {...popupInfo} />}

      <Main2 />
      <Analisis {...analisisData}/>
      <Footer />
    </div>
  );
}


export default App;
