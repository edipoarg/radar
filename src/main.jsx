import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Loader from './components/Loader.jsx';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";

import Main2 from "./components/Main2.jsx";
import Conecta from "./components/conecta.jsx";
import Notas from "./components/notas.jsx";
import Reporta from "./components/reporta.jsx";
import Analisis from "./components/analisis.jsx";

import Root from "./routes/Root.jsx";

const router = createHashRouter([
  {
    path: "/",
    element: <Root/>,
    children:[
      { path:"/", element:<App/>, },

      { path:"/conecta", element:< Conecta/>, },
      { path:"/reporta", element:< Reporta/>, },
      { path:"/notas", element:< Notas/>, },
      { path:"/main2", element:< Main2/>, },



    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>

<<<<<<< HEAD
<RouterProvider router={router} />
  </React.StrictMode>
=======
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
>>>>>>> 66920875c042f71d4047c2a3b04b3911cb039dd2
);
