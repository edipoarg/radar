import * as React from "react";
import { Link } from "react-router-dom";
import './navbar.css';
import { motion } from "framer-motion"
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function NavbarBootstrap() {
  return (
    <div className="heading">
     
     <div>

<Navbar.Brand href="#home">
      <Nav.Link href="/">
        <div id="logo">
          <img id="logoImg" src="logoRadar.png" alt="" />
        </div>
      </Nav.Link>
    </Navbar.Brand>
</div>  
     
     
     
      <div id="menuPCBox">

   

        <Navbar  bg="blue" data-bs-theme="blue">
          <Container>
            
            <Nav className="me-auto">
              <div id="menuPC">

                <Nav.Link to="./notas" as={Link} className="d-none d-lg-block"> <h6 className='BotonesNavPc'>INVESTIGACIONES</h6> </Nav.Link>
                <Nav.Link to="./conecta" as={Link} className="d-none d-lg-block"><h6 className='BotonesNavPc'>NOSOTRXS</h6></Nav.Link>
              </div>
              <Nav.Link id='reportaBotonContainerNav' href="https://docs.google.com/forms/d/e/1FAIpQLSe5pKXuvkvSUiwI_YEq5OZrfXCmpcsDuz_6co_iS2Qags80_A/viewform" target="_blank" rel="noopener noreferrer">
                <motion.div whileHover={{
                  scale: [0.8],
                }}> <h6 id='reportaBotonNav' >REPORTÁ</h6> </motion.div>
              </Nav.Link>
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
