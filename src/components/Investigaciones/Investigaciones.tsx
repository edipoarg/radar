import styles from "./Investigaciones.module.css";
import investigaciones from "../../investigaciones.json";
import { FaSearch } from "react-icons/fa";
import { Button } from "../Button/Button";

export default function Investigaciones() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <FaSearch className={styles.icon} />
        <h2 className={styles.title}>Investigaciones</h2>
      </div>

      <div className={styles.content}>
        {investigaciones.map(({ title, author, link }, index) => (
      <article key={index} className={styles.card}>
      <div className={styles.cardLight}></div>
      <div className={styles.cardContent}> {/* Contenedor nuevo */}
        <h3 className={styles.cardTitle}>{title}</h3>
        {author && <p className={styles.author}>Por {author}</p>}
      </div>
    </article>
        ))}
      </div>

      <div className={styles.deco}></div>
    </section>
  );
}
