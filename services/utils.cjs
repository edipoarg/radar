const assert = (condition, message = "Assertion failed") => {
  if (!condition) {
    throw new Error(message);
  }
};

const newDate = (d) => {
  const D = chomp(d);

  try {
    const [, day, month, year] = D.match(
      "^([0-3]?[0-9])/([01]?[0-9])/([12][90][0-9][0-9])$",
    );

    assert(day <= 31, day);
    assert(month <= 12, month);

    return new Date(year, month, day);
  } catch (e) {
    console.error("couldn't parse date: ", d, e);
    return null;
  }
};
const chomp = (s) => s.replace(/^ +/, "").replace(/ +$/, "");
const mapChomp = (s) => s.replace(/; $/, "").split(/;/).map(chomp);

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

module.exports = { Classifier, mapChomp, chomp, newDate };
