import { NavLink } from "react-router-dom";
import Navlinks from "../../routes";
import styles from "./ReportPopupContent.module.css";
import { BiSolidBug } from "react-icons/bi";
import { TiWarningOutline } from "react-icons/ti";

export const ReportPopupContent = () => {
  return (
    <article className={styles.popupBody}>
      <p>Reportá</p>
      <div className={styles.buttonContainer}>
        <NavLink
          className={styles.button}
          to={Navlinks.reportaForm}
          target="_blank"
          rel="noopener noreferrer"
        >
          Ataque
          <TiWarningOutline />
        </NavLink>
        <NavLink
          className={styles.button}
          to="link a doxxeos"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ataque digital
          <BiSolidBug />
        </NavLink>
      </div>
    </article>
  );
};
