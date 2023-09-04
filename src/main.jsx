import React, {lazy} from "react";
import ReactDOM from "react-dom/client";
import {loader as getURLs} from './components/Loader.jsx';

import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";

import Main2 from "./components/Main2.jsx";
import Conecta from "./components/conecta.jsx";
import Notas from "./components/notas.jsx";
import Reporta from "./components/reporta.jsx";


import Root from "./routes/Root.jsx";

const loader = async () => ({
  urls: await getURLs({
    departamentos: "data/mapsData/departamentos-argentina.json",
    departamentosBsAs: "data/mapsData/departamentos-buenos_aires.json",
    provincias: "data/mapsData/provincias.json",
    rutas: "data/mapsData/rutas.json",
  }),
})

const router = createHashRouter([
  {
    path: "/",
    element: <Root/>,
    children:[
      { path:"/", element:<App/>, loader},
      { path:"/conecta", element:< Conecta/> },
      { path:"/reporta", element:< Reporta/> },
      { path:"/notas", element:< Notas/> },
      { path:"/main2", element:< Main2/> },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
