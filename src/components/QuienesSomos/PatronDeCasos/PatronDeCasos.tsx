import styles from "./PatronDeCasos.module.css";
import { patronDeCasos } from "./patronDeCasos";

export default function PatronDeCasos() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>{patronDeCasos.title}</h2>
      </div>

      <div className={styles.content}>
        {Object.entries(patronDeCasos.categories).map(
          ([categoryName, category]) => {
            return (
              <div className={styles.category} key={categoryName}>
                <h3>{categoryName}</h3>
                {Object.entries(category.terms).map(([termName, termValue]) => (
                  <div className={styles.term} key={termName}>
                    <h2>{termName}</h2>
                    {termValue.definitions.map((definition) =>
                      definition.paragraphs.map((paragraph) => (
                        <h5 key={paragraph} className={styles.description}>
                          {paragraph}
                        </h5>
                      )),
                    )}
                    <ul className={styles.list}>
                      {termValue.members.map((item) => (
                        <li key={item} className={styles.definition}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            );
          },
        )}
      </div>
    </section>
  );
}
