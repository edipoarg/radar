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
    tipoId: separateBySemicolon(tsvTypeIds),
    tipo: separateBySemicolon(tsvTypeDescription),
    componenteId: separateBySemicolon(tsvComponentIds),
    componente: separateBySemicolon(tsvComponentDescriptions),
  };
};

/** @type {(cases: Case[]) => string[]} */
const getAllIdsForTipos = (cases) => {
  /** @type {string[]} */
  let tiposIds = [];
  cases.forEach((eachCase) => {
    const newIds = eachCase.tipoId.filter((tipo) => !tiposIds.includes(tipo));
    tiposIds = [...tiposIds, ...newIds];
  });
  return tiposIds;
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
const getTiposClassification = (cases) => {
  const tiposIds = getAllIdsForTipos(cases);
  const tiposNames = getAllNamesForTipos(cases);

  /** @type {Record<string, number[]>} */
  const caseIdsByTipoIds = {};
  tiposIds.forEach((tipoId) => {
    caseIdsByTipoIds[tipoId] = cases
      .filter((eachCase) => eachCase.tipoId.includes(tipoId))
      .map((eachCase) => eachCase.id);
  });

  /** @type {Record<string, number[]>} */
  const caseIdsByTipoName = {};
  tiposNames.forEach((tipoName) => {
    caseIdsByTipoName[tipoName] = cases
      .filter((eachCase) => eachCase.tipo.includes(tipoName))
      .map((eachCase) => eachCase.id);
  });
  /** @type {Clasificacion} */
  const tipos = {
    byId: caseIdsByTipoIds,
    byName: caseIdsByTipoName,
  };
  return tipos;
};

/** @type {(cases: Case[]) => string[]} */
const getAllIdsForComponentes = (cases) => {
  /** @type {string[]} */
  let componentesIds = [];
  cases.forEach((eachCase) => {
    const newIds = eachCase.componenteId.filter(
      (componente) => !componentesIds.includes(componente),
    );
    componentesIds = [...componentesIds, ...newIds];
  });
  return componentesIds;
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

/** @type {(cases: Case[]) => Clasificacion} */
const getComponentesClassification = (cases) => {
  const componentesIds = getAllIdsForComponentes(cases);
  const componentesNames = getAllNamesForComponentes(cases);

  /** @type {Record<string, number[]>} */
  const caseIdsByComponenteIds = {};
  componentesIds.forEach((componenteId) => {
    caseIdsByComponenteIds[componenteId] = cases
      .filter((eachCase) => eachCase.componenteId.includes(componenteId))
      .map((eachCase) => eachCase.id);
  });

  /** @type {Record<string, number[]>} */
  const caseIdsByComponenteName = {};
  componentesNames.forEach((componenteName) => {
    caseIdsByComponenteName[componenteName] = cases
      .filter((eachCase) => eachCase.componente.includes(componenteName))
      .map((eachCase) => eachCase.id);
  });
  /** @type {Clasificacion} */
  const componentes = {
    byId: caseIdsByComponenteIds,
    byName: caseIdsByComponenteName,
  };
  return componentes;
};

/**
 * @param {string | undefined} fileLocation
 * @returns {Promise<AttacksData | null>}
 */
const parseTSVToJSON = async (fileLocation = "services/data/sheet.tsv") => {
  const resp = fs.readFileSync(fileLocation, "utf8");

  const [_tsvHeader, ...tsvRows] = resp.split("\r\n").map((r) => r.split("\t"));
  /** type {(Case)[]} */
  const cases = tsvRows
    .map(tsvRowToCase)
    .filter((eachCase) => eachCase !== null);

  const tipos = getTiposClassification(cases);
  const componentes = getComponentesClassification(cases);

  const allDates = cases.map((c) => c.date);
  // sorts in-place, so it mutates allDates!
  allDates.sort();
  const min = allDates[0];
  const max = allDates[allDates.length - 1];

  if (min === undefined || max === undefined) return null;

  return {
    cases,
    tipos,
    componentes,
    min,
    max,
  };
};

module.exports = {
  parseTSVToJSON,
};
