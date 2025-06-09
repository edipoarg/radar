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
        {Object.entries(novedades.terms).map(([termName]) => {
          return (
            <section key={termName} className={styles.term}>
              <h3>{termName}</h3>

              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSemLdPC4Fnm1NY8ScNG8noC_pvTIV1bvaVq4sw9dTrjHPT84Q/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.newsletterLink}
              >
                <section className={styles.solidButton}>
                  <LuMailPlus className={styles.mailIcon} />
                  <span className={styles.ingresarText}>Sumate</span>
                </section>
              </a>
            </section>
          );
        })}
      </div>

      <div className={styles.deco}></div>
    </section>
  );
}
