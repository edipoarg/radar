import { useState, useCallback, useMemo } from "react";
import { Slider } from "@mui/material";
import styles from "./MonthsSlider.module.css";
import type { BoundaryDates } from "../../types/dates";
import {
  date2MonthYear,
  monthsDiff,
  sliderKnobToSliderKnobLabel,
} from "./dateHelpers";

interface Props {
  className: string;
  boundaryDates: BoundaryDates;
  setBoundaryDates: (dates: BoundaryDates) => void;
}

const useSliderBehavior = (
  boundaryDates: BoundaryDates,
  setBoundaryDates: (dates: BoundaryDates) => void,
) => {
  const totalMonths = useMemo(
    () => monthsDiff(boundaryDates.min, boundaryDates.max),
    [boundaryDates.min, boundaryDates.max],
  );
  /** monthRange represents the indices of the months that are currently within the selected range.
   * It starts with [0, {however many months there are within the boundary dates, minus one}]
   * Then, as you use the slider, the starting and ending indices change
   */
  const [monthRange, setMonthRange] = useState<[number, number]>([
    0,
    totalMonths,
  ]);

  const valueLabelFormat = useCallback(
    (knobValue: number) =>
      sliderKnobToSliderKnobLabel(new Date())(totalMonths)(knobValue),
    [totalMonths],
  );

  const handleSliderValueChange = useCallback(
    (_event: Event, value: number[] | number) => {
      /* La API de MUI no permite parametrizar el tipo del value.
       * El estado del arte es hacer esta chanchada: forzar el tipo a la forma que sabés que va a recibir en runtime.
       * Ejemplos acá: https://www.programcreek.com/typescript/?api=@mui/material.Slider
       */
      const range = value as [number, number];
      const min = new Date(boundaryDates.min);
      const max = new Date(boundaryDates.min);

      max.setMonth(min.getMonth() + range[1]);
      min.setMonth(min.getMonth() + range[0]);

      setMonthRange(range);
      setBoundaryDates({ min, max });
    },
    [boundaryDates.min, setBoundaryDates],
  );

  return { totalMonths, monthRange, valueLabelFormat, handleSliderValueChange };
};

export default function MonthsSlider({
  className,
  boundaryDates,
  setBoundaryDates,
}: Props) {
  const { monthRange, totalMonths, handleSliderValueChange, valueLabelFormat } =
    useSliderBehavior(boundaryDates, setBoundaryDates);
  return (
    <div className={`${styles["months-slider"]} ${className}`}>
      <Slider
        max={totalMonths}
        valueLabelDisplay="auto"
        value={monthRange}
        step={1}
        getAriaValueText={valueLabelFormat}
        valueLabelFormat={valueLabelFormat}
        onChange={handleSliderValueChange}
        aria-labelledby="non-linear-slider"
      />
      <div className={styles.referenciasFechas}>
        <div>
          <h6 className={styles.fechaInicio}>
            {date2MonthYear(boundaryDates.min)}
          </h6>
        </div>
        <div> </div>
        <div>
          <h6 className={styles.fechaCierre}>
            {date2MonthYear(boundaryDates.max)}
          </h6>
        </div>
      </div>
    </div>
  );
}
