import styles from "./Main2.module.css";
import { Link as ScrollLink } from "react-scroll";
import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import { Button } from "./Button.jsx";
import { Details } from "./Conecta.jsx";
import Navlinks from "../routes/index.js";

const buttonThemes = {
  default: {
    color: "#2b3bcd",
    background: "white",
    hover: "#535bf2",
  },
  inverted: {
    color: "white",
    background: "#2b3bcd",
    hover: "#535bf2",
  },
};

export default function Main2() {
  return (
    <div id={Navlinks.main2Anchor} className={styles.Main2}>
      <div className={styles.franja1}>
        <div className={styles.reportaMain}>
          <h4 className={styles.bajadaPrincipal}>
            <Details />
          </h4>

          <Button to={Navlinks.connecta}>NOSOTRXS</Button>
        </div>

        <ScrollLink
          to={Navlinks.homeAnchor}
          spy={true} // Activa el modo espía
          smooth={true} // Activa el desplazamiento suave
          duration={500} // Duración de la animación (en milisegundos)
          offset={-70} // Ajusta un offset opcional (si tienes un encabezado fijo)
        >
          <button className={styles.botonMain2}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="white"
              className="bi bi-caret-up-fill"
              viewBox="0 0 16 16"
            >
              <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
            </svg>
            <h5 className={styles.botonMapaText}>mapa</h5>
          </button>
        </ScrollLink>
      </div>

      <div className={styles.separadorMain}>
        <div className={styles.bloqueI}></div>
        <div className={styles.bloqueD}></div>
      </div>

      <div className={styles.franja2}>
        <Carousel className={styles.notasMain}>
          <Carousel.Item>
            <h1 className={styles.tituloNotasMain}>
              Los dinosaurios no van a desaparecer
            </h1>
            <h4 className={styles.autorNotaMain}>
              Por el Equipo de Investigación Política (EdIPo)
            </h4>
            <button className={styles.botonNotasMain}>
              <a
                href={Navlinks.notaLosDinosaurios}
                target="_blank"
                rel="noreferrer"
              >
                ver
              </a>
            </button>
          </Carousel.Item>
          <Carousel.Item>
            <h1 className={styles.tituloNotasMain}>
              Informe a un año del atentado a CFK
            </h1>
            <h4 className={styles.autorNotaMain}>
              Por el Equipo de Investigación Política (EdIPo)
            </h4>
            <button className={styles.botonNotasMain}>
              <a
                href={Navlinks.notaLaViolenciaAvanza}
                target="_blank"
                rel="noreferrer"
              >
                ver
              </a>
            </button>
          </Carousel.Item>
        </Carousel>

        <div className={styles.botoneraMain}>
          <div className={styles.contactoMain}>
            <h2 className={styles.conectaTextMain}>
              Colaborá en la construcción de una fuente de información pública
              sobre agresiones de derechas argentinas radicalizadas.
            </h2>
            <Button theme={buttonThemes.inverted} to={Navlinks.reportaForm}>
              REPORTÁ UN HECHO
            </Button>
          </div>

          <div className={styles.analisisMain}>
            <div className={styles.analisisTextComp}>
              <h3 className={styles.analisisTextMain}>Relevamiento</h3>{" "}
              <h6 className={styles.analisisAnios}> 2020 - 2023</h6>
            </div>
            <ScrollLink
              to={Navlinks.analisis}
              spy={true} // Activa el modo espía
              smooth={true} // Activa el desplazamiento suave
              duration={500} // Duración de la animación (en milisegundos)
              offset={-70} // Ajusta un offset opcional (si tienes un encabezado fijo)
            >
              <button className={styles.botonAnalisisMain}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="white"
                  className="bi bi-caret-down-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                </svg>
              </button>
            </ScrollLink>
          </div>
        </div>
      </div>
    </div>
  );
}
