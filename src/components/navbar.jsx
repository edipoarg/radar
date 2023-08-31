import * as React from "react";
import './navbar.css';
import {
  Link,
  Outlet,

} from "react-router-dom";

export default function Navbar() {
  return (
    <div className="heading">

      {/* Enlace a la ruta MAIN2 */}
      <Link to="radarV3">
       <div id="logo">
        <img id="logoImg" src="logo.png" alt="" />
      </div>

      </Link>

      <div id="menu">

        <div id="menuPCBox">
          <ul id="menuPC">
          <Link to="/radarV3/notas">INVESTIGACIONES</Link>
          <Link to="/radarV3/conecta">NOSOTRXS</Link>
         <Link to="/radarV3/reporta"> <h2 id='botonReporta'>Reporta</h2>  </Link>

          </ul>
        </div>


        <div id="botonMenu" >

          <img id="menuImg" src="menu.png" alt="" />

        </div>


      </div>




    </div>

  );
}
