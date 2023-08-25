import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Loader from './components/Loader.jsx';
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Loader
      urls={{
        departamentos: "../src/public/data/mapsData/departamentos-argentina.json",
        departamentosBsAs: "../src/public/data/mapsData/departamentos-buenos_aires.json",
        provincias: "../src/public/data/mapsData/provincias.json",
        rutas: "../src/public/data/mapsData/rutas.json",
      }}
    >
      <App />
    </Loader>
  </React.StrictMode>
);
