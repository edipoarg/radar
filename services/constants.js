import "process";
const tsvId = process.env.CASES_SPREADSHEET_ID;

const constants = {
  tsvUrl: `https://docs.google.com/spreadsheets/d/e/${tsvId}/pub?output=tsv`,
};

export default constants;
