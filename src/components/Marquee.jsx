import styles from "./Marquee.module.css";

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
            href="https://docs.google.com/forms/d/e/1FAIpQLSe5pKXuvkvSUiwI_YEq5OZrfXCmpcsDuz_6co_iS2Qags80_A/viewform"
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
