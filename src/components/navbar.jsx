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
      <Link to="/mapa">
        <div id="logo">
          <img id="logoImg" src="../src/assets/logo.png" alt="" />
        </div>
      </Link>

      <div id="menu">

        <div id="menuPCBox">
          <ul id="menuPC">
          <Link to="/notas">Notas</Link>
          <Link to="/conecta">Conecta</Link>
            <Link to="/reporta">Reporta</Link>

          </ul>
        </div>


        <div id="botonMenu" >

          <img id="menuImg" src="../src/assets/menu.png" alt="" />

        </div>


      </div>




    </div>

  );
}