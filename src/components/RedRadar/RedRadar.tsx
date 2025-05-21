import styles from "./RedRadar.module.css";
import { useEffect } from "react";
import Navlinks from "../../routes/index";

export default function RedRadar() {
  useEffect(() => {
    window.scrollTo(0, 0); // Desplázate automáticamente hacia arriba cuando se carga la página
  }, []);

  return (
    <article>
      <section className={styles.conecta}>
        <div>
          <svg
            className={styles.radarDecoImg}
            width="200"
            height="200"
            viewBox="0 0 200 200"
          >
            {/* Círculo 1 (más grueso, externo) */}
            <circle
              className={`${styles.circle}`}
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke="#fff"
              strokeWidth="18"
              strokeDasharray="0, 5"
            />
            {/* Círculo 2 */}
            <circle
              className={`${styles.circle}`}
              cx="100"
              cy="100"
              r="70"
              fill="none"
              stroke="#fff"
              strokeWidth="10"
              strokeDasharray="0, 440"
            />
            {/* Círculo 3 */}
            <circle
              className={`${styles.circle}`}
              cx="100"
              cy="100"
              r="50"
              fill="none"
              stroke="#fff"
              strokeWidth="7"
              strokeDasharray="10, 315"
            />
            {/* Círculo 4 (más fino, interno) */}
            <circle
              className={`${styles.circle}`}
              cx="100"
              cy="100"
              r="30"
              fill="none"
              stroke="#fff"
              strokeWidth="15"
              strokeDasharray="150, 110"
            />
          </svg>
        </div>
        <section className={styles.content}>
          <h1 className={styles.conectaTitulo}>RA-DAR</h1>
          <h1 className={styles.conectaSubtitulo}>
            Registro de Ataques de Derechas Argentinas Radicalizadas
          </h1>
          <div>
            <h6 className={styles.conectaTextRadar}>
              <span className={styles.negritaTitulo}>
                RADAR (Registro de Ataques de Derechas Argentinas Radicalizadas)
              </span>
              es un proyecto periodístico colaborativo impulsado por el Equipo
              de Investigación Política (EdIPo) de la Revista Crisis con apoyo
              del Centro de Estudios Legales y Sociales (CELS) con el objetivo
              de fortalecer la democracia y la defensa de los derechos humanos.
              Presentamos un mapeo colaborativo de ataques protagonizados por
              derechas radicalizadas con el fin de contribuir al diagnóstico
              colectivo y la elaboración de estrategias de autocuidado.
            </h6>
            <h6 className={styles.siTeInteresa}>
              <a href={Navlinks.mailRadar}>radar.edipo@gmail.com</a>
            </h6>
          </div>
        </section>
      </section>
    </article>
  );
}
