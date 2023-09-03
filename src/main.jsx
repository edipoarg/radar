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
import Conecta from "./components/conecta.jsx";
import Notas from "./components/notas.jsx";
import Reporta from "./components/reporta.jsx";
import Analisis from "./components/analisis.jsx";



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
      <Marquee/>
      <Routes
        render={({ location }) => (
          <TransitionGroup>
            <CSSTransition
              key={location.key}
              timeout={300}
              classNames="fade"
            >
                <Route path="./" element={App} exact /> {/* Página mapa */}
                <Route path="./conecta" element={Conecta} /> {/* Página Conecta */}
                <Route path="./reporta" element={Reporta} /> {/* Página Reporta */}
                <Route path="./notas" element={Notas} /> {/* Página Reporta */}
                <Route path="./main2" element={Main2} />

             
            </CSSTransition>
          </TransitionGroup>
        )}
      />
    </Router>

  </React.StrictMode >
);
