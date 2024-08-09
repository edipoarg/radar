import { Marker } from "react-map-gl/maplibre";
import { useState, useEffect } from "react";
import styles from "./Markers.module.css";
import type { Case } from "../../../common/json-shape";
import { isCaseTipoId, type CaseTipoId } from "../../types/caseData";

const tipoIdStyles = {
  t1: styles.amarillo,
  t2: styles.naranja,
  t3: styles.rojo,
};

type Props = {
  data: Case[];
  setPopupInfo: (c: Case) => void;
  setMarker: (newMarkerId: string | null) => void;
  selected: string | null;
  tipoFilters: Record<CaseTipoId, boolean>;
};

type RadarMarkerProps = {
  caseInstance: Case;
  selected: string | null;
  setPopupInfo: (c: Case) => void;
  setMarker: (newMarkerId: string | null) => void;
};

const RadarMarker = ({
  caseInstance,
  selected,
  setMarker,
  setPopupInfo,
}: RadarMarkerProps) => {
  const { coords, id, tipoId } = caseInstance;
  const markerStyle = `${styles.circulo} ${`${id}` === selected ? styles.selected : ""} ${tipoId[0] ? tipoIdStyles[tipoId[0] as CaseTipoId] : ""}`;

  return (
    <Marker
      key={id}
      longitude={coords.longitude}
      latitude={coords.latitude}
      onClick={() => {
        setMarker(`${id}`);
        setPopupInfo(caseInstance);
      }}
    >
      <div className={markerStyle} />
    </Marker>
  );
};

export const Markers = ({
  data,
  setPopupInfo,
  setMarker,
  selected,
  tipoFilters,
}: Props) => {
  const [filteredAndSortedData, setFilteredAndSortedData] = useState<Case[]>(
    [],
  );

  useEffect(() => {
    const filteredData = data.filter((event) =>
      event.tipoId
        .filter((individualTipoId) => isCaseTipoId(individualTipoId))
        .every((individualTipoId) => tipoFilters[individualTipoId]),
    );
    const sortedData = [...filteredData].sort((a, b) => {
      const aTipoId = a.tipoId[0];
      const bTipoId = b.tipoId[0];

      if (aTipoId === "t3" && bTipoId !== "t2") return -1;
      if (aTipoId === "t2" && bTipoId === "t1") return -1;
      return 1;
    });
    setFilteredAndSortedData(sortedData.reverse());
  }, [data, tipoFilters]);

  return (
    <>
      {filteredAndSortedData.map((event) => (
        <RadarMarker
          key={event.id}
          caseInstance={event}
          selected={selected}
          setMarker={setMarker}
          setPopupInfo={setPopupInfo}
        />
      ))}
    </>
  );
};
