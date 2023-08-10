import  React, { useState, useEffect } from 'react';
import MapGL, {NavigationControl, Source, Layer, Marker} from 'react-map-gl/maplibre';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

import {ProvSource, DepsSource, BsAsSource} from './components/Sources.jsx';
import {Markers} from './components/Markers.jsx';

import Popup from './components/Popup.jsx';
import Navbar from './components/navbar.jsx';

import './App.css';
import casosData from "../public/data/casos.js";
import mystyle from './mystyle.json';

//limites geograficos

const argentinaBounds = {
  north: -15.7818, // Latitud máxima de Argentina
  south: -58.0575, // Latitud mínima de Argentina
  west: -77.5604, // Longitud mínima de Argentina
  east: -45.6375, // Longitud máxima de Argentina
};

//estilos/////////////////////7


const style = {
  country: {
    fillColor: "#d8d7fa",
    fillOpacity: 0.6,
    color: "black",
    weight: 0.2,
  }, departamentos: {
    fillColor: '#a2a8f4',
    fillOpacity: 0,
    color: 'black',
    weight: 2,
    lineColor: '#198EC8',
    lineWidth: [
      [0, 3],
      [6, 6],
      [14, 9],
      [22, 18],
    ],
  }, provincias: {
    fillColor: '#b2b7f5',
    color: 'blue',
    weight: 1,
    lineColor: '#b2b7f5',
    fillOpacity: 1,
    lineWidth: [
      [1, 0.3],
      [6, 1],
      [14, 15],
      [22, 12],
    ],
  }
}

function App(urls) {

  const [hoveredFeatureId, setHoveredFeatureId] = useState(null);
  const [hoveredMarkerId, setHoveredMarkerId] = useState(null);
  const [popupInfo, setPopupInfo] = useState(null);

  const handleHover = (event) => {
    setHoveredFeatureId(event.features?.[0]?.id || null);
  };

  const handleLeave = () => setHoveredFeatureId(null);

  const mapProps = {
    initialViewState: {
      longitude: -65.0, // Coordenada longitudinal de Argentina
      latitude: -40.0, // Coordenada latitudinal de Argentina
      zoom: 3.7,       //zoom inicial
      minZoom: 1,  // Nivel mínimo de zoom permitido
      maxZoom: 10, // Nivel máximo de zoom permitido
    }, style: {
      width: "100%",
      height: " calc(100vh - 77px)"
    }, mapStyle: mystyle
  }

  return (
    <div className="App">
      <Navbar/>
      <MapGL mapLib={maplibregl} {...mapProps}
             onHover={handleHover} // Asignar la función handleProvinciasHover al evento onHover
             onLeave={handleLeave} // Asignar la función handleProvinciasLeave al evento onLeave
      >

        {/* Capa interactiva para provincias */}
        <ProvSource data={urls.provincias} selected={hoveredFeatureId}/>
        <DepsSource data={urls.departamentos} style={style.departamentos}/>
        <BsAsSource data={urls.departamentosBsAs} style={style.country}/>

        <Markers casos={casosData} setPopupInfo={setPopupInfo}
                 setMarker={setHoveredMarkerId} selected={hoveredMarkerId}/>

        <NavigationControl position="bottom-right" />
      </MapGL>
      {popupInfo && <Popup {...popupInfo} />}
    </div>
  );
}

export default App;
