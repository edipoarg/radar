import React, { useEffect, useState } from "react";
import MapGL, { NavigationControl } from "react-map-gl/maplibre";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { ProvSource, DepsSource, BsAsSource, RutasSource} from "./components/Sources.jsx";
import { Markers } from "./components/Markers.jsx";
import Popup from "./components/Popup.jsx";
import "./App.css";
import mystyle from "./mystyle.json";
import { fecthData } from "./services/fetchs.js";
import moment from "moment/moment.js";
import { Slider } from "@mui/material";
import {
  provincias,
  departamentos,
  departamentosBsAs,
  rutas,
} from "../public/data/mapsData/index.js";
import Main2 from './components/Main2.jsx'; // Cambia la ruta a tu formulario
import Filtros from './components/filtros.jsx'; // Cambia la ruta a tu formulario
import Analisis from './components/analisis.jsx'
import Listado from './components/listado.jsx';
import Conecta from './components/conecta.jsx';
import Reporta from './components/reporta.jsx';
import Notas from './components/notas';
import { useLocation } from "react-router-dom";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import { motion } from 'framer-motion';
import CloseButton from 'react-bootstrap/CloseButton';



//estilos/////////////////////

const style = {
  country: {
    fillColor: "#d8d7fa",
    fillOpacity: 0.6,
    color: "blue",
    weight: 0.2,

  },
  departamentos: {
    fillColor: "#d8d7fa",
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
    fillColor: "#d8d7fa",
    color: "blue",
    weight: 2,
    lineColor: "#b2b7f5",
    fillOpacity: 1,
    lineWidth: 2,
  },


  rutas: {
    fillColor: "#d8d7fa",
    color: "blue",
    weight: 2,
    lineColor: "white",
    lineOpacity: 1,
    lineWidth: 2,
  },



};

function App(urls) {




  const handleTipoFilter = () => {
    const filteredDataByType = filteredDataByTime.filter(event => tipoFilters[event.tipoId]);
    setFilteredData(filteredDataByType);
  };

  const [tipoFilters, setTipoFilters] = useState({
    t3: true,
    t2: true,
    t1: true,

  });
  // Estado para controlar la visibilidad de "Filtros"
  const [filtrosVisible, setFiltrosVisible] = useState(true);

  // Función para cambiar la visibilidad de "Filtros"
  const toggleFiltrosVisibility = () => {
    setFiltrosVisible(!filtrosVisible);
  };




  const [hoveredFeatureId, setHoveredFeatureId] = useState(null);
  const [hoveredMarkerId, setHoveredMarkerId] = useState(null);
  const [popupInfo, setPopupInfo] = useState(null);
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [months, setMonths] = useState(0);
  const [value, setValue] = useState([0, 30]);
  const valueLabelFormat = (value) => {
    const diff = months - value;
    const date = moment().subtract(diff, "months");
    return `${date.month() + 1}/${date.year()}`;
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    const apiCal = async () => {
      try {
        const data = await fecthData();
        if (data) {
          setData(data);
          setFilteredData(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    apiCal();
  }, []);




  const [filteredDataByTime, setFilteredDataByTime] = useState([]);


  useEffect(() => {
    console.log(value);
    const diff = months - value;

    const from = moment()
      .startOf("month")
      .subtract(months - value[0], "months");
    const to = moment()
      .startOf("month")
      .subtract(months - value[1], "months");

    if (data) {
      const checkDate = (e) => {
        const eventDate = new moment(e.date, "DD/MM/YYYY");
        return eventDate >= from && eventDate <= to;
      };
      const newData = data.filter(checkDate);
      setFilteredDataByTime(newData);


      // Aplicar también los filtros de tipo a los datos filtrados por tiempo
      const filteredDataByType = newData.filter(event => tipoFilters[event.tipoId]);
      setFilteredData(filteredDataByType);

    }
  }, [value, data, tipoFilters]);

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
    if (data) {
      const now = new moment();
      let from = new moment();
      data.forEach((e) => {
        const date = new moment(e.date, "DD/MM/YYYY");

        if (date <= from) {
          from = date;
        }
      });

      const yearsDiff = now.year() - from.year();
      const monthDiff = now.month() - from.month();

      const totalMonths = yearsDiff * 12 + monthDiff;
      setMonths(totalMonths);
      setValue([0, totalMonths]);
    }
  }, [data]);


  // Step 1: Create a state variable for the close button
  const [isCloseButtonClicked, setIsCloseButtonClicked] = useState(false);

  // Step 2: Create a click handler for the close button
  const handleClickCloseButton = () => {
    // Toggle the state when the button is clicked
    setIsCloseButtonClicked(!isCloseButtonClicked);

    // Add any additional logic you want when the button is clicked
  };




  return (
  
        <div>
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

            {/* Render different button content based on the state */}
            <button
              aria-label="Hide"
              onClick={() => { handleClickCloseButton(); toggleFiltrosVisibility(); }}
              className={isCloseButtonClicked ? "transformed-button" : "simple-button"}
            >
              {isCloseButtonClicked ? (
                // Content when the button is clicked
                // You can use any JSX or HTML here
                <div><motion.img
                  key="menu.png"
                  src="menu.png"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  whileHover={{
                    scale: [1, 2, 2, 1, 1]
                  }}
                /></div>
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


              


              {data && (
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

            </div>

            <ScrollLink
              to="main2-content" // ID del elemento de destino (Main2)
              spy={true} // Activa el modo espía
              smooth={true} // Activa el desplazamiento suave
              duration={500} // Duración de la animación (en milisegundos)
              offset={-70} // Ajusta un offset opcional (si tienes un encabezado fijo)
            >
              <div id="toMain2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                  <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                </svg>
              </div>
            </ScrollLink>





            {popupInfo && <Popup {...popupInfo} />}

            <Main2 />
            <Analisis></Analisis>

          </div>   </div>
<<<<<<< HEAD
      
     
    
=======
      )}
      {isMain2Page && (
        <div>
          {/* Contenido específico de la página Main2 */}
          <Main2 />
        </div>
      )}
      {isReportaPage && (
        <div>
          {/* Contenido específico de la página Reporta */}
          <Reporta></Reporta>
        </div>
      )}
      {isConectaPage && (
        <div>
          {/* Contenido específico de la página Conecta */}
          <Conecta></Conecta>
        </div>
      )}


      {isNotasPage && (
        <div>
          {/* Contenido específico de la página Notas */}
          <Notas></Notas>
        </div>
      )}
      {isListadoPage && (
        <div>
          {/* Contenido específico de la página Listado */}
          <Listado></Listado>
        </div>
      )}

    </>
>>>>>>> 66920875c042f71d4047c2a3b04b3911cb039dd2


  );
}


export default App;