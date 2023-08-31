import {Source, Layer} from 'react-map-gl/maplibre';

export const ProvSource = ({data, style}) => (
  <Source id="provincias-source" type="geojson" data={data}>
    <Layer
      id="provincias-layer"
      type="fill"
      paint={{
        'fill-color': style.fillColor,
        'fill-opacity': style.fillOpacity,
        'fill-outline-color': style.color,

      }}
    />
  </Source>
)
export const DepsSource = ({data, style}) => (
  <Source id="departamentos-source" type="geojson" data={data}>
    <Layer
      id="departamentos-layer"
      type="fill" // Capa de relleno para representar polígonos
      paint={{
        'fill-color': style.fillColor,
        'fill-opacity': style.fillOpacity,
        'fill-outline-color': style.color,
      }}
    />
  </Source>
)
export const BsAsSource = ({data, style}) => (
  <Source id="departamentosBsAs-source" type="geojson" data={data}>
    <Layer
      id="departamentosBsAs-layer"
      type="fill" // Capa de relleno para representar polígonos
      paint={{
        'fill-color': style.fillColor,
        'fill-opacity': style.fillOpacity,
        'fill-outline-color': style.color,

      }}
      minzoom={5} // Set the minimum zoom level to 4

    />
  </Source>
)

