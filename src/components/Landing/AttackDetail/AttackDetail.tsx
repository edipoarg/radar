import type { Attack } from "../../../../common/json-shape";
import type { Vh } from "../../../types/styles";
import styles from "./AttackDetail.module.css";
import ClickAwayListener from "react-click-away-listener";

interface Props {
  attack: Attack;
  className?: string;
  close: () => void;
  bottom: Vh;
}

const isLink = (attackSource: string) => {
  return attackSource !== "Fuente directa verificada";
};

const AttackDetail = ({ attack, className, close, bottom }: Props) => (
  <ClickAwayListener onClickAway={close}>
    <section
      className={`${styles.AttackDetail} ${className ?? ""}`}
      style={{ bottom }}
    >
      <div className={styles.exitButtonRow}>
        <button type="button" onClick={close}>
          X
        </button>
      </div>
      <article>
        <h3 className={`${styles.displayTitulo}`}>{attack.title}</h3>
        <div className={styles.masDatos}>
          <p className={styles.displayFecha}>
            Fecha:{" "}
            {new Date(attack.date).toLocaleDateString("es-AR", {
              timeZone: "UTC",
            })}
          </p>
          {isLink(attack.source) ? (
            <a
              className={styles.displayLink}
              href={attack.source}
              target="_blank"
              rel="noreferrer"
            >
              VER
            </a>
          ) : (
            <p>[Fuente directa verificada]</p>
          )}
        </div>
      </article>
    </section>
  </ClickAwayListener>
);

export default AttackDetail;
