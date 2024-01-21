import { useState, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { Slider } from "@mui/material";
import styles from "./MonthsSlider.module.css";

const date2MonthYear = (d) => `${d.getMonth() + 1}/${d.getFullYear()}`;
const monthsDiff = (b, a) => {
  const yearsDiff = a.getFullYear() - b.getFullYear();
  const monthDiff = a.getMonth() - b.getMonth();
  return yearsDiff * 12 + monthDiff;
};

export default function MonthsSlider({ className, globalDates, setDates }) {
  const months = useMemo(
    () => monthsDiff(globalDates.min, globalDates.max),
    [globalDates],
  );
  const [monthRange, setMonthRange] = useState([0, months]);

  const valueLabelFormat = useCallback(
    (value) => {
      const diff = months - value;
      const date = new Date();
      date.setMonth(date.getMonth() - diff);
      return date2MonthYear(date);
    },
    [months],
  );

  // Uso useCallback para evitar que se re-declare la función anónima en cada render
  const handleChange = useCallback((event) => {
    const range = event.target.value;
    const min = new Date(globalDates.min);
    const max = new Date(globalDates.min);

    max.setMonth(min.getMonth() + range[1]);
    min.setMonth(min.getMonth() + range[0]);

    setMonthRange(range);
    setDates({ min, max });
  }, []);

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

MonthsSlider.propTypes = {
  className: PropTypes.string,
  globalDates: PropTypes.objectOf(PropTypes.instanceOf(Date)).isRequired,
  setDates: PropTypes.func.isRequired,
};

MonthsSlider.defaultProps = {
  className: "",
};
