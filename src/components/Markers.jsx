import { Marker } from "react-map-gl/maplibre";

export const Markers = ({ events, setPopupInfo, setMarker, selected }) =>
  events.map((event, index) => {
    const { coords, title, date, source, id } = event;
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
          <div className={`marker ${id === selected ? "hovered" : ""}`}>
            <span>{id}</span>
          </div>
        </Marker>
      </div>
    );
  });
