import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div></div>
      <div className={styles.desarrollo}>
        <h6 className={styles.desarrolladoX}>
          {" "}
          Desarrollado x{" "}
          <a className={styles.edipo} href="http://investigacionpolitica.com">
            {" "}
            [ EdIPo ]{" "}
          </a>
        </h6>
      </div>
    </div>
  );
}
