// @ts-check
const { parseTsvDateToUTCMillis, separateBySemicolon } = require("./utils.cjs");
const fs = require("fs");
/** @import { Case, AttacksData, Clasificacion } from  "../common/json-shape"; */

/**
 * @param {string[]} tsvRow
 * @returns {Case | null}
 */
const tsvRowToCase = (tsvRow) => {
  const [
    tsvId,
    tsvTitle,
    tsvDate,
    tsvSource,
    tsvCoords,
    tsvProvince,
    tsvTypeIds,
    tsvTypeDescription,
    tsvComponentIds,
    tsvComponentDescriptions,
  ] = tsvRow;

  // Yo no estoy a la defensiva, vos estás a la defensiva
  if (tsvId === undefined) return null;
  if (tsvSource === undefined) return null;
  if (tsvProvince === undefined) return null;
  if (tsvTypeIds === undefined) return null;

  if (tsvCoords === undefined) return null;
  const [latitude, longitude] = tsvCoords
    .split(",")
    .map((coord) => parseFloat(coord));
  if (latitude === undefined) return null;
  if (longitude === undefined) return null;

  if (tsvTitle === undefined) return null;
  const date = parseTsvDateToUTCMillis(tsvDate);
  if (date === null) return null;

  if (tsvTypeDescription === undefined) return null;
  if (tsvComponentIds === undefined) return null;
  if (tsvComponentDescriptions == undefined) return null;

  return {
    id: parseInt(tsvId ?? ""),
    title: tsvTitle,
    date,
    source: tsvSource,
    coords: {
      latitude,
      longitude,
    },
    provincia: tsvProvince,
    tipo: separateBySemicolon(tsvTypeDescription),
    componente: separateBySemicolon(tsvComponentDescriptions),
  };
};

/** @type {(cases: Case[]) => string[]} */
const getAllNamesForComponentes = (cases) => {
  /** @type {string[]} */
  let componentesNames = [];
  cases.forEach((eachCase) => {
    const newNames = eachCase.componente.filter(
      (componente) => !componentesNames.includes(componente),
    );
    componentesNames = [...componentesNames, ...newNames];
  });
  return componentesNames;
};

/** @type {(cases: Case[]) => string[]} */
const getAllNamesForTipos = (cases) => {
  /** @type {string[]} */
  let tiposNames = [];
  cases.forEach((eachCase) => {
    const newNames = eachCase.tipo.filter((tipo) => !tiposNames.includes(tipo));
    tiposNames = [...tiposNames, ...newNames];
  });
  return tiposNames;
};

/** @type {(cases: Case[]) => Clasificacion} */
const getComponentesClassification = (cases) => {
  const componentesNames = getAllNamesForComponentes(cases);

  /** @type {Record<string, number[]>} */
  const caseIdsByComponenteName = {};
  componentesNames.forEach((componenteName) => {
    caseIdsByComponenteName[componenteName] = cases
      .filter((eachCase) => eachCase.componente.includes(componenteName))
      .map((eachCase) => eachCase.id);
  });
  /** @type {Clasificacion} */
  const componentes = {
    byName: caseIdsByComponenteName,
  };
  return componentes;
};

/**
 * @param {string} tsvResponse
 * @returns {string[][]}
 */
const removeHeaderAndSanitizeRowsFromTSVResponse = (tsvResponse) => {
  const [_tsvHeader, ...tsvRows] = tsvResponse
    .split("\r\n")
    .map((r) => r.split("\t").map((str) => str.replace("\n", "")));
  return tsvRows;
};

/**
 *
 * @param {string} casesFileLocation
 * @returns {Case[]}
 */
const getCasesFromTsvLocation = (casesFileLocation) => {
  const resp = fs.readFileSync(casesFileLocation, "utf8");
  const tsvRows = removeHeaderAndSanitizeRowsFromTSVResponse(resp);
  /** type {(Case)[]} */
  const cases = tsvRows
    .map(tsvRowToCase)
    .filter((eachCase) => eachCase !== null);
  return cases;
};

/**
 *
 * @param {string} colorsByTypeFileLocation
 * @returns {Record<string, string>}
 */
const getColorsByAttackTypeFromTsvLocation = (colorsByTypeFileLocation) => {
  const resp = fs.readFileSync(colorsByTypeFileLocation, "utf8");
  const tsvRows = removeHeaderAndSanitizeRowsFromTSVResponse(resp);
  const colorsByType = Object.fromEntries(tsvRows);
  return colorsByType;
};

/**
 * @param {string | undefined} casesFileLocation
 * @returns {Promise<AttacksData | null>}
 */
const parseTSVToJSON = async (
  casesFileLocation = "services/data/sheet.tsv",
  colorsByAttackTypeFileLocation = "services/data/colors-by-type.tsv",
) => {
  const cases = getCasesFromTsvLocation(casesFileLocation);
  const componentes = getComponentesClassification(cases);
  const colorsByType = getColorsByAttackTypeFromTsvLocation(
    colorsByAttackTypeFileLocation,
  );

  const allDates = cases.map((c) => c.date);
  // sorts in-place, so it mutates allDates!
  allDates.sort();
  const min = allDates[0];
  const max = allDates[allDates.length - 1];

  if (min === undefined || max === undefined) return null;

  return {
    cases,
    componentes,
    min,
    max,
    componentNames: getAllNamesForComponentes(cases),
    tiposNames: getAllNamesForTipos(cases),
    colorByAttackType: colorsByType,
  };
};

module.exports = {
  parseTSVToJSON,
};
