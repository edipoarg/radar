import constants from "../constants/constants";

const newDate = (d) => {
    const [day, month, year] = d.split('/');
    return new Date(year, month, day);
}

export const fetchGoogleSheets = async () => {
    const response = await fetch(constants.sheetUrl);
    const data = await response.json();
    if (! data || ! data.values) {
        console.error("couldn't fetch data", data)
        return [];
    }
    const values = data.values.slice(1);

    const byType = {}
    const byTypeName = {}
    const cases = [];

    let min = new Date();
    let max = new Date();
    max.setDate(0);

    let i = 0;
    for (let c of values) {
        if (c.length < 8) {
            console.error("discarding case:", c)
            continue;
        }
        i++;
        const [latitude, longitude] = c[4].split(",").map(parseFloat);

        if (!latitude || ! longitude)
            continue;
        const event = {
            id: parseInt(c[0]),
            title: c[1],
            date: newDate(c[2]),
            source: c[3],
            coords: {
                latitude,
                longitude,
            },
            provincia: c[5],
            tipoId: c[6],
            tipo: c[7]
        }
        cases.push(event);

        /* update min, max and do sanity checks */
        if (min > event.date) min = event.date
        if (max < event.date) max = event.date

        if (!event.tipo) {
            console.error("case missing tipo", event)
        }
        if (!event.tipoId) {
            console.error("case missing tipoId", event)
        }
        if (!event.date) {
            console.error("case missing date", event, c[2])
        }

        byType[c[6]] = [...(byType[c[6]] || []), i]
        byTypeName[c[7]] = [...(byType[c[7]] || []), i]
    }

    return {cases, byType, byTypeName, min, max};
};
