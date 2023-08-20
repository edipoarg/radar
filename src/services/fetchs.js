import constants from "../constants/constants";

export const fecthData = async () => {
  const response = await fetch(constants.sheetUrl);
  const data = await response.json();

  const values = data.values.slice(1);

  let parsedValues = [];
  values.forEach((c) => {
    if (c.length === 5) {
      const [latitude, longitude] = c[4].split(",").map(parseFloat);

      const event = {
        id: parseInt(c[0]),
        title: c[1],
        date: c[2],
        source: c[3],
        coords: {
          latitude,
          longitude,
        },
      };
      if (longitude !== undefined) {
        console.log("on fetch", event.date === '');
        parsedValues.push(event);
      }
    }
  });
  return parsedValues;
};
