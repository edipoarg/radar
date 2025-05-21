import styles from "./Presentacion.module.css";
import { presentacion } from "./presentacion";
import { GiRadarSweep } from "react-icons/gi";

export default function Presentacion() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <GiRadarSweep className={styles.headerIcon} />
        <h2 className={styles.title}>{presentacion.title}</h2>
      </div>

      <div className={styles.content}>
        {Object.entries(presentacion.terms).map(([termName, term]) => {
          return (
            <section key={termName} className={styles.term}>
              <h3>{termName}</h3>
              <ul>
                {term.definitions.map((definition, index) => (
                  <li key={index} className={styles.description}>
                    {definition.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </li>
                ))}
              </ul>
              <ul className={styles.list}>
                {term.members.map((member) => (
                  <li key={member} className={styles.member}>
                    {member}
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
      <div className={styles.deco}></div>
    </section>
  );
}
