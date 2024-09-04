import styles from "./TypeFilter.module.css";
import LinesEllipsis from "react-lines-ellipsis";

interface Props {
  description: string;
  color?: string;
  value: boolean;
  onChange: (newValue: boolean) => void;
}

export default function Filter({ description, color, value, onChange }: Props) {
  return (
    <button
      className={`${styles.tipo} ${value ? "" : styles.deactivated}`}
      title={description}
      style={{ backgroundColor: value ? color : "#b5d0e8" }}
      type="button"
      onClick={() => onChange(!value)}
    >
      <span className={styles.tipoLabel}>
        <LinesEllipsis
          text={description}
          // When we pass 2 to this, it sometimes renders only 1, other times 2 lines.
          maxLine={3} // In actuality they are 2 lines, but there is probably a bug in how the Ronnia font is rendered.
          ellipsis="..."
          trimRight
          basedOn="letters"
        />
      </span>
      <div className={styles.switch}></div>
    </button>
  );
}
