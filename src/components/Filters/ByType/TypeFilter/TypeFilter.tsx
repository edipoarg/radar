import styles from "./TypeFilter.module.css";

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
      style={{ backgroundColor: value ? color : "#b5d0e8" }} // TODO: change grey to actual color
      type="button"
      onClick={() => onChange(!value)}
    >
      <span className={styles.tipoLabel}>{description}</span>
    </button>
  );
}
