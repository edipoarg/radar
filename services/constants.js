import "process";
const tsvId = process.env.VITE_TSV_ID;

const constants = {
  tsvUrl: `https://docs.google.com/spreadsheets/d/e/${tsvId}/pub?output=tsv`,
};

export default constants;
