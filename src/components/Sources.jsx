import {Source, Layer} from 'react-map-gl/maplibre';

export const ProvSource = ({data, selected}) => (
  <Source id="provincias-source" type="geojson" data={data}>
    <Layer
      id="provincias-layer"
      type="fill"
      paint={{
        'fill-color': [
          'case',
          ['==', ['id'], selected],
          '#000000', // Fill color when hovered
          '#b2b7f5', // Fill color when not hovered
        ],
        'fill-opacity': 1,
        'fill-outline-color': [
          'case',
          ['==', ['id'], selected],
          '#ffffff', // Fill outline color when hovered
          'blue', // Fill outline color when not hovered
        ],
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
    />
  </Source>
)
