import { Source, Layer } from "react-map-gl/maplibre";
import type {
  FillLayerSpecification,
  LineLayerSpecification,
} from "maplibre-gl";

type LayerPaintProperty = NonNullable<FillLayerSpecification["paint"]>;
type FillOpacity = LayerPaintProperty["fill-opacity"];

interface SourceWithFillLayerProps {
  data: unknown;
  style: {
    fillColor: string;
    fillOpacity: FillOpacity;
    color: string;
  };
}

export const ProvSource = ({ data, style }: SourceWithFillLayerProps) => (
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
export const BsAsSource = ({ data, style }: SourceWithFillLayerProps) => (
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

type LinePaintProperty = NonNullable<LineLayerSpecification["paint"]>;
type LineColor = LinePaintProperty["line-color"];
type LineOpacity = LinePaintProperty["line-opacity"];
type LineWidth = LinePaintProperty["line-width"];
interface SourceWithLineLayerProps {
  data: unknown;
  style: {
    lineColor: LineColor;
    lineOpacity: LineOpacity;
    lineWidth: LineWidth;
  };
}

export const RutasSource = ({ data, style }: SourceWithLineLayerProps) => (
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
