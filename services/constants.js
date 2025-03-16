import "process";
const tsvId = process.env.CASES_SPREADSHEET_ID;
const colorsByTypeId = process.env.COLORS_BY_TYPE_SPREADSHEET_ID;

if (tsvId == undefined)
  throw new Error("CASES_SPREADSHEET_ID environment variable not provided");
if (colorsByTypeId == undefined)
  throw new Error(
    "COLORS_BY_TYPE_SPREADSHEET_ID environment variable not provided",
  );

const constants = {
  tsvUrl: `https://docs.google.com/spreadsheets/d/e/${tsvId}/pub?output=tsv`,
  colorsByTipeTSVUrl: `https://docs.google.com/spreadsheets/d/e/${colorsByTypeId}/pub?gid=496295073&single=true&output=tsv`,
};

export default constants;
