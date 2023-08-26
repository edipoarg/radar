import { Marker } from "react-map-gl/maplibre";



const tipoIdStyles = {
  t1: "amarillo",
  t2: "naranja",
  t3: "rojo",
};




export const Markers = ({ events, setPopupInfo, setMarker, selected }) =>
  events.map((event, index) => {
    const { coords, title, date, source, id, tipoId } = event;
    const markerStyle = `marker ${id === selected ? "hovered" : ""} ${
      tipoIdStyles[tipoId]
    }`;
    return (
      <div key={index}>
        <Marker
          longitude={coords.longitude}
          latitude={coords.latitude}
          onMouseEnter={() => setMarker(id)}
          onMouseLeave={() => setMarker(null)}
          onClick={() =>
            setPopupInfo({
              coords: {
                lat: coords.latitude,
                lng: coords.longitude,
              },
              title,
              date,
              source,
            })
          }
        >
          <div className={markerStyle}>
            <span>{id}</span>
          </div>
        </Marker>
      </div>
    );
  });
