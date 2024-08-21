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
  className?: string;
  boundaryDates: BoundaryDates;
  setFilterDates: (dates: { min: number; max: number }) => void;
}

const useSliderBehavior = (
  boundaryDates: BoundaryDates,
  setFilterDates: (dates: { min: number; max: number }) => void,
) => {
  const totalMonths = useMemo(
    // Plus one because we don't want the difference but the totality. e.g. Jan and Feb are 2, not 1
    () => monthsDiff(boundaryDates.min, boundaryDates.max) + 1,
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
      sliderKnobToSliderKnobLabel(boundaryDates.max)(totalMonths)(knobValue),
    [boundaryDates.max, totalMonths],
  );

  const handleSliderValueChange = useCallback(
    (_event: Event, value: number[] | number) => {
      /* La API de MUI no permite parametrizar el tipo del value.
       * El estado del arte es hacer esta chanchada: forzar el tipo a la forma que sabés que va a recibir en runtime.
       * Ejemplos acá: https://www.programcreek.com/typescript/?api=@mui/material.Slider
       */
      const range = value as [number, number];
      if (range[1] < range[0]) return;

      const min = new Date(boundaryDates.min);
      const max = new Date(boundaryDates.max);

      // Make max the last day of its month
      max.setMonth(max.getMonth() + 1);
      max.setDate(-1);
      max.setHours(23);
      max.setMinutes(59);

      // Make min the first day of its month
      min.setDate(1);
      min.setHours(0);
      min.setMinutes(0);

      max.setMonth(max.getMonth() - (totalMonths - (range[1] + 1)));
      min.setMonth(min.getMonth() + range[0] - 1);

      setMonthRange(range);
      setFilterDates({
        min: min.getTime(),
        max: max.getTime(),
      });
    },
    [boundaryDates.min, boundaryDates.max, totalMonths, setFilterDates],
  );

  return { totalMonths, monthRange, valueLabelFormat, handleSliderValueChange };
};

export default function MonthsSlider({
  className,
  boundaryDates,
  setFilterDates,
}: Props) {
  const { monthRange, totalMonths, handleSliderValueChange, valueLabelFormat } =
    useSliderBehavior(boundaryDates, setFilterDates);
  return (
    <div className={`${styles["months-slider"]} ${className ?? ""}`}>
      <Slider
        min={0}
        max={totalMonths - 1}
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
        <div>
          <h6 className={styles.fechaCierre}>
            {date2MonthYear(boundaryDates.max)}
          </h6>
        </div>
      </div>
    </div>
  );
}
