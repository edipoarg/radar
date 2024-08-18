import React from "react";
import ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Conecta from "./components/Conecta/Conecta";
import Notas from "./components/Notas/Notas";
import Root from "./routes/Root";
import Navlinks from "./routes/index";
import { fetchUrlsData } from "./helpers/fetchUrlsData";
import Landing from "./components/Landing/Landing";

const loader = async () => ({
  urls: await fetchUrlsData({
    departamentos: "data/mapsData/departamentos-argentina.json",
    departamentosBsAs: "data/mapsData/departamentos-buenos_aires.json",
    provincias: "data/mapsData/provincias.json",
    rutas: "data/mapsData/rutas.json",
    casos: "data/casos.json",
  }),
});

const router = createHashRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: Navlinks.home, element: <Landing />, loader },
      { path: Navlinks.conecta, element: <Conecta /> },
      { path: Navlinks.notas, element: <Notas /> },
    ],
  },
]);

const root = document.getElementById("root");

if (root)
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>,
  );
