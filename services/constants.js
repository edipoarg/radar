import 'process';
const sheetKey = process.env.VITE_SHEET_KEY;
const sheetId = process.env.VITE_SHEET_ID;

const constants = {
                   sheetUrl: `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/1!A:H?key=${sheetKey}`,
};

export default constants;
