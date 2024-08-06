const parseTsvDateToJsDate = (d) => {
  try {
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
    const newDate = new Date(year, month - 1, date);
    newDate.setHours(0, 0, 0, 0);
    if (isNaN(newDate.getTime())) return null;
    return newDate;
  } catch (e) {
    console.error("couldn't parse date: ", d, e);
    return null;
  }
};
const mapChomp = (s) =>
  s
    .replace(/; $/, "")
    .split(/;/)
    .map((s) => s.trim());

class Classifier {
  byId = {};
  byName = {};
  idMap = {};
  nameMap = {};
  mangle = (t) => t;

  constructor(mangle) {
    if (mangle) this.mangle = mangle;
  }

  classify(ids, names, i) {
    for (let id of ids) {
      id = this.mangle(id);
      this.byId[id] = [...(this.byId[id] || []), i];
    }

    for (let name of names) {
      name = this.mangle(name);
      this.byName[name] = [...(this.byName[name] || []), i];
    }
  }
}

module.exports = { Classifier, mapChomp, parseTsvDateToJsDate };
