import styles from "./Marquee.module.css";
import Navlinks from "../../routes/index.js";

export default function Marquee() {
  return (
    <div className={styles.marqueeContainer}>
      {/* @ts-expect-error marquees are deprecated and not part of the JSXIntrinsicElements types. */}
      <marquee direction="">
        El Registro de Ataques de Derechas Argentinas Radicalizadas es una
        herramienta colaborativa de producción de conocimiento y creación de
        redes de autocuidado.{" "}
        <span className={styles.highlightText}>
          Si sabés de algún hecho, reportalo{" "}
          <a
            className={styles.linkMarquee}
            href={Navlinks.reportaForm}
            target="_blank"
            rel="noopener noreferrer"
          >
            aqui
          </a>
        </span>
        {/* @ts-expect-error marquees are deprecated and not part of the JSXIntrinsicElements types. */}
      </marquee>
    </div>
  );
}
