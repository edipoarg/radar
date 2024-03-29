import { Source, Layer } from "react-map-gl/maplibre";
import PropTypes from "prop-types";

export const ProvSource = ({ data, style }) => (
  <Source id="provincias-source" type="geojson" data={data}>
    <Layer
      id="provincias-layer"
      type="fill"
      paint={{
        "fill-color": style.fillColor,
        "fill-opacity": style.fillOpacity,
        "fill-outline-color": style.color,
      }}
    />
  </Source>
);
export const DepsSource = ({ data, style }) => (
  <Source id="departamentos-source" type="geojson" data={data}>
    <Layer
      id="departamentos-layer"
      type="fill" // Capa de relleno para representar polígonos
      paint={{
        "fill-color": style.fillColor,
        "fill-opacity": style.fillOpacity,
        "fill-outline-color": style.color,
      }}
    />
  </Source>
);
export const BsAsSource = ({ data, style }) => (
  <Source id="departamentosBsAs-source" type="geojson" data={data}>
    <Layer
      id="departamentosBsAs-layer"
      type="fill" // Capa de relleno para representar polígonos
      paint={{
        "fill-color": style.fillColor,
        "fill-opacity": style.fillOpacity,
        "fill-outline-color": style.color,
      }}
      minzoom={6} // Set the minimum zoom level to 4
    />
  </Source>
);

export const MunicipiosSource = ({ data, style }) => (
  <Source id="municipios-source" type="geojson" data={data}>
    <Layer
      id="municipios-layer"
      type="fill" // Capa de relleno para representar polígonos
      paint={{
        "fill-color": style.fillColor,
        "fill-opacity": style.fillOpacity,
        "fill-outline-color": style.color,
      }}
      minzoom={6} // Set the minimum zoom level to 4
    />
  </Source>
);

export const RutasSource = ({ data, style }) => (
  <Source id="rutas-source" type="geojson" data={data}>
    <Layer
      id="rutas-layer"
      type="line"
      paint={{
        "line-color": style.lineColor, // Usar 'line-color' en lugar de 'fill-color' para líneas
        "line-opacity": style.lineOpacity, // Usar 'line-opacity' en lugar de 'fill-opacity' para líneas
        "line-width": style.lineWidth, // Ancho de la línea
      }}
      minzoom={4} // Set the minimum zoom level to 4
    />
  </Source>
);

const SourcePropTypes = {
  data: PropTypes.object.isRequired,
  style: PropTypes.shape({
    fillColor: PropTypes.string,
    fillOpacity: PropTypes.string,
    color: PropTypes.string,
    lineColor: PropTypes.string,
    lineOpacity: PropTypes.string,
    lineWidth: PropTypes.string,
  }),
};

ProvSource.propTypes = SourcePropTypes;
DepsSource.propTypes = SourcePropTypes;
BsAsSource.propTypes = SourcePropTypes;
MunicipiosSource.propTypes = SourcePropTypes;
RutasSource.propTypes = SourcePropTypes;
