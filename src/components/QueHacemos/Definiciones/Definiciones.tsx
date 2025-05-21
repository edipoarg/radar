import styles from "./Definiciones.module.css";
import { definiciones } from "./definiciones";
import { TbMessageQuestion } from "react-icons/tb";

export default function Definiciones() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <TbMessageQuestion className={styles.headerIcon} />
        <h2 className={styles.title}>{definiciones.title}</h2>
      </div>
      <h4 className={styles.subTitle}>
        En este punto explicamos lo que entendemos por algunos términos
        repetitivos que usamos cuando investigamos. Son definiciones propias
        desarrolladas en base a nuestra experiencia militante. No tienen que ser
        académicas ni consensuadas, es más que todo para que el público conozca
        nuestro vocabulario de intervención.
      </h4>
      <div className={styles.content}>
        <ul>
          {Object.entries(definiciones.terms).map(([termName, term]) => (
            <li key={termName} className={styles.term}>
              <h3>{termName}:</h3>
              {term.definitions.map((definition) =>
                definition.paragraphs.map((paragraph) => (
                  <h5 key={paragraph} className={styles.description}>
                    {paragraph}
                  </h5>
                )),
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.deco}></div>
    </section>
  );
}
