// QuienesSomos.tsx
import { Link } from "react-router-dom";
import styles from "./QuienesSomos.module.css";
import { GiRadarSweep } from "react-icons/gi";
import { TbMessageQuestion, TbMapPinQuestion } from "react-icons/tb";
import { LuDatabaseBackup } from "react-icons/lu";
import { TiInfoLarge } from "react-icons/ti";
import { IoArrowForwardCircleOutline } from "react-icons/io5";

export default function QuienesSomos() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <TiInfoLarge className={styles.headerIcon} />
        <h2 className={styles.title}>¿Quiénes somos?</h2>
      </div>

      <h4 className={styles.subTitle}>
        Conocé el contexto, las definiciones clave, el patrón de casos y la
        metodología detrás de Radar.
      </h4>

      <div className={styles.content}>
        <CardLink
          to="/presentacion"
          title="Presentación"
          icon={<GiRadarSweep />}
        >
          Antecedentes, problemática identificada y qué es Radar.
        </CardLink>

        <CardLink
          to="/definiciones"
          title="Definiciones"
          icon={<TbMessageQuestion />}
        >
          Explorando algunas nociones compartidas.
        </CardLink>

        <CardLink
          to="/patron-de-casos"
          title="Patrón de casos"
          icon={<TbMapPinQuestion />}
        >
          Por tipo de ataques y por componente de violencia.
        </CardLink>

        <CardLink
          to="/metodologia"
          title="Metodología"
          icon={<LuDatabaseBackup />}
        >
          Construcción de la base de datos y análisis de información.
        </CardLink>
      </div>
      <div className={styles.deco}></div>
    </section>
  );
}

type CardLinkProps = {
  to: string;
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
};

function CardLink({ to, title, icon, children }: CardLinkProps) {
  return (
    <Link to={to} className={styles.card}>
      <h2 className={styles.cardTitle}>
        <span className={styles.icon}>{icon}</span> {title}
      </h2>
      <div className={styles.cardBody}>
        <p className={styles.cardText}>{children}</p>
        <IoArrowForwardCircleOutline className={styles.arrow} />
      </div>
    </Link>
  );
}
