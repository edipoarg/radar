import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import { motion } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Navlinks from "../routes/index.js";

export default function NavbarBootstrap() {
  return (
    <div className={styles.heading}>
      <div>
        <Navbar.Brand>
          <Nav.Link href={Navlinks.home}>
            <div className={styles.logo}>
              <img className={styles.logoImg} src="logoRadar.png" alt="" />
            </div>
          </Nav.Link>
        </Navbar.Brand>
      </div>

      <div className={styles.menuPCBox}>
        <Navbar bg="blue" data-bs-theme="blue">
          <Container>
            <Nav className="me-auto">
              <div className={styles.menuPC}>
                <Nav.Link
                  to={Navlinks.notas}
                  as={Link}
                  className="d-none d-lg-block"
                >
                  {" "}
                  <h6>INVESTIGACIONES</h6>{" "}
                </Nav.Link>
                <Nav.Link
                  to={Navlinks.conecta}
                  as={Link}
                  className="d-none d-lg-block"
                >
                  <h6>NOSOTRXS</h6>
                </Nav.Link>
              </div>
              <Nav.Link
                href={Navlinks.reportaForm}
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.div
                  whileHover={{
                    scale: [0.8],
                  }}
                >
                  {" "}
                  <h6 className={styles.reportaBotonNav}>REPORTÁ</h6>{" "}
                </motion.div>
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </div>

      <div className={styles.botonMenu}>
        <ScrollLink to={Navlinks.main2Anchor}>
          <img className={styles.menuImg} src="menu.png" alt="" />
        </ScrollLink>
      </div>
    </div>
  );
}
