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
          maxLine={2}
          ellipsis="..."
          trimRight
          basedOn="letters"
        />
      </span>
      <div className={styles.switch}></div>
    </button>
  );
}
