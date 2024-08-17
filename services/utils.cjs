const parseTsvDateToUTCMillis = (d) => {
  const dComponents = d.trim().split("/");
  if (dComponents.length !== 3) return null;
  const [strDate, strMonth, strYear] = dComponents;
  const [date, month, year] = [+strDate, +strMonth, +strYear];

  if (
    month > 12 ||
    month < 1 ||
    isNaN(month) ||
    isNaN(year) ||
    isNaN(date) ||
    date < 1 ||
    date > 31 ||
    strYear.length !== 4
  )
    return null;
  const newDate = Date.UTC(year, month - 1, date, 0, 0, 0, 0);
  if (isNaN(newDate)) return null;
  return newDate;
};

/**
 * @param {string} s
 * @returns {string[]}
 */
const separateBySemicolon = (s) =>
  s
    .replace(/; $/, "")
    .split(/;/)
    .map((s) => s.trim());

module.exports = {
  separateBySemicolon,
  parseTsvDateToUTCMillis,
};
