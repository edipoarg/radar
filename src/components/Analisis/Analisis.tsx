import Navlinks from "../../routes";
import styles from "./Analisis.module.css";
import { Link as ScrollLink } from "react-scroll";

type PropWithByName = {
  // TODO: These strings are constant and could be narrowed down to a union
  byName: Record<string, number[]>;
};

interface Props {
  min: Date;
  max: Date;
  total: number;
  componentes: PropWithByName;
}

export default function Analisis({ min, max, total, componentes }: Props) {
  return (
    <div id={Navlinks.analisis} className={styles.analisis}>
      <div className={styles.fondoAnalisisImg}>
        {" "}
        <img src="radarPuntos.png" alt="" />
      </div>
      <div className={styles.analisisHeader}>
        <div className={styles.analisisTituloSec}>
          <h4 className={styles.tituloAnalisisRadar}>
            REGISTRO DE ATAQUES <br /> DE DERECHAS ARGENTINAS RADICALIZADAS
          </h4>
          <h1 className={styles.tituloAnalisis}>
            RELEVAMIENTO
            {min.getFullYear()} - {max.getFullYear()}
          </h1>
          <h4 className={styles.analisisCasos}> {total} CASOS</h4>
          <h4 className={styles.analisisCasosBajada}>
            organizados por sus narrativas de odio
          </h4>
        </div>
      </div>

      <div className={styles.analisisDatos}>
        {Object.keys(componentes.byName).map((t, i) => (
          <div className={styles.datos2} key={i}>
            <h1 className={styles.datoN2}>{componentes.byName[t]?.length}</h1>
            <div>
              <p className={styles.textAnalisis}>{t}</p>
            </div>
          </div>
        ))}
      </div>

      <h3 className={styles.enConstruccion}>
        RADAR es una herramienta dinámica en construcción.
      </h3>
      <h4 className={styles.analisisTextoFinal}>
        En esta primera etapa se visualizan hechos geolocalizables del período
        2020-2024 pero se encuentra abierta a recibir reportes fuera de ese
        marco espacio-temporal.
      </h4>

      <h6 className={styles.aclaracionAnalisis}>
        *Las narrativas no son excluyentes. Algunos casos abarcan más de una.
      </h6>
      <ScrollLink
        to={Navlinks.homeAnchor}
        spy={true} // Activa el modo espía
        smooth={true} // Activa el desplazamiento suave
        duration={500} // Duración de la animación (en milisegundos)
        offset={-70} // Ajusta un offset opcional (si tienes un encabezado fijo)
      >
        <button className={styles.subir}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-caret-up-fill"
            viewBox="0 0 16 16"
          >
            <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
          </svg>
        </button>
      </ScrollLink>
    </div>
  );
}
