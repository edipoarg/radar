import styles from "./Footer.module.css";
import Navlinks from "../../routes/index";

const currentVersion = import.meta.env.VITE_RADAR_VERSION;

export default function Footer() {
  return (
    <div className={styles.footer}>
      {currentVersion && (
        <span className={styles.version}>Ra-dar {currentVersion} / </span>
      )}
      <h6 className={styles.desarrolladoX}>
        Desarrollado x{" "}
        <a className={styles.edipo} href={Navlinks.edipo}>
          {" "}
          [ EdIPo ]{" "}
        </a>
      </h6>
    </div>
  );
}
