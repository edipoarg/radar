import styles from "./Popup.module.css";
import PropTypes from "prop-types";

const Popup = ({ title, date, source }) => (
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

Popup.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  source: PropTypes.string.isRequired,
};

export default Popup;
