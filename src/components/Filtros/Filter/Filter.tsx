import styles from "./Filter.module.css";
import { Switch } from "@mui/material";

interface Props {
  description: string;
  iconClassname?: string;
  value: boolean;
  onChange: (newValue: boolean) => void;
}

export default function Filter({
  description,
  iconClassname,
  value,
  onChange,
}: Props) {
  return (
    <div className={styles.tipo}>
      <div className={styles.tipoLabel}>
        <div className={`${styles.tipoIcon ?? ""} ${iconClassname}`}></div>
        <p className={styles.tipoDescription}>{description}</p>
      </div>
      <Switch
        checked={value}
        onChange={(_event, checked) => {
          onChange(checked);
        }}
      />
    </div>
  );
}
