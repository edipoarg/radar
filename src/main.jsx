import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Loader from './components/Loader.jsx';
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Loader
      urls={{
        departamentos: "radarV3/data/mapsData/departamentos-argentina.json",
        departamentosBsAs: "radarV3/data/mapsData/departamentos-buenos_aires.json",
        provincias: "radarV3/data/mapsData/provincias.json",
        rutas: "radarV3/data/mapsData/rutas.json",
      }}
    >
      <App />
    </Loader>
  </React.StrictMode>
);
