import { Marker } from "react-map-gl/maplibre";
import styles from "./Markers.module.css";
import type { Case } from "../../../common/json-shape";
import { getColorByAttack } from "../../helpers/colorByAttackType";

type RadarMarkerProps = {
  caseInstance: Case;
  selected: string | null;
  setPopupInfo: (c: Case) => void;
  setMarker: (newMarkerId: string | null) => void;
  colorByAttackType: Record<string, string>;
};

const RadarMarker = ({
  caseInstance,
  selected,
  setMarker,
  setPopupInfo,
  colorByAttackType,
}: RadarMarkerProps) => {
  const { coords, id } = caseInstance;
  const markerStyle = `${styles.circulo} ${`${id}` === selected ? styles.selected : ""}`;
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
      <div
        className={markerStyle}
        style={{
          backgroundColor: getColorByAttack(
            colorByAttackType,
            caseInstance.tipo[0] as string,
          ),
        }}
      />
    </Marker>
  );
};

type Props = {
  cases: Case[];
  setPopupInfo: (c: Case) => void;
  setMarker: (newMarkerId: string | null) => void;
  selected: string | null;
  colorByAttackType: Record<string, string>;
};

export const Markers = ({
  cases,
  setPopupInfo,
  setMarker,
  selected,
  colorByAttackType,
}: Props) =>
  cases.map((attack) => (
    <RadarMarker
      colorByAttackType={colorByAttackType}
      key={attack.id}
      caseInstance={attack}
      selected={selected}
      setMarker={setMarker}
      setPopupInfo={setPopupInfo}
    />
  ));
