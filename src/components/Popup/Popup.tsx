import type { Case } from "../../../common/json-shape";
import styles from "./Popup.module.css";

interface Props {
  popupCase: Case;
}

const isLink = (caseSource: string) => {
  return caseSource !== "Fuente directa verificada";
};

const Popup = ({ popupCase }: Props) => (
  <div className={styles.popup}>
    <h3
      className={`${styles.displayTitulo} ${styles["multiline-text-with-ellipsis"]}`}
    >
      {popupCase.title}
    </h3>
    <div className={styles.masDatosPopup}>
      {" "}
      <p className={styles.displayFecha}>
        Fecha:{" "}
        {new Date(popupCase.date).toLocaleDateString("es-AR", {
          timeZone: "UTC",
        })}
      </p>
      {isLink(popupCase.source) ? (
        <a
          className={styles.displayLink}
          href={popupCase.source}
          target="_blank"
          rel="noreferrer"
        >
          enlace
        </a>
      ) : (
        <p>[Fuente directa verificada]</p>
      )}
    </div>
  </div>
);

export default Popup;
