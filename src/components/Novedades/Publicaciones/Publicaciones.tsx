import newsletter1 from "./Newsletter-1.md?raw";
import newsletter2 from "./Newsletter-2.md?raw";
import newsletter3 from "./Newsletter-3.md?raw";
import ReactMarkdown from "react-markdown";
import styles from "./Publicaciones.module.css";

type Publicacion = {
  id: string;
  titulo: string;
  fecha: string; // YYYYMMDD
  texto: string; // En Markdown
};

type Publicaciones = Publicacion[];

const publicaciones: Publicaciones = [
  {
    fecha: "2023-11-01",
    id: "Newsletter RADAR Nro. 1- Noviembre 2023",
    texto: newsletter1,
    titulo: "Newsletter RADAR Nro. 1- Noviembre 2023",
  },
  {
    fecha: "2023-12-01",
    id: "Newsletter RADAR Nro. 2- Diciembre 2023",
    texto: newsletter2,
    titulo: "Newsletter RADAR Nro. 2- Diciembre 2023",
  },
  {
    fecha: "2024-03-01",
    id: "Newsletter RADAR Nro. 3- Marzo 2024",
    texto: newsletter3,
    titulo: "Newsletter RADAR Nro. 3- Marzo 2024",
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
                  <p>
                    {new Date(Date.parse(publicacion.fecha)).toLocaleDateString(
                      "es-AR",
                    )}
                  </p>
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
