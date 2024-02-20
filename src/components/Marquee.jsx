import styles from "./Marquee.module.css";
import Navlinks from "../routes/index.js";

export default function Marquee() {
  return (
    <div className={styles.marqueeContainer}>
      <marquee direction="">
        El Registro de Ataques de Derechas Argentinas Radicalizadas es una
        herramienta colaborativa de producción de conocimiento y creación de
        redes de autocuidado.{" "}
        <span className={styles.highlightText}>
          Si sabés de algún hecho, reportalo{" "}
          <a
            className={styles.linkMarquee}
            href={Navlinks.reporta}
            target="_blank"
            rel="noopener noreferrer"
          >
            aqui
          </a>
        </span>
      </marquee>
    </div>
  );
}
