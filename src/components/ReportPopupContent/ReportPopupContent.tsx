import { NavLink } from "react-router-dom";
import styles from "./ReportPopupContent.module.css";
import { BiSolidBug } from "react-icons/bi";
import { TiWarningOutline } from "react-icons/ti";

const attackReportUrl = import.meta.env.VITE_ATTACK_REPORT_URL;
const doxxingReportUrl = import.meta.env.VITE_DOXXING_REPORT_URL;

export const ReportPopupContent = () => {
  return (
    <article className={styles.popupBody}>
      <h1>Reportá</h1>
      <div className={styles.buttonContainer}>
        <NavLink
          className={styles.button}
          to={attackReportUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Ataque
          <TiWarningOutline />
        </NavLink>
        <NavLink
          className={styles.button}
          to={doxxingReportUrl}
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
