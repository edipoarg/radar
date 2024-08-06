import styles from "./Popup.module.css";

interface Props {
  title: string;
  date: Date;
  source: string;
}

const Popup = ({ title, date, source }: Props) => (
  <div className={styles.popup}>
    <h3
      className={`${styles.displayTitulo} ${styles["multiline-text-with-ellipsis"]}`}
    >
      {title}
    </h3>
    <div className={styles.masDatosPopup}>
      {" "}
      <p className={styles.displayFecha}>
        Fecha: {date.toLocaleDateString("es-AR")}
      </p>
      <a
        className={styles.displayLink}
        href={source}
        target="_blank"
        rel="noreferrer"
      >
        enlace
      </a>
    </div>
  </div>
);

export default Popup;
