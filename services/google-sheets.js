import constants from "./constants.js";

const newDate = (d) => {
  try {
    const [, day, month, year] = d.match(
      "([0-3]?[0-9])/([01]?[0-9])/([12][90][0-9][0-9])",
    );
    return new Date(year, month - 1, day);
  } catch (e) {
    console.error("cauldn't parse date: ", d, e);
    return null;
  }
};

const chomp = (s) => s.replace(/^ +/, "").replace(/ +$/, "");

const mapChomp = (s) => s.replace(/; $/, "").split(/;/).map(chomp);

const FIXUP = (t) =>
  t
    .replace("murales o lugares", "murales y lugares") //
    .replace("símbolos y lugares", "símbolos, murales y lugares") //
    .replace("amrnazas", "amenazas") //
    .replace(/identidades política$/, "identidades políticas") //
    .replace("antiLGBTINB+", "antiLGBTINBQ+") //
    .replace("supremaracismo", "supremacismo") //
    .replace(/^racismo y xenofob.a$/, "racismo, xenofobia y nacionalismo") //
    .replace(
      /^violencia física y atentados contra la vida$/, //
      "atentados contra la integridad física y la vida",
    ) //
    .replace(
      /^violencia por razones de misoginia, antifeminismo y antiLGBTINB+$/,
      "misoginia, antifeminismo y antiLGBTINBQ+",
    );
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

export const fetchTSV = async (url = constants.tsvUrl) => {
  const resp = await fetch(url);
  const cases = [];
  const tipos = new Classifier(FIXUP);
  const componentes = new Classifier(FIXUP);

  let min = new Date();
  let max = new Date();
  max.setDate(0);
  let i = 0;

  const [desc, ...rows] = (await resp.text())
    .split("\r\n")
    .map((r) => r.split("\t"));
  for (let r of rows) {
    i++;
    const f = {};
    for (let p in r) {
      f[desc[p].replace("caso.", "")] = r[p];
    }
    const [latitude, longitude] = f.coordenadas.split(",").map(parseFloat);
    const event = {
      id: parseInt(f.id),
      title: f.titulo,
      date: newDate(f.fecha),
      source: f.fuente,
      coords: {
        latitude,
        longitude,
      },
      provincia: f.provincia,
      tipoId: mapChomp(f["tipo.id"]),
      tipo: mapChomp(f.tipo),
      componenteId: mapChomp(f["componente.id"]),
      componente: mapChomp(f.componente),
    };
    cases.push(event);

    /* update min, max and do sanity checks */
    if (event.date) {
      if (min > event.date) min = event.date;
      if (max < event.date) max = event.date;
    }

    ["tipo", "tipoId", "componente", "componenteId", "date"].forEach((key) => {
      if (!event[key]) {
        console.error(`case missing ${key}`, f);
      } else if (event[key]?.includes?.("")) {
        // something wasn't parsed correctly
        console.error(`${i}: error in ${f}`, event[key], r);
      }
    });
    tipos.classify(event.tipoId, event.tipo, i);
    componentes.classify(event.componenteId, event.componente, i);
  }
  return { cases, tipos, componentes, min, max };
};

fetchTSV().then((v) => console.log(JSON.stringify(v, null, 4)));
