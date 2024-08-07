export type Case = {
  id: number;
  title: string;
  date: number;
  source: string;
  coords: {
    latitude: number;
    longitude: number;
  };
  provincia: string;
  tipoId: string[];
  tipo: string[];
  componenteId: string[];
  componente: string[];
};

export type Clasificacion = {
  byId: Record<string, number[]>;
  byName: Record<string, number[]>;
};

export type AttacksData = {
  cases: Case[];
  tipos: Clasificacion;
  componentes: Clasificacion;
  min: number;
  max: number;
};
