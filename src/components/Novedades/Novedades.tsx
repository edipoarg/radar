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
          return (
            <section key={termName} className={styles.term}>
              <h3>{termName}</h3>
              <section className={styles.solidContainer}>
                <LuMailPlus className={styles.mailIcon}/>
                <ul className={styles.blueContainer}>
                  {term.definitions.map((novedad, index) => (
                    <li key={index} className={styles.description}>
                      {novedad.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </li>
                  ))}
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
