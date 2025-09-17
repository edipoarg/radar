import newsletter1 from "./Newsletter-1.md?raw";
import newsletter2 from "./Newsletter-2.md?raw";
import newsletter3 from "./Newsletter-3.md?raw";
import newsletter4 from "./Newsletter-4.md?raw";
import newsletter5 from "./Newsletter-5.md?raw";
import newsletter6 from "./Newsletter-6.md?raw";
import alerta1 from "./alerta-radar-1.md?raw";
import ReactMarkdown from "react-markdown";
import styles from "./Publicaciones.module.css";

type Publicacion = {
  id: string;
  titulo: string;
  fecha: string; // MM/YYYY, tal cual se le va a mostrar a lx user
  texto: string; // En Markdown
};

type Publicaciones = Publicacion[];

const publicaciones: Publicaciones = [
  {
    fecha: "09/2025",
    id: "Newsletter RADAR Nro. 3 - Septiembre 2025",
    texto: newsletter6,
    titulo: "Newsletter RADAR Nro. 3 - Septiembre 2025",
  },
  {
    fecha: "08/2025",
    id: "alerta radar N1 (4 de agosto de 2025)",
    texto: alerta1,
    titulo: "¡Alerta RADAR! | Boletín N° 1/2025",
  },
  {
    fecha: "08/2025",
    id: "Newsletter RADAR Nro. 2 - Agosto 2025",
    texto: newsletter5,
    titulo: "Newsletter RADAR Nro. 2 - Agosto 2025",
  },
  {
    fecha: "07/2025",
    id: "Newsletter RADAR Nro. 1 - Julio 2025",
    texto: newsletter4,
    titulo: "Newsletter RADAR Nro. 1 - Julio 2025",
  },
  {
    fecha: "03/2024",
    id: "Newsletter RADAR Nro. 3 - Marzo 2024",
    texto: newsletter3,
    titulo: "Newsletter RADAR Nro. 3 - Marzo 2024",
  },
  {
    fecha: "12/2023",
    id: "Newsletter RADAR Nro. 2 - Diciembre 2023",
    texto: newsletter2,
    titulo: "Newsletter RADAR Nro. 2 - Diciembre 2023",
  },
  {
    fecha: "11/2023",
    id: "Newsletter RADAR Nro. 1 - Noviembre 2023",
    texto: newsletter1,
    titulo: "Newsletter RADAR Nro. 1 - Noviembre 2023",
  },
];

export default function Publicaciones() {
  return (
    <section className={styles.Publicaciones}>
      <nav className={styles.desktopOnly}>
        <h1>Nuestras novedades</h1>
        <ul>
          {publicaciones.map((publicacion) => (
            <li key={publicacion.id}>
              <button
                className={styles.navButton}
                type="button"
                onClick={() => {
                  // I hate doing this but HashRouter does not let me use a simple anchor by ID
                  document.getElementById(publicacion.id)?.scrollIntoView();
                }}
                title={publicacion.titulo}
              >
                <div className={styles.navButtonLight}></div>
                <div className={styles.navButtonContent}>
                  <h4>{publicacion.titulo}</h4>
                  <p>{publicacion.fecha}</p>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <article className={styles.desktopOnly}>
        <section className={styles.listaDePublicaciones}>
          {publicaciones.map((publicacion) => (
            <article
              className={styles.publicacion}
              id={publicacion.id}
              key={publicacion.id}
            >
              <h3>{publicacion.titulo}</h3>
              <div className={styles.cuerpoDePublicacion}>
                <ReactMarkdown>{publicacion.texto}</ReactMarkdown>
              </div>
            </article>
          ))}
        </section>
      </article>

      <article
        className={`${styles.mobileOnly} ${styles.listaDePublicaciones}`}
      >
        {publicaciones.map((publicacion) => (
          <details
            className={styles.publicacionDesplegable}
            key={publicacion.id}
          >
            <summary>
              <div className={styles.publicacionDesplegableLight}></div>
              {publicacion.titulo}
            </summary>
            <article className={styles.publicacion} id={publicacion.id}>
              <div className={styles.publicacionDesplegableLight}></div>
              <div className={styles.cuerpoDePublicacion}>
                <ReactMarkdown>{publicacion.texto}</ReactMarkdown>
              </div>
            </article>
          </details>
        ))}
      </article>
    </section>
  );
}
