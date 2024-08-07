const { parseTSVToJSON } = require("./parse-tsv.cjs");

parseTSVToJSON().then((v) => console.log(JSON.stringify(v, null, 4)));
