import styles from "./Novedades.module.css";
import { novedades } from "./novedades";
import { HiOutlineBellAlert } from "react-icons/hi2";

export default function Novedades() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <HiOutlineBellAlert className={styles.headerIcon} />
        <h2 className={styles.headerTitle}>{novedades.title}</h2>
      </div>

      <div className={styles.content}>
        {Object.entries(novedades.terms).map(([termName, term]) => {
          return (
            <section key={termName} className={styles.term}>
              <h3>{termName}</h3>
              <ul>
                {term.definitions.map((novedad, index) => (
                  <li key={index} className={styles.description}>
                    {novedad.paragraphs.map((paragraph) => (
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
              <div className={`${styles.deco} ${styles.circlesDeco}`}>
        <div></div> {/* Para el efecto de glow central */}
      </div>
            </section>
          );
        })}
      </div>
      <div className={styles.deco}></div>
    </section>
  );
}
