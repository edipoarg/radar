import { Marker } from "react-map-gl/maplibre";
import styles from "./Markers.module.css";
import type { Case } from "../../../common/json-shape";
import { type CaseTipoId } from "../../types/caseData";

const tipoIdStyles: Record<CaseTipoId, string> = {
  t1: styles.amarillo ?? "",
  t2: styles.naranja ?? "",
  t3: styles.rojo ?? "",
};

type Props = {
  data: Case[];
  setPopupInfo: (c: Case) => void;
  setMarker: (newMarkerId: string | null) => void;
  selected: string | null;
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

export const Markers = ({ data, setPopupInfo, setMarker, selected }: Props) =>
  data.map((event) => (
    <RadarMarker
      key={event.id}
      caseInstance={event}
      selected={selected}
      setMarker={setMarker}
      setPopupInfo={setPopupInfo}
    />
  ));
