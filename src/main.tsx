import React from "react";
import ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import AboutUs from "./components/AboutUs/AboutUs";
import Notas from "./components/Notas/Notas";
import Root from "./routes/Root";
import Navlinks from "./routes/index";
import { fetchUrlsData } from "./helpers/fetchUrlsData";
import Landing from "./components/Landing/Landing";

const loader = async () => ({
  urls: await fetchUrlsData({
    departamentosBsAs: "data/mapsData/departamentos-buenos_aires.json",
    provincias: "data/mapsData/provincias.json",
    rutas: "data/mapsData/rutas.json",
    ataques: "data/ataques.json",
  }),
});

const router = createHashRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: Navlinks.home, element: <Landing />, loader },
      { path: Navlinks.conecta, element: <AboutUs /> },
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
