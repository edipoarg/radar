import styles from "./Footer.module.css";
import { EdipoRoute } from "./Routes.jsx";

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div></div>
      <div className={styles.desarrollo}>
        <h6 className={styles.desarrolladoX}>
          {" "}
          Desarrollado x{" "}
          <a className={styles.edipo} href={EdipoRoute}>
            {" "}
            [ EdIPo ]{" "}
          </a>
        </h6>
      </div>
    </div>
  );
}
