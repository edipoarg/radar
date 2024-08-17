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
  byName: Record<string, number[]>;
};

export type AttacksData = {
  cases: Case[];
  componentes: Clasificacion;
  min: number;
  max: number;
};
