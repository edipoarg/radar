// @ts-check
import constants from "./constants.js";

// fetch the data and output it as JSON to stdout
fetch(constants.colorsByTipeTSVUrl).then((res) => {
  res.text().then((text) => {
    console.log(text);
  });
});
