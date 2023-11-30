import constants from "./constants.js";

const newDate = (d) => {
    const [day, month, year] = d.split('/');
    return new Date(year, month, day);
}

const chomp = s => s.replace(/^ +/, '')
                    .replace(/ +$/, '')

const mapChomp = s => s.replace(/; $/, '').split(/;/).map(chomp)

export const fetchTSV = async (url = constants.tsvUrl) => {
    const config = {};
    const resp = await fetch(url);
    const cases = []
    const tipos = {byId: {}, byName: {}}
    const componentes = {byId: {}, byName: {}}

    let min = new Date();
    let max = new Date();
    max.setDate(0);
    let i = 0;


    const [desc, ...rows] = (await resp.text()).split('\r\n').map(r => r.split('\t'));
    for (let r of rows) {
        i++;
        const f = {}
        for (let p in r) {
            f[desc[p].replace('caso.', '')] = r[p]
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
            tipoId: mapChomp(f['tipo.id']),
            tipo: mapChomp(f.tipo),
            componenteId: mapChomp(f['componente.id']),
            componente: mapChomp(f.componente)
        }
        cases.push(event)

        /* update min, max and do sanity checks */
        if (min > event.date) min = event.date
        if (max < event.date) max = event.date

        ;['tipo','tipoId', 'componente', 'componenteId', 'date'].forEach(f => {
            if (! event[f]) {
                console.error(`case missing ${f}`, event)
            }
            if (event[f].includes && event[f].includes("")) {
                console.error(`${i}: error in ${f}`, event[f], r)
            }
        })
        const hash = (r, ids, names, m = t => t) => {
            for (let id of ids) {
                r.byId[id] = [...(r.byId[id] || []), i]
            }

            for (let c of names) {
                c = m(c)
                r.byName[c] = [...(r.byName[c] || []), i]
            }
            return r;
        }
        hash(tipos, event.tipoId, event.tipo,
             t => t.replace('murales o lugares', 'murales y lugares')
                   .replace('amrnazas', 'amenazas')
                   .replace('violencia física y atentados contra la vida',
                            'atentados contra la integridad física y la vida'))
        hash(componentes, event.componenteId, event.componente)
    }
    return {cases, tipos, componentes, min, max}
}

fetchTSV()
    .then(v => console.log(JSON.stringify(v, null, 4)))
