import styles from "./Investigaciones.module.css";
import investigaciones from "../../investigaciones.json";
import { FaSearch } from "react-icons/fa";
import { IoArrowForwardCircleOutline } from "react-icons/io5";

function formatDate(isoDate: string) {
  if (!isoDate) return "";
  const [year, month, day] = isoDate.split("-");
  return `${day}/${month}/${year}`;
}

export default function Investigaciones() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <FaSearch className={styles.icon} />
        <h2 className={styles.title}>Investigaciones</h2>
      </div>

      <div className={styles.content}>
        {investigaciones.map(
          ({ title, author, link, date, imgLink }, index) => (
            <a
              key={index}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.card}
            >
              <div className={styles.cardLight}></div>

              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{title}</h3>
                {author && <p className={styles.author}>Por {author}</p>}
                {date && <p className={styles.date}>{formatDate(date)}</p>}

                <IoArrowForwardCircleOutline className={styles.arrow} />
              </div>

              {imgLink && (
                <div className={styles.cardImageContainer}>
                  <img
                    src={imgLink}
                    alt={`Imagen de ${title}`}
                    className={styles.cardImage}
                  />
                </div>
              )}
            </a>
          ),
        )}
      </div>

      <div className={styles.deco}></div>
    </section>
  );
}
