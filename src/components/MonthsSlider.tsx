import { useState, useCallback, useMemo } from "react";
import { Slider } from "@mui/material";
import styles from "./MonthsSlider.module.css";

const date2MonthYear = (d: Date) => `${d.getMonth() + 1}/${d.getFullYear()}`;
const monthsDiff = (b: Date, a: Date) => {
  const yearsDiff = a.getFullYear() - b.getFullYear();
  const monthDiff = a.getMonth() - b.getMonth();
  return yearsDiff * 12 + monthDiff;
};

interface BoundaryDates {
  min: Date;
  max: Date;
}

interface Props {
  className: string;
  globalDates: BoundaryDates;
  setDates: (dates: BoundaryDates) => void;
}

export default function MonthsSlider({
  className,
  globalDates,
  setDates,
}: Props) {
  const months = useMemo(
    () => monthsDiff(globalDates.min, globalDates.max),
    [globalDates],
  );
  const [monthRange, setMonthRange] = useState([0, months]);

  const valueLabelFormat = useCallback(
    (value: number) => {
      const diff = months - value;
      const date = new Date();
      date.setMonth(date.getMonth() - 1 - diff);
      return date2MonthYear(date);
    },
    [months],
  );

  // Uso useCallback para evitar que se re-declare la función anónima en cada render
  const handleChange = useCallback(
    (_event: Event, value: number[] | number) => {
      /* La API de MUI no permite parametrizar el tipo del value.
       * El estado del arte es hacer esta chanchada: forzar el tipo a la forma que sabés que va a recibir en runtime.
       * Ejemplos acá: https://www.programcreek.com/typescript/?api=@mui/material.Slider
       */
      const range = value as [number, number];
      const min = new Date(globalDates.min);
      const max = new Date(globalDates.min);

      max.setMonth(min.getMonth() + range[1]);
      min.setMonth(min.getMonth() + range[0]);

      setMonthRange(range);
      setDates({ min, max });
    },
    [globalDates.min, setDates],
  );

  return (
    <div className={`${styles["months-slider"]} ${className ?? ""}`}>
      <Slider
        max={months}
        valueLabelDisplay="auto"
        value={monthRange}
        step={1}
        getAriaValueText={valueLabelFormat}
        valueLabelFormat={valueLabelFormat}
        onChange={handleChange}
        aria-labelledby="non-linear-slider"
      />
      <div className={styles.referenciasFechas}>
        <div>
          <h6 className={styles.fechaInicio}>
            {date2MonthYear(globalDates.min)}
          </h6>
        </div>
        <div> </div>
        <div>
          <h6 className={styles.fechaCierre}>
            {date2MonthYear(globalDates.max)}
          </h6>
        </div>
      </div>
    </div>
  );
}
