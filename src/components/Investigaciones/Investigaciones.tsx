import styles from "./Investigaciones.module.css";
import { Button } from "../Button/Button";
import investigaciones from "../../investigaciones.json";
import Footer from "../Footer/Footer";

export default function Investigaciones() {
  return (
    <>
      <section className={styles.investigaciones}>
        {investigaciones.map(({ title, author, link }, i) => (
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
