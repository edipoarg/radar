export const date2MonthYear = (d: Date) =>
  `${d.getMonth() + 1}/${d.getFullYear()}`;

/** Returns the amount of months that happened between the months corresponding to two given dates */
export const monthsDiff = (b: Date, a: Date) => {
  const yearsDiff = a.getFullYear() - b.getFullYear();
  const monthDiff = a.getMonth() - b.getMonth();
  return yearsDiff * 12 + monthDiff;
};

/** the underlying assumption of this function is that the current date's month corresponds to the last month of the slider */
export const sliderKnobToSliderKnobLabel =
  (currentDate: Date) =>
  (totalNumberOfMonths: number) =>
  (knobValue: number) => {
    const diff = totalNumberOfMonths - knobValue;
    // We had a bug where we were getting the wrong month if the day where you executed this function was during the end of the month
    // We detected this on July the 30th. This is because you can't get, say, February the 31st.
    currentDate.setDate(1);
    currentDate.setMonth(currentDate.getMonth() - 1 - diff);
    return date2MonthYear(currentDate);
  };
