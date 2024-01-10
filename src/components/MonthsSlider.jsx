import PropTypes from "prop-types"
import { useCallback } from "react";
import { Slider } from "@mui/material";
import "./MonthsSlider.css";

const valueLabelFormatByMonths = (totalMonths) => (value) => {
    const diff = totalMonths - value;
    const date = new Date()
    date.setMonth(date.getMonth() - diff - 1)
    return `${date.getMonth()}/${date.getFullYear()}`;
};
/** Agrega un botón o elemento para cambiar la visibilidad de Filtros */
export default function MonthsSlider({ className, monthRange, setMonthRange, totalMonths, startDateLabel, endDateLabel }) {

    // Uso useCallback para evitar que se re-declare la función anónima en cada render
    const handleChange = useCallback((event) => {
        setMonthRange(event.target.value);
    }, [setMonthRange]);

    // Esto da una warning en el linter porque no tiene información de tipado. La lista de dependencias es exhaustiva.
    const valueLabelFormat = useCallback(valueLabelFormatByMonths(totalMonths), [totalMonths]);

    return (<div className={`months-slider ${className ?? ""}`}>
        <Slider
            max={totalMonths}
            valueLabelDisplay="auto"
            value={monthRange}
            step={1}
            getAriaValueText={valueLabelFormat}
            valueLabelFormat={valueLabelFormat}
            onChange={handleChange}
            aria-labelledby="non-linear-slider"
        />
        <div id='referenciasFechas'>
            <div> <h6 id='fechaInicio'>{startDateLabel}</h6>  </div>
            <div>  </div>
            <div> <h6 id='fechaCierre'>{endDateLabel}</h6>  </div>
        </div>
    </div>)
}

MonthsSlider.propTypes = {
    className: PropTypes.string,
    monthRange: PropTypes.arrayOf(PropTypes.number).isRequired,
    setMonthRange: PropTypes.func.isRequired,
    totalMonths: PropTypes.number.isRequired,
    startDateLabel: PropTypes.string.isRequired,
    endDateLabel: PropTypes.string.isRequired,
}

MonthsSlider.defaultProps = {
    className: "",
}