import {Marker} from 'react-map-gl/maplibre';

export const Markers = ({casos, setPopupInfo, setMarker, selected}) => (
  casos.map((caso) => (
    <div key={caso.ID}>
      <Marker 
        longitude={caso.Coordenadas[1]}
        latitude={caso.Coordenadas[0]}
        onMouseEnter={() => setMarker(caso.ID)}
        onMouseLeave={() => setMarker(null)}
        onClick={() =>
          setPopupInfo(
            {
              coords: {
                lat: caso.Coordenadas[0],
                lng: caso.Coordenadas[1],
              },
              title: caso["Título del hecho"],
              date: caso.Fecha,
              source: caso.Fuente
            }

          )
        }
      >
        <div className={`marker ${caso.ID === selected ? "hovered" : ""}`}>
          <span>{caso.ID}</span>
          
         
        </div>
  
        
      </Marker>
      
    </div>
)))
