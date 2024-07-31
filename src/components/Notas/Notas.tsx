import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./Notas.module.css";
import "./NotasGlobalStyles.css";
import { Carousel } from "react-bootstrap";
import { Button } from "../Button/Button";
import notas from "../../notas.json";

export default function Notas() {
  return (
    <div className={styles.notas}>
      <Carousel className={styles.notasContainer}>
        {notas.map(({ title, author, link }, i) => (
          <Carousel.Item key={i}>
            <div className={styles.notasItemContainer}>
              <h1 className={styles.tituloNotasMain}>{title}</h1>
              {author && <h4 className={styles.autorNotaMain}>Por {author}</h4>}
              <Button to={link}>ver</Button>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}
