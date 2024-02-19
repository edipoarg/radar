import styles from "./Conecta.module.css";
import { useEffect } from "react";
import { MailRadarRoute } from "./Routes.jsx";

export const Details = () => (
  <>
    <span className={styles.negritaTitulo}>
      RADAR (Registro de Ataques de Derechas Argentinas Radicalizadas)
    </span>
    es un proyecto periodístico colaborativo impulsado por el Equipo de
    Investigación Política (EdIPo) de la Revista Crisis con apoyo del Centro de
    Estudios Legales y Sociales (CELS) con el objetivo de fortalecer la
    democracia y la defensa de los derechos humanos. Presentamos un mapeo
    colaborativo de ataques protagonizados por derechas radicalizadas con el fin
    de contribuir al diagnóstico colectivo y la elaboración de estrategias de
    autocuidado.
  </>
);

export default function ReportaForm() {
  useEffect(() => {
    window.scrollTo(0, 0); // Desplázate automáticamente hacia arriba cuando se carga la página
  }, []);

  return (
    <>
      {/* TODO move this ID to its own constant, as it's used in Main2 and main and navbar  */}
      <div id="conecta" className={styles.conecta}>
        <div>
          <img className={styles.radarDecoImg} src="imgRadar.png" alt="" />
        </div>
        <div className={styles.contectaTituloContainer}>
          <div>
            <img className={styles.logoImgNos} src="logoRadar.png" alt="" />
          </div>

          <h1 className={styles.conectaTitulo}>
            Registro de Ataques de Derechas Argentinas Radicalizadas
          </h1>
        </div>
        <div>
          <h6 className={styles.conectaTextRadar}>
            <Details />
          </h6>
        </div>
      </div>

      <div className={styles.conecta2}>
        <h6 className={styles.textConecta2}>
          Dentro del amplio espectro que componen las derechas llamamos
          radicalizadas a los sectores que apelan directa o indirectamente a la
          violencia como método de intervención política. Entendemos por ataques
          de derecha radicalizada aquellas acciones que expresan un deseo de
          aniquilación del otro con el objeto de silenciar, amedrentar,
          disciplinar o eliminar identidades políticas como forma de influir en
          la discusión pública e inhibir su participación.
          <br />
          <br />
        </h6>

        <h6 className={styles.siTeInteresa}>
          si querés comunicarte con nosotrxs podés escribirnos a
          <br />
          <br />
          <a href={MailRadarRoute}>radar.edipo@gmail.com</a>
        </h6>
      </div>
    </>
  );
}
