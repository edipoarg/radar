import "process";
const tsvId = process.env.CASES_SPREADSHEET_ID;

if (tsvId == undefined)
  throw new Error("CASES_SPREADSHEET_ID environment variable not provided");

const constants = {
  tsvUrl: `https://docs.google.com/spreadsheets/d/e/${tsvId}/pub?output=tsv`,
};

export default constants;
