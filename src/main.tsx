import React, { lazy } from "react";
import ReactDOM from "react-dom/client";

import { createHashRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import Main2 from "./components/Main2";
import Conecta from "./components/Conecta";
import Notas from "./components/Notas";
import Reporta from "./components/Reporta";

import Root from "./routes/Root.jsx";
import { fetchUrlsData } from "./helpers/fetchUrlsData";

const App = lazy(() => import("./App.jsx"));

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
      { path: "/", element: <App />, loader },
      { path: "/conecta", element: <Conecta /> },
      { path: "/reporta", element: <Reporta /> },
      { path: "/notas", element: <Notas /> },
      { path: "/main2", element: <Main2 /> },
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
