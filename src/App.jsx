import React, { useEffect, useState } from "react";
import { Slider } from "@mui/material";
import { useLoaderData } from "react-router-dom";

import MapGL, { NavigationControl } from "react-map-gl/maplibre";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import "./App.css";

import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import { motion } from 'framer-motion';
import CloseButton from 'react-bootstrap/CloseButton';
import Footer from "./components/footer.jsx"

import {fetchGoogleSheets} from './services/google-sheets'
import { ProvSource, DepsSource, BsAsSource, RutasSource} from "./components/Sources.jsx";
import { Markers } from "./components/Markers.jsx";
import Main2 from "./components/Main2.jsx";
import Popup from "./components/Popup.jsx";
import Filtros from './components/filtros.jsx'; // Cambia la ruta a tu formulario
import Analisis from './components/analisis.jsx'

import mystyle from "./mystyle.json";

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

const newDate = (d) => {
  const [day, month, year] = d.split('/');
  return new Date(year, month, day);
}

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
  const [filtrosVisible, setFiltrosVisible] = useState(true);

  const [hoveredFeatureId, setHoveredFeatureId] = useState(null);
  const [hoveredMarkerId, setHoveredMarkerId] = useState(null);
  const [popupInfo, setPopupInfo] = useState(null);
  const [sheetsData, setSheetsData] = useState([]);
  const [filteredData, setFilteredData] = useState(sheetsData);
  const [months, setMonths] = useState(0);
  const [value, setValue] = useState([0, 30]);
  const [filteredDataByTime, setFilteredDataByTime] = useState([]);
  const valueLabelFormat = (value) => {
    const diff = months - value;
    const date = new Date()
    date.setMonth(date.getMonth() - diff)
    return `${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  useEffect(() => {
    fetchGoogleSheets()
      .then(setSheetsData)
  }, [])
  useEffect(() => {setFilteredData(sheetsData)}, [sheetsData])

  useEffect(() => {
    const diff = months - value;

    const from = new Date()
    from.setDate(0)
    from.setMonth(from.getMonth() - months + value[0] + 1);
    const to = new Date()
    to.setDate(0)
    to.setDate(to.getMonth() - months + value[1] + 1);

    if (sheetsData) {
      const checkDate = (e) => {
        const eventDate = newDate(e.date);
        return eventDate >= from && eventDate <= to;
      };
      const newData = sheetsData.filter(checkDate);
      setFilteredDataByTime(newData);


      // Aplicar también los filtros de tipo a los datos filtrados por tiempo
      const filteredDataByType = newData.filter(event => tipoFilters[event.tipoId]);
      setFilteredData(filteredDataByType);

    }
  },
  [value, months, sheetsData, tipoFilters]);

  // Función para cambiar la visibilidad de "Filtros"
  const toggleFiltrosVisibility = () => {
    setFiltrosVisible(!filtrosVisible);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
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

  

  useEffect(() => {
    if (sheetsData) {
      const now = new Date();
      let from = new Date();
      sheetsData.forEach((e) => {
        const date = newDate(e.date)

        if (date <= from) {
          from = date;
        }
      });

      const yearsDiff = now.getFullYear() - from.getFullYear();
      const monthDiff = now.getMonth() - from.getMonth();

      const totalMonths = yearsDiff * 12 + monthDiff;
      setMonths(totalMonths);
      setValue([0, totalMonths]);
    }
  }, [sheetsData]);


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
        <button
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
            <div><CloseButton
                   id="closeButton"
                   aria-label="Hide"
                   onClick={toggleFiltrosVisibility}
                 /></div>
          )}
        </button>
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

          {sheetsData && (
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

        <div className="slider-container">
          {/* Agrega un botón o elemento para cambiar la visibilidad de Filtros */}
          <Slider
            max={months}
            valueLabelDisplay="auto"
            value={value}
            step={1}
            getAriaValueText={valueLabelFormat}
            valueLabelFormat={valueLabelFormat}
            onChange={handleChange}
            aria-labelledby="non-linear-slider"
          />
          <div id='referenciasFechas'>
              <div> <h6 id='fechaInicio'>2/2020</h6>  </div>
              <div>  </div>
              <div> <h6 id='fechaCierre'>9/2023</h6>  </div>
          </div>
        </div>
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
        <Analisis />
        <Footer />
      </div>
    </div>
  );
}


export default App;
