import { Marker } from "react-map-gl/maplibre";
import styles from "./Markers.module.css";
import type { Attack } from "../../../common/json-shape";
import { getColorByAttack } from "../../helpers/colorByAttackType";

type RadarMarkerProps = {
  attack: Attack;
  selected: string | null;
  setSelectedAttack: (c: Attack) => void;
  setMarker: (newMarkerId: string | null) => void;
  colorByAttackType: Record<string, string>;
};

const RadarMarker = ({
  attack,
  selected,
  setMarker,
  setSelectedAttack,
  colorByAttackType,
}: RadarMarkerProps) => {
  const { coords, id } = attack;
  const markerStyle = `${styles.circulo} ${`${id}` === selected ? styles.selected : ""}`;
  return (
    <Marker
      key={id}
      longitude={coords.longitude}
      latitude={coords.latitude}
      onClick={() => {
        setMarker(`${id}`);
        setSelectedAttack(attack);
      }}
    >
      <div
        className={markerStyle}
        style={{
          backgroundColor: getColorByAttack(
            colorByAttackType,
            attack.tipo[0] as string,
          ),
        }}
      />
    </Marker>
  );
};

type Props = {
  attacks: Attack[];
  setSelectedAttack: (c: Attack) => void;
  setMarker: (newMarkerId: string | null) => void;
  selected: string | null;
  colorByAttackType: Record<string, string>;
};

export const Markers = ({
  attacks,
  setSelectedAttack,
  setMarker,
  selected,
  colorByAttackType,
}: Props) =>
  attacks.map((attack) => (
    <RadarMarker
      colorByAttackType={colorByAttackType}
      key={attack.id}
      attack={attack}
      selected={selected}
      setMarker={setMarker}
      setSelectedAttack={setSelectedAttack}
    />
  ));
