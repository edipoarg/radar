import styles from "./Novedades.module.css";
import { novedades } from "./novedades";
import { HiOutlineBellAlert } from "react-icons/hi2";
import { LuMailPlus } from "react-icons/lu";

export default function Novedades() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <HiOutlineBellAlert className={styles.headerIcon} />
        <h2 className={styles.title}>{novedades.title}</h2>
      </div>

      <div className={styles.content}>
        {Object.entries(novedades.terms).map(([termName, term]) => {
          // Detectar si es el newsletter
          const isNewsletter = termName.toLowerCase() === "newsletter";
          const paragraph = term.definitions[0]?.paragraphs[0];

          return (
            <section key={termName} className={styles.term}>
              {!isNewsletter && <h3>{termName}</h3>}
              <section className={styles.solidContainer}>
                <LuMailPlus className={styles.mailIcon} />
                <ul className={styles.blueContainer}>
                  <li className={styles.description}>
                    {isNewsletter ? (
                      <p>Ir</p>
                    ) : (
                      term.definitions.flatMap((def) =>
                        def.paragraphs.map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        )),
                      )
                    )}
                  </li>
                </ul>
              </section>
            </section>
          );
        })}
      </div>
      <div className={styles.deco}></div>
    </section>
  );
}
