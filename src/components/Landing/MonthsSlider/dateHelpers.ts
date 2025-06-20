const date2MonthYear = (d: Date) =>
  d.toLocaleDateString("es-AR", {
    month: "short",
    year: "numeric",
  });

/** Returns the amount of months that happened between the months corresponding to two given dates */
export const monthsDiff = (b: Date, a: Date) => {
  const yearsDiff = a.getFullYear() - b.getFullYear();
  const monthDiff = a.getMonth() - b.getMonth();
  return yearsDiff * 12 + monthDiff;
};

export const sliderKnobToSliderKnobLabel =
  (maxDate: Date) => (totalNumberOfMonths: number) => (knobValue: number) => {
    /* knobValue represents the zero-based index of the month that's been selected by the knob
     * knobValue is (totalNumberOfMonths-1) if the knob month is the maximum month
     * knobValue is zero if the knob month is the maximum month minus (the total number of months minus one)
     * e.g. if the month is FEBRUARY and total months is TWO and the knobValue is ONE then you get FEBRUARY
     * e.g. if the month is FEBRUARY and total months is TWO and the knobValue is ZERO then you get JANUARY
     * We can conceptualize this as there being a MONTH OFFSET, that we can subtract from the maximum month to get the target month
     */
    const maxMonthsIndex = totalNumberOfMonths - 1;
    const monthOffset = maxMonthsIndex - knobValue;
    const newDate = new Date(maxDate);
    // We had a bug where we were getting the wrong month if the day where you executed this function was during the end of the month
    // We detected this on July the 30th. This is because you can't get, say, February the 31st.
    newDate.setDate(1);
    newDate.setMonth(newDate.getMonth() - monthOffset);
    return date2MonthYear(newDate);
  };
