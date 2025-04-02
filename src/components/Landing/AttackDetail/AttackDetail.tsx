import type { Attack } from "../../../../common/json-shape";
import { getColorByAttack } from "../../../helpers/colorByAttackType";
import styles from "./AttackDetail.module.css";
import ClickAwayListener from "react-click-away-listener";

interface Props {
  attack: Attack;
  className?: string;
  closeById: (AttackId: number) => () => void;
  colorByAttackType: Record<string, string>;
}

const isLink = (attackSource: string) => {
  return attackSource !== "Fuente directa verificada";
};

const AttackDetail = ({
  attack,
  className,
  closeById,
  colorByAttackType,
}: Props) => (
  <ClickAwayListener onClickAway={closeById(attack.id)}>
    <section className={`${styles.AttackDetail} ${className ?? ""}`}>
      <div className={styles.closeButtonRow}>
        <button
          className={styles.closeButton}
          type="button"
          onClick={closeById(attack.id)}
        >
          X
        </button>
      </div>
      <article className={styles.attackDetailContent}>
        <h3 className={`${styles.attackTitle}`}>{attack.title}</h3>
        <h4>{attack.provincia}</h4>
        {attack.tipo.map((attackType) => (
          <div
            key={attackType}
            className={styles.attackType}
            style={{
              backgroundColor: getColorByAttack(colorByAttackType, attackType),
            }}
          >
            {attackType}
          </div>
        ))}
        <details className={styles.moreInfo}>
          <summary>Ver más</summary>
          <p>
            La pintada fue realizada sobre un pañuelo de nunca mas en ensenada
            ajkjiasdjuyhfasd
          </p>
        </details>
        <section className={styles.typeOfHate}>
          <h4>Narrativa{attack.componente.length > 1 ? "s" : ""} de odio:</h4>
          <p>{attack.componente.join(" + ")}</p>
        </section>
      </article>
      <div className={styles.foot}>
        <p className={styles.date}>
          {new Date(attack.date).toLocaleDateString("es-AR", {
            timeZone: "UTC",
          })}
        </p>
        {isLink(attack.source) ? (
          <a
            className={styles.viewMoreLink}
            href={attack.source}
            target="_blank"
            rel="noreferrer"
          >
            VER
          </a>
        ) : (
          <p title="Fuente verificada por el equipo de ra-dar">
            [Fuente directa]
          </p>
        )}
      </div>
    </section>
  </ClickAwayListener>
);

export default AttackDetail;
