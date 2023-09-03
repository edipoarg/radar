import * as React from "react";
import {Link} from "react-router-dom"; 
import './navbar.css';
import { motion } from "framer-motion"
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function NavbarBootstrap() {
  return (
    <div className="heading">
      <div id="menuPCBox">

        <Navbar bg="blue" data-bs-theme="blue">
          <Container>
            <Navbar.Brand href="#home">
              <Nav.Link href= "/">
                <div id="logo">
                  <img id="logoImg" src="logo.png" alt="" />
                </div>
              </Nav.Link>
            </Navbar.Brand>
            <Nav className="me-auto">
              <div id="menuPC">
<<<<<<< HEAD
              <Nav.Link to="./notas" as={Link} className="d-none d-lg-block">INVESTIGACIONES</Nav.Link>
              <Nav.Link to="./conecta" as={Link} className="d-none d-lg-block">NOSOTRXS</Nav.Link>
=======
                <Nav.Link href="/radarV3/notas" className="d-none d-lg-block">INVESTIGACIONES</Nav.Link>
                <Nav.Link href="/radarV3/conecta" className="d-none d-lg-block">NOSOTRXS</Nav.Link>
                <Nav.Link href="https://docs.google.com/forms/d/e/1FAIpQLSe5pKXuvkvSUiwI_YEq5OZrfXCmpcsDuz_6co_iS2Qags80_A/viewform" target="_blank" rel="noopener noreferrer">
                  <motion.div whileHover={{
                    scale: [1, 2, 2, 1, 1],
                    rotate: [0, 0, 270, 270, 0],
                    borderRadius: ["20%", "20%", "50%", "50%", "20%"],
                  }}>REPORTÁ</motion.div>
                </Nav.Link>
>>>>>>> 6692087 (motion-incorporated-to-img-button)
              </div>

            </Nav>
          </Container>
        </Navbar>
      </div>

      <div id="botonMenu">

        <ScrollLink to="main2-content"><img id="menuImg" src="menu.png" alt="" /></ScrollLink>

      </div>
    </div>


  );
}
