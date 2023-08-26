import React, { useEffect, useState } from "react";
import MapGL, { NavigationControl } from "react-map-gl/maplibre";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { ProvSource, DepsSource, BsAsSource } from "./components/Sources.jsx";
import { Markers } from "./components/Markers.jsx";
import Popup from "./components/Popup.jsx";
import "./App.css";
import mystyle from "./mystyle.json";
import { fecthData } from "./services/fetchs.js";
import moment from "moment/moment.js";
import { Slider } from "@mui/material";
import { provincias, departamentos, departamentosBsAs } from './constants/mapsData/index.js';
import Main2 from './components/main2.jsx'; // Cambia la ruta a tu formulario
import Filtros from './components/filtros.jsx'; // Cambia la ruta a tu formulario
import Analisis from './components/analisis.jsx'
import Listado from './components/listado.jsx';
import Conecta from './components/conecta.jsx';
import Reporta from './components/reporta.jsx';
import Notas from './components/notas';
import { Route, useLocation } from "react-router-dom";


//estilos/////////////////////

const style = {
  country: {
    fillColor: "#d8d7fa",
    fillOpacity: 0.6,
    color: "black",
    weight: 0.2,
  },
  departamentos: {
    fillColor: "#a2a8f4",
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
    fillColor: "#b2b7f5",
    color: "blue",
    weight: 1,
    lineColor: "#b2b7f5",
    fillOpacity: 1,
    lineWidth: [
      [1, 0.3],
      [6, 1],
      [14, 15],
      [22, 12],
    ],
  },
};

function App(urls) {

  const location = useLocation();

  // Verifica si la ubicación actual coincide con una de las rutas.
  const isHomePage = location.pathname === "/mapa";
  const isConectaPage = location.pathname === "/conecta";
  const isReportaPage = location.pathname === "/reporta";
  const isNotasPage = location.pathname === "/notas";
  const isListadoPage = location.pathname === "/listado";

  const [hoveredFeatureId, setHoveredFeatureId] = useState(null);
  const [hoveredMarkerId, setHoveredMarkerId] = useState(null);
  const [popupInfo, setPopupInfo] = useState(null);
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [months, setMonths] = useState(0);
  const [value, setValue] = useState(0);
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

  useEffect(() => {
    const diff = months - value;

    const date = moment().startOf("month").subtract(diff, "months");
    if (data) {
      const checkDate = (e) => {
        const eventDate = new moment(e.date, "DD/MM/YYYY");
        return eventDate >= date;
      };
      setFilteredData(data.filter(checkDate));
    }
  }, [value]);

  const handleHover = (event) => {
    setHoveredFeatureId(event.features?.[0]?.id || null);
  };

  const handleLeave = () => setHoveredFeatureId(null);

  const mapProps = {
    initialViewState: {
      longitude: -65.0, // Coordenada longitudinal de Argentina
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
    }
  }, [data]);

  return (
    <>



      {isHomePage && (
        <div>
          <div className="App">
            <Filtros caseCount={filteredData.length} ></Filtros>
            <div id='mapGap'></div>
            <MapGL
              id="mapa"
              mapLib={maplibregl}
              {...mapProps}
              onHover={handleHover} // Asignar la función handleProvinciasHover al evento onHover
              onLeave={handleLeave} // Asignar la función handleProvinciasLeave al evento onLeave
            >
              {/* Capa interactiva para provincias */}

              <ProvSource data={provincias} selected={hoveredFeatureId} />
              <DepsSource data={departamentos} style={style.departamentos} />
              <BsAsSource data={departamentosBsAs} style={style.country} />

              {data && (
                <Markers
                  events={filteredData}
                  setPopupInfo={setPopupInfo}
                  setMarker={setHoveredMarkerId}
                  selected={hoveredMarkerId}
                />
              )}
              <NavigationControl position="top-right" />
            </MapGL>

            <div className="slider-container">
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

            {popupInfo && <Popup {...popupInfo} />}

            <Main2>

            </Main2>
            <Analisis></Analisis>

          </div>   </div>
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


  );
}


export default App;
