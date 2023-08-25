import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Loader from './components/Loader.jsx';
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Loader
      urls={{
        departamentos: "/src/constants/mapsData/departamentos-argentina.json",
        departamentosBsAs: "/src/constants/mapsData/departamentos-buenos_aires.json",
        provincias: "/src/constants/mapsData/provincias.json",
        rutas: "/src/constants/mapsData/rutas.json",
      }}
    >
      <App />
    </Loader>
  </React.StrictMode>
);
