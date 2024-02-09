import styles from "./Popup.module.css";

interface Props {
  title: string;
  date: Date;
  source: string;
}

const Popup = ({ title, date, source }: Props) => (
  <div className={styles.popup}>
    <h3 className={styles.displayTitulo}>{title}</h3>
    <div className={styles.masDatosPopup}>
      {" "}
      <p className={styles.displayFecha}>Fecha: {date.toLocaleDateString()}</p>
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
