import styles from "./Novedades.module.css";
import { LuMailPlus } from "react-icons/lu";
import Publicaciones from "./Publicaciones/Publicaciones";

const newsletterUrl = import.meta.env.VITE_NEWSLETTER_SUBSCRIPTION_URL;

export default function Novedades() {
  return (
    <section className={styles.Novedades}>
      <div className={styles.deco}></div>
      <Publicaciones />

      <section className={styles.subscribePrompt}>
        <h3>
          Suscribite al newsletter de RA-DAR para recibir novedades de nuestro
          registro e investigaciones.
        </h3>

        <a
          href={newsletterUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.newsletterLink}
        >
          <LuMailPlus className={styles.mailIcon} />
          <span className={styles.ingresarText}>Sumate</span>
        </a>
      </section>
    </section>
  );
}
