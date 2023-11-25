import constants from "../constants/constants";

export const fetchGoogleSheets = async () => {
    const response = await fetch(constants.sheetUrl);
    const data = await response.json();
    if (! data || ! data.values) {
        console.error("couldn't fetch data", data)
        return [];
    }
    const values = data.values.slice(1);

    const cases = [];
    for (let c of values) {
        if (c.length < 8) {
            console.error("discarding case:", c)
            continue;
        }
        const [latitude, longitude] = c[4].split(",").map(parseFloat);

        if (!latitude || ! longitude)
            continue;
        const event = {
            id: parseInt(c[0]),
            title: c[1],
            date: c[2],
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


    return cases;
};
