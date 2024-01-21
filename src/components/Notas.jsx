import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./Notas.module.css";
import "./NotasGlobalStyles.css";
import { Carousel } from "react-bootstrap";

export default function Notas() {
  return (
    <div className={styles.notas}>
      <Carousel className={styles.notasContainer}>
        <Carousel.Item>
          <div className={styles.notasItemContainer}>
            <h2 className={styles.tituloNota}>
              Los dinosaurios no van a desaparecer
            </h2>
            <h4 className={styles.bajadaNota}>
              Por el Equipo de Investigación Política (EdIPo)
            </h4>
            <h4 className={styles.autorNota}></h4>
            <button className={styles.botonNotas}>
              <a
                href="https://informes.revistacrisis.com.ar/los-dinosaurios-no-van-a-desaparecer/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ir
              </a>
            </button>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className={styles.notasItemContainer}>
            <h2 className={styles.tituloNota}>
              Informe a un año del atentado a CFK
            </h2>
            <h4 className={styles.bajadaNota}>
              Por el Equipo de Investigación Política (EdIPo)
            </h4>
            <h4 className={styles.autorNota}></h4>
            <button className={styles.botonNotas}>
              <a
                href="http://informes.revistacrisis.com.ar/la-violencia-avanza-1s/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ir
              </a>
            </button>
          </div>
        </Carousel.Item>

        <Carousel.Item>
          <div className={styles.notasItemContainer}>
            <h2 className={styles.tituloNota}>Otras Investigaciones</h2>

            <button className={styles.botonNotas}>
              <a
                href="http://revistacrisis.com.ar/autores/equipo-de-investigacion-politica-edipo"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ir
              </a>
            </button>
          </div>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}
