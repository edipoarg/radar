import styles from "./Notas.module.css";
import { Button } from "../Button/Button";
import notas from "../../notas.json";
import Footer from "../Footer/Footer";

export default function Notas() {
  return (
    <>
      <section className={styles.notas}>
        {notas.map(({ title, author, link }, i) => (
          <article key={i} className={styles.nota}>
            <h1>{title}</h1>
            {author && <h4>Por {author}</h4>}
            <Button to={link}>ver</Button>
          </article>
        ))}
      </section>
      <Footer />
    </>
  );
}
