import styles from "./Metodologia.module.css";
import { metodologia } from "./metodologia";

export default function Metodologia() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>{metodologia.title}</h2>
      </div>

      <div className={styles.content}>
        {Object.entries(metodologia.terms).map(([termName, term]) => {
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
    </section>
  );
}
