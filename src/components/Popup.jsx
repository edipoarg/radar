import styles from "./Popup.module.css";
import PropTypes from "prop-types";

const Popup = ({ title, date, source, tipo }) => (
  <div className={styles.popup}>
    <h3 className={styles.displayTitulo}>{title}</h3>
    <p className={styles.displayTipo}>{tipo.join(" ")}</p>

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

Popup.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  source: PropTypes.string.isRequired,
  tipo: PropTypes.array.isRequired,
};

export default Popup;
