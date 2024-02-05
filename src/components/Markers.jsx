import { Marker } from "react-map-gl/maplibre";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./Markers.module.css";

const tipoIdStyles = {
  t1: styles.amarillo,
  t2: styles.naranja,
  t3: styles.rojo,
};

export const Markers = ({
  data,
  setPopupInfo,
  setMarker,
  selected,
  tipoFilters,
}) => {
  const [filteredAndSortedData, setFilteredAndSortedData] = useState([]);

  useEffect(() => {
    const filteredData = data.filter((event) => tipoFilters[event.tipoId]);
    const sortedData = [...filteredData].sort((a, b) => {
      if (a.tipoId === "t3" && b.tipoId !== "t2") return -1;
      if (a.tipoId === "t2" && b.tipoId === "t1") return -1;
      return 1;
    });
    setFilteredAndSortedData(sortedData);
  }, [data, tipoFilters]);

  const renderMarker = (event) => {
    const { coords, title, date, source, id, tipoId } = event;
    const markerStyle = `${styles.circulo} ${id === selected ? styles.selected : ""} ${tipoIdStyles[tipoId]}`;

    return (
      <Marker
        key={id}
        longitude={coords.longitude}
        latitude={coords.latitude}
        onMouseEnter={() => setMarker(id)}
        onMouseLeave={() => setMarker(null)}
        onClick={() => {
          setMarker(id);
          setPopupInfo({
            coords: {
              lat: coords.latitude,
              lng: coords.longitude,
            },
            title,
            date,
            source,
          });
        }}
      >
        <div className={markerStyle} />
      </Marker>
    );
  };

  return (
    <>
      {filteredAndSortedData.reverse().map((event) => (
        <div key={event.id}>{renderMarker(event)}</div>
      ))}
    </>
  );
};

Markers.propTypes = {
  data: PropTypes.array.isRequired,
  setPopupInfo: PropTypes.func.isRequired,
  setMarker: PropTypes.func.isRequired,
  selected: PropTypes.string.isRequired,
  tipoFilters: PropTypes.array.isRequired,
};
