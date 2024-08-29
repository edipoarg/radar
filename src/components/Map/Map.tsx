import { useState } from "react";
import MapGL, { NavigationControl } from "react-map-gl/maplibre";
import maplibregl from "maplibre-gl";
import type { Attack } from "../../../common/json-shape";
import {
  ProvSource,
  DepsSource,
  BsAsSource,
  RutasSource,
} from "../Sources/Sources";
import { Markers } from "../Markers/Markers";
import type { MapStyle } from "react-map-gl/maplibre";
import mystyle from "./mystyle.json";
import "maplibre-gl/dist/maplibre-gl.css";

const mapSourceStyles = {
  country: {
    fillColor: "#bacbff",
    fillOpacity: 0.6,
    color: "#2b3bcd",
    weight: 0.2,
  },
  departamentos: {
    fillColor: "#bacbff",
    fillOpacity: 0,
    color: "black",
    weight: 2,
    lineColor: "#198EC8",
    lineWidth: [
      [0, 3],
      [6, 6],
      [14, 9],
      [22, 18],
    ],
  },
  provincias: {
    fillColor: "#bacbff",
    color: "#2b3bcd",
    weight: 2,
    lineColor: "#b2b7f5",
    fillOpacity: 1,
    lineWidth: 2,
  },

  rutas: {
    fillColor: "#bacbff",
    color: "#2b3bcd",
    weight: 2,
    lineColor: "white",
    lineOpacity: 1,
    lineWidth: 2,
  },
};

type Props = {
  setPopupInfo: (attack: Attack) => void;
  sourceData: {
    provincias: unknown;
    departamentos: unknown;
    departamentosBsAs: unknown;
    rutas: unknown;
  };
  attacksToShow: Attack[];
  colorByAttackType: Record<string, string>;
};

export const RadarMap = ({
  setPopupInfo,
  sourceData,
  attacksToShow,
  colorByAttackType,
}: Props) => {
  const [selectedMarkerId, setSelectedMarkerId] = useState<null | string>(null);
  const { provincias, departamentos, departamentosBsAs, rutas } = sourceData;

  const mapProps = {
    initialViewState: {
      longitude: -72.0, // Coordenada longitudinal de Argentina
      latitude: -40.0, // Coordenada latitudinal de Argentina
      zoom: 2.7, //zoom inicial
      minZoom: 2, // Nivel mínimo de zoom permitido
      maxZoom: 15, // Nivel máximo de zoom permitido
    },
    style: {
      width: "100vw",
      height: "92vh",
    },
    mapStyle: mystyle as MapStyle,
  };
  return (
    <div
      style={{
        background: "linear-gradient(20deg, #0a0d15, #292f36)",
      }}
    >
      <MapGL
        mapLib={maplibregl}
        {...{
          ...mapProps,
          style: { ...mapProps.style },
        }}
      >
        <ProvSource data={provincias} style={mapSourceStyles.provincias} />
        <DepsSource
          data={departamentos}
          style={mapSourceStyles.departamentos}
        />
        <BsAsSource data={departamentosBsAs} style={mapSourceStyles.country} />
        <RutasSource data={rutas} style={mapSourceStyles.rutas} />

        {attacksToShow.length !== 0 && (
          <Markers
            attacks={attacksToShow}
            setPopupInfo={setPopupInfo}
            setMarker={setSelectedMarkerId}
            selected={selectedMarkerId}
            colorByAttackType={colorByAttackType}
          />
        )}
        <NavigationControl position="top-right" />
      </MapGL>
    </div>
  );
};
