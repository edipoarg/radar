export type CaseTipoId = "t1" | "t2" | "t3";

const caseTipoIdsAsObject: Record<CaseTipoId, CaseTipoId> = {
  t1: "t1",
  t2: "t2",
  t3: "t3",
};

export const isCaseTipoId = (s: string): s is CaseTipoId =>
  Object.keys(caseTipoIdsAsObject).includes(s);
