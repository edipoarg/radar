import { useCallback } from "react";
import styles from "./Reporta.module.css";

export default function ReportaForm() {
  const submit: React.FormEventHandler<HTMLFormElement> = useCallback((e) => {
    const formEle: HTMLFormElement | null =
      document.querySelector("#formSheet");
    e.preventDefault;
    console.log("submitted");
    if (formEle !== null) {
      const formData = new FormData(formEle);
      fetch(
        "https://script.google.com/macros/s/AKfycbySxucaKUPO4gM1WPoknylJuhqL4ElNwvgyDUfzVypgXlTX3u3CtrdBAuwSpB2DQ2O8/exec",
        { method: "POST", body: formData },
      );
    }
  }, []);

  return (
    <div className={styles.reportaForm}>
      <div className={styles.form}>
        <div className={styles.formHeader}>
          <h1 className={styles.tituloForm}>
            Relevamiento nacional de ataques de derechas radicalizadas
          </h1>
          <h4 className={styles.bajadaForm}>
            *este reporte no implica la realización de ningún tipo de denuncia
            institucional sino un aporte a un relevamiento colaborativo con
            fines periodísticos.
            <br /> **no publicaremos ninguna información sin tu autorización{" "}
          </h4>
        </div>

        <form id="formSheet" className={styles.formSheet} onSubmit={submit}>
          <div className={styles.formInputContainer}>
            <label htmlFor="email">
              <h3 className={styles.formQuestion}>Email</h3>
            </label>

            <input
              className={styles.formInput}
              type="email"
              name="Mail"
              id="mail"
              required
              placeholder="Escribe tu email"
            />
          </div>
          <br />

          <div className={styles.formInputContainer}>
            <label htmlFor="titulo">
              <h3 className={styles.formQuestion}>¿Qué pasó?</h3>
              <p className={styles.bajadaQuestion}>
                una descripción lo más detallada del hecho
              </p>
            </label>
            <input
              className={`${styles.formInput} ${styles.titulo}`}
              type="text"
              name="Titulo"
              id="titulo"
              required
              placeholder="Escribe tu respuesta"
              maxLength={30}
            />
          </div>
          <br />
          <div className={styles.formInputContainer}>
            <label htmlFor="fecha">
              <h3 className={styles.formQuestion}>¿Cuándo pasó?</h3>
              <p className={styles.bajadaQuestion}>
                si no es posible indicar fecha exacta, incorporar una referencia
                de tiempo en la descripción del hecho
              </p>
            </label>
            <input
              className={styles.formInput}
              type="date"
              name="fechaHecho"
              id="fecha"
              required
            />
          </div>
          <br />
          <div className={styles.formInputContainer}>
            <label htmlFor="lugar">
              <h3 className={styles.formQuestion}>¿Dónde pasó?</h3>
              <p className={styles.bajadaQuestion}>
                Si es posible, insertar enlace de googlemaps o referencia
                geográfica
              </p>
            </label>
            <input
              className={styles.formInput}
              type="text"
              name="Lugar"
              id="lugar"
              placeholder="Escribe aquí"
            />
          </div>
          <br />
          <div className={styles.formInputContainer}>
            <label htmlFor="agresor">
              <h3 className={styles.formQuestion}>
                ¿qué sabes sobre la(s) persona(s) agresora(s)?
              </h3>
            </label>
            <input
              className={styles.formInput}
              type="text"
              name="Agresor"
              id="agresor"
              placeholder="Escribe aquí"
              required
            />
          </div>
          <br />

          <div className={styles.formInputContainer}>
            <label htmlFor="intervencion">
              <h3 className={styles.formQuestion}>
                ¿hubo intervención policial? ¿alguna respuesta estatal o
                judicial? ¿cuál?
              </h3>
            </label>
            <input
              className={styles.formInput}
              type="text"
              name="Intervencion"
              id="intervencion"
              placeholder="Escribe aquí"
            />
          </div>
          <br />

          <div className={styles.formInputContainer}>
            <label htmlFor="archivos">
              <h3 className={styles.formQuestion}>Archivos relacionados</h3>
              <p className={styles.bajadaQuestion}>
                Fotos, videos o documentos relativos al hecho.
              </p>
            </label>
            <br />
            <input
              className={styles.formInput}
              type="file"
              name="Archivos"
              id="archivos"
              multiple
            />
          </div>
          <br />

          <div className={styles.formInputContainer}>
            <label htmlFor="comentarios">
              <h3 className={styles.formQuestion}>Comentarios adicionales</h3>
            </label>
            <input
              className={styles.formInput}
              type="text"
              name="Comentarios"
              id="observaciones"
              placeholder="Escribe aquí"
            />
          </div>

          <br />
          <div>
            <input type="submit" value="ENVIAR" />
          </div>
        </form>
      </div>
    </div>
  );
}
