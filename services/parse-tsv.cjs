// @ts-check
const { parseTsvDateToUTCMillis, separateBySemicolon } = require("./utils.cjs");
const fs = require("fs");
/** @import { Attack, AttacksData, Clasificacion } from  "../common/json-shape"; */

/**
 * @param {string[]} tsvRow
 * @returns {Attack | null}
 */
const tsvRowToAttack = (tsvRow) => {
  const [
    tsvId,
    tsvTitle,
    tsvDate,
    tsvSource,
    tsvCoords,
    tsvProvince,
    tsvTypeDescriptions,
    tsvComponentDescriptions,
  ] = tsvRow;

  // Yo no estoy a la defensiva, vos estás a la defensiva
  if (tsvId === undefined) return null;
  if (tsvSource === undefined) return null;
  if (tsvProvince === undefined) return null;

  if (tsvCoords === undefined) return null;
  const [latitude, longitude] = tsvCoords
    .split(",")
    .map((coord) => parseFloat(coord))
    .map((coord) => (isNaN(coord) ? undefined : coord));
  if (latitude === undefined) return null;
  if (longitude === undefined) return null;

  if (tsvTitle === undefined) return null;
  const date = parseTsvDateToUTCMillis(tsvDate);
  if (date === null) return null;

  if (tsvTypeDescriptions === undefined) return null;
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
    tipo: separateBySemicolon(tsvTypeDescriptions),
    componente: separateBySemicolon(tsvComponentDescriptions),
  };
};

/** @type {(attacks: Attack[]) => string[]} */
const getAllNamesForComponentes = (attacks) => {
  /** @type {string[]} */
  let componentesNames = [];
  attacks.forEach((attack) => {
    const newNames = attack.componente.filter(
      (componente) => !componentesNames.includes(componente),
    );
    componentesNames = [...componentesNames, ...newNames];
  });
  return componentesNames;
};

/** @type {(attacks: Attack[]) => string[]} */
const getAllNamesForTipos = (attacks) => {
  /** @type {string[]} */
  let tiposNames = [];
  attacks.forEach((attack) => {
    const newNames = attack.tipo.filter((tipo) => !tiposNames.includes(tipo));
    tiposNames = [...tiposNames, ...newNames];
  });
  return tiposNames;
};

/** @type {(attacks: Attack[]) => Clasificacion} */
const getComponentesClassification = (attacks) => {
  const componentesNames = getAllNamesForComponentes(attacks);

  /** @type {Record<string, number[]>} */
  const attackIdsByComponenteName = {};
  componentesNames.forEach((componenteName) => {
    attackIdsByComponenteName[componenteName] = attacks
      .filter((attack) => attack.componente.includes(componenteName))
      .map((attack) => attack.id);
  });
  /** @type {Clasificacion} */
  const componentes = {
    byName: attackIdsByComponenteName,
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
 * @param {string} attacksFileLocation
 * @returns {Attack[]}
 */
const getAttacksFromTsvLocation = (attacksFileLocation) => {
  const resp = fs.readFileSync(attacksFileLocation, "utf8");
  const tsvRows = removeHeaderAndSanitizeRowsFromTSVResponse(resp);
  const attacks = tsvRows
    .map(tsvRowToAttack)
    .filter((attack) => attack !== null);
  return attacks;
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
 * @param {string | undefined} attacksFileLocation
 * @returns {Promise<AttacksData | null>}
 */
const parseTSVToJSON = async (
  attacksFileLocation = "services/data/sheet.tsv",
  colorsByAttackTypeFileLocation = "services/data/colors-by-type.tsv",
) => {
  const attacks = getAttacksFromTsvLocation(attacksFileLocation);
  const componentes = getComponentesClassification(attacks);
  const colorsByType = getColorsByAttackTypeFromTsvLocation(
    colorsByAttackTypeFileLocation,
  );

  const allDates = attacks.map((a) => a.date);
  // sorts in-place, so it mutates allDates!
  allDates.sort();
  const min = allDates[0];
  const max = allDates[allDates.length - 1];

  if (min === undefined || max === undefined) return null;

  return {
    attacks: attacks,
    componentes,
    min,
    max,
    componentNames: getAllNamesForComponentes(attacks),
    tiposNames: getAllNamesForTipos(attacks),
    colorByAttackType: colorsByType,
  };
};

module.exports = {
  parseTSVToJSON,
};
