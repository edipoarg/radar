const { fetchTSV } = require("./parse-tsv.cjs");

fetchTSV().then((v) => console.log(JSON.stringify(v, null, 4)));
