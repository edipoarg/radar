import  React, { useState, useEffect } from 'react';
import MapGL, {NavigationControl, Source, Layer, Marker, Popup} from 'react-map-gl/maplibre';

import Navbar from './components/navbar.jsx';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import './App.css';
import argentinaRoutes from "../public/data/rutas.json"
import casosData from "../public/data/casos.js"; 
import departamentos from "../public/data/departamentos-argentina.json";
import departamentosBsAs from "../public/data/departamentos-buenos_aires.json";
import provincias from "../public/data/provincias.json";
import mystyle from './mystyle.json';










 
  //limites geograficos

  const argentinaBounds = {
    north: -15.7818, // Latitud máxima de Argentina
    south: -58.0575, // Latitud mínima de Argentina
    west: -77.5604, // Longitud mínima de Argentina
    east: -45.6375, // Longitud máxima de Argentina
  };

  





     //estilos/////////////////////7

     
  const countryStyle = {
    fillColor: "#d8d7fa",
    fillOpacity: 0.6,
    color: "black",
    weight: 0.2,
  };
  const departamentosStyle = {
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
  };

//cont provincias


  const provinciasStyle = {
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
  };

     




function App() {


  const [hoveredFeatureId, setHoveredFeatureId] = useState(null);
 
  //hover marker state
  const [hoveredMarkerId, setHoveredMarkerId] = useState(null);

  //popupinfo
  const [popupInfo, setPopupInfo] = useState(null);




  const handleHover = (event) => {
    const hoveredFeatureId = event.features?.[0]?.id || null;
    setHoveredFeatureId(hoveredFeatureId);
  };

  const handleLeave = () => {
    setHoveredFeatureId(null);
    };

    const handleMarkerHover = (casoId) => {
      setHoveredMarkerId(casoId);
    };
  
    const handleMarkerLeave = () => {
      setHoveredMarkerId(null);
    };


//CLICK


const showPopup = (longitude, latitude, content) => {
  setPopupInfo({
    longitude,
    latitude,
    content
  });
};

const hidePopup = () => {
  setPopupInfo(null);
};

//////////////////////
//filtro x temporalidad
////////////////////////


 


  ///////////////////////////////////////////
  ///////////////////////////////////////////

  //RENDER


  return (
    <div className="App">
      
      
     {/* Filtro temporal  */}
    

      
      <Navbar/>
      <MapGL mapLib={maplibregl} 
        initialViewState={{
          longitude: -65.0, // Coordenada longitudinal de Argentina
          latitude: -40.0, // Coordenada latitudinal de Argentina
          zoom: 3.7, //zoom inicial
          minZoom: 1, // Nivel mínimo de zoom permitido
          maxZoom: 10, // Nivel máximo de zoom permitido
        }}
        style={{width: "100%", height: " calc(100vh - 77px)"}}
        mapStyle= {mystyle}
       
       

//llamada a hover dentro del mapa
        onHover={handleHover} // Asignar la función handleProvinciasHover al evento onHover
        onLeave={handleLeave} // Asignar la función handleProvinciasLeave al evento onLeave
      
      //llamada a limites geograficos
       
      
     //</div> maxBounds={[
      //  [argentinaBounds.west, argentinaBounds.south],

       // [argentinaBounds.east, argentinaBounds.north],
             
         //     ]}
      
      >

 {/* Capa interactiva para provincias */}
 <Source id="provincias-source" type="geojson" data={provincias}>
          <Layer
            id="provincias-layer"
            type="fill"
            paint={{
              'fill-color': [
                'case',
                ['==', ['id'], hoveredFeatureId],
                '#000000', // Fill color when hovered
                '#b2b7f5', // Fill color when not hovered
              ],
              'fill-opacity': 1,
              'fill-outline-color': [
                'case',
                ['==', ['id'], hoveredFeatureId],
                '#ffffff', // Fill outline color when hovered
                'blue', // Fill outline color when not hovered
              ],
            }}
          />
        </Source>

        


         {/* Agregar el Source y Layer para mostrar los departamentos */}
         {departamentos && (
          <Source id="departamentos-source" type="geojson" data={departamentos}>
            <Layer
              id="departamentos-layer"
              type="fill" // Capa de relleno para representar polígonos
              paint={{
                'fill-color': departamentosStyle.fillColor,
        'fill-opacity': departamentosStyle.fillOpacity,
        'fill-outline-color': departamentosStyle.color,
              }}
            />
          </Source>
        )}

        {/* Agregar el Source y Layer para mostrar los departamentos de Buenos Aires */}
        {departamentosBsAs && (
          <Source id="departamentosBsAs-source" type="geojson" data={departamentosBsAs}>
            <Layer
              id="departamentosBsAs-layer"
              type="fill" // Capa de relleno para representar polígonos
              paint={{
                'fill-color': countryStyle.fillColor,
        'fill-opacity': countryStyle.fillOpacity,
        'fill-outline-color': countryStyle.color,
        
        
                
              
              }}
            />
          </Source>
        )}



        {/* Render markers for each case */}
        {casosData.map((caso) => (
          <div key={caso.ID}>
            <Marker
              longitude={caso.Coordenadas[1]}
              latitude={caso.Coordenadas[0]}
              onMouseEnter={() => handleMarkerHover(caso.ID)}
              onMouseLeave={handleMarkerLeave}
              onClick={() =>
                showPopup(
                  caso.Coordenadas[1],
                  caso.Coordenadas[0],
                  `
                  <div>
                    <h3>${caso["Título del hecho"]}</h3>
                    <p>Fecha: ${caso.Fecha}</p>
                    <p>Fuente: <a href="${caso.Fuente}" target="_blank" rel="noreferrer">${caso.Fuente}</a></p>
                  </div>
                  `
                )
              }
            >
              <div className={`marker ${caso.ID === hoveredMarkerId ? "hovered" : ""}`}>
                <span>{caso.ID}</span>
              </div>
            </Marker>
          </div>
        ))}


        <NavigationControl position="bottom-right" />
      </MapGL>
      {popupInfo && (
        <div className="popup" style={{ left: popupInfo.longitude, top: popupInfo.latitude }}>
          <div dangerouslySetInnerHTML={{ __html: popupInfo.content }} />
        </div>
      )}
    </div>
  );
}

export default App;
