import type { Attack } from "../../../common/json-shape";
import styles from "./Popup.module.css";

interface Props {
  attack: Attack;
}

const isLink = (attackSource: string) => {
  return attackSource !== "Fuente directa verificada";
};

const Popup = ({ attack }: Props) => (
  <article className={styles.popup}>
    <h3 className={`${styles.displayTitulo}`}>{attack.title}</h3>
    <div className={styles.masDatosPopup}>
      <p className={styles.displayFecha}>
        Fecha:{" "}
        {new Date(attack.date).toLocaleDateString("es-AR", {
          timeZone: "UTC",
        })}
      </p>
      {isLink(attack.source) ? (
        <a
          className={styles.displayLink}
          href={attack.source}
          target="_blank"
          rel="noreferrer"
        >
          enlace
        </a>
      ) : (
        <p>[Fuente directa verificada]</p>
      )}
    </div>
  </article>
);

export default Popup;
