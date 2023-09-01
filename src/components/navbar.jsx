import * as React from "react";
import './navbar.css';
import {
  Link,
  Outlet,

} from "react-router-dom";
import Button from 'react-bootstrap/Button';

export default function Navbar() {
  return (
    <div className="heading">

      {/* Enlace a la ruta MAIN2 */}
      <Link to="/radarV3/">
        <div id="logo">
          <img id="logoImg" src="logo.png" alt="" />
        </div>

      </Link>

      <div id="menu">

        <div id="menuPCBox">
          <ul id="menuPC">
            <Link to="/radarV3/notas">INVESTIGACIONES</Link>
            <Link to="/radarV3/conecta">NOSOTRXS</Link>

            <Button variant="outline-primary" size="sm" >
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSe5pKXuvkvSUiwI_YEq5OZrfXCmpcsDuz_6co_iS2Qags80_A/viewform" target="_blank" rel="noopener noreferrer">
              Reporta
            </a>
            </Button>{' '}

          </ul>
        </div>
        <div id="botonMenu" >

          <img id="menuImg" src="menu.png" alt="" />

        </div>


      </div>




    </div>

  );
}
