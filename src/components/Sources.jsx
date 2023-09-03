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
      minzoom={6} // Set the minimum zoom level to 4

    />
  </Source>
)

export const MunicipiosSource = ({data, style}) => (
  <Source id="municipios-source" type="geojson" data={data}>
    <Layer
      id="municipios-layer"
      type="fill" // Capa de relleno para representar polígonos
      paint={{
        'fill-color': style.fillColor,
        'fill-opacity': style.fillOpacity,
        'fill-outline-color': style.color,

      }}
      minzoom={6} // Set the minimum zoom level to 4

    />
  </Source>
)

export const RutasSource = ({data, style}) => (
  <Source id="rutas-source" type="geojson" data={data}>
    <Layer
      id="rutas-layer"
      type="line"
      paint={{
        'line-color': style.lineColor, // Usar 'line-color' en lugar de 'fill-color' para líneas
        'line-opacity': style.lineOpacity, // Usar 'line-opacity' en lugar de 'fill-opacity' para líneas
        'line-width': style.lineWidth, // Ancho de la línea
      }}
      minzoom={4} // Set the minimum zoom level to 4

    />
  </Source>
)



/*NOMBRES PROVINCIAS Y MUNICIPIOS */

export const ProvinciasNameSource = ({data}) => (
  <Source id="ProcinvicasName-source" type="geojson" data={data}>
    <Layer
      id="provincias-label"
      type="symbol"
      layout={{
        'text-field': ['get', 'nombre_completo'],
        'text-anchor': 'center',
        'text-offset': [0, 0], // Ajusta el desplazamiento según tus necesidades
      }}
      paint={{
        'text-color': 'black', // Color del texto

      }}
      minzoom={4} // Set the minimum zoom level to 4

    />
  </Source>
)