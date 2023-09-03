import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Loader from './components/Loader.jsx';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavbarBootstrap from "./components/navbar.jsx";
import "./index.css";
import Marquee from './components/marquee.jsx';
import Main2 from "./components/Main2.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Loader
      urls={{
        departamentos: "data/mapsData/departamentos-argentina.json",
        departamentosBsAs: "data/mapsData/departamentos-buenos_aires.json",
        provincias: "data/mapsData/provincias.json",
      }}

    />
    <Router>
      <NavbarBootstrap /> {/* Navbar siempre se muestra */}
      <Marquee></Marquee>
      <App></App>
      <Routes
        render={({ location }) => (
          <TransitionGroup>
            <CSSTransition
              key={location.key}
              timeout={300}
              classNames="fade"
            >
              <Route path="" element={App} exact /> {/* Página mapa */}
              <Route path="/radarV3/conecta" element={App} /> {/* Página Conecta */}
              <Route path="/radarV3/reporta" element={App} /> {/* Página Reporta */}
              <Route path="/radarV3/notas" element={App} /> {/* Página Reporta */}
              <Route path="/radarV3/listado" element={App} /> {/* Página Reporta */}
              <Route path="/radarV3/main2" element={App} />


            </CSSTransition>
          </TransitionGroup>
        )}
      />
    </Router>

  </React.StrictMode >
);
