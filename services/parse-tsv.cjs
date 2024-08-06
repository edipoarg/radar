const fs = require("fs");
const {
  parseTsvDateToUTCMillis,
  mapChomp,
  Classifier,
} = require("./utils.cjs");

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

const fetchTSV = async (fileLocation = "services/data/sheet.tsv") => {
  const resp = fs.readFileSync(fileLocation, "utf8");
  const cases = [];
  const tipos = new Classifier(FIXUP);
  const componentes = new Classifier(FIXUP);

  let min = new Date();
  let max = new Date();
  max.setDate(0);
  let i = 0;
  const [desc, ...rows] = resp.split("\r\n").map((r) => r.split("\t"));
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
      date: parseTsvDateToUTCMillis(f.fecha),
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
  max.setHours(0, 0, 0, 0);
  return {
    cases,
    tipos,
    componentes,
    min,
    max: Date.UTC(max.getFullYear(), max.getMonth(), max.getDate()),
  };
};

module.exports = {
  fetchTSV,
};
