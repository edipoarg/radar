import React, { lazy } from "react";
import ReactDOM from "react-dom/client";
import { loader as getURLs } from "./components/Loader.jsx";

import { createHashRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import Main2 from "./components/Main2.jsx";
import Conecta from "./components/Conecta.jsx";
import Notas from "./components/Notas.jsx";
import Reporta from "./components/Reporta.jsx";

import Root from "./routes/Root.jsx";

const App = lazy(() => import("./App.jsx"));

const loader = async () => ({
  urls: await getURLs({
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
