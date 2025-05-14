import { NavLink } from "react-router-dom";
import Navlinks from "../../routes";
import styles from "./ReportPopupContent.module.css";
import { BiSolidBug } from "react-icons/bi";
import { TiWarningOutline } from "react-icons/ti";

export const ReportPopupContent = () => {
  return (
    <article className={styles.popupBody}>
      <p>Denunciá un ataque</p>
      <div>
        <NavLink
          className={styles.button}
          to={Navlinks.reportaForm}
          target="_blank"
          rel="noopener noreferrer"
        >
          Reportá
          <TiWarningOutline />
        </NavLink>
        <NavLink
          className={styles.button}
          to="link a doxxeos"
          target="_blank"
          rel="noopener noreferrer"
        >
          Reportá un doxxeo
          <BiSolidBug />
        </NavLink>
      </div>
    </article>
  );
};
