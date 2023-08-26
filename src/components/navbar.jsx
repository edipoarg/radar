import React from "react";
import "./navbar.css";

export default function Navbar() {
  return (
    <div className="heading">
      <div id="logo">
        <img id="logoImg" src="logo.png" alt="" />
      </div>

      <div id="menu">
        <div id="menuPCBox">
          <ul id="menuPC">
            <li>
              <a href="">denuncia</a>
            </li>
            <li>
              <a href="">notas</a>
            </li>
            <li>
              <a href="">nosotrxs</a>
            </li>
          </ul>
        </div>

        <div id="botonMenu">
          <img id="menuImg" src="menu.png" alt="" />
        </div>
      </div>
    </div>
  );
}
