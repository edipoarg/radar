export type Attack = {
  id: number;
  title: string;
  date: number;
  source: string;
  coords: {
    latitude: number;
    longitude: number;
  };
  provincia: string;
  tipo: string[];
  componente: string[];
};

export type Clasificacion = {
  byName: Record<string, number[]>;
};

export type AttacksData = {
  attacks: Attack[];
  componentes: Clasificacion;
  min: number;
  max: number;
  componentNames: string[];
  tiposNames: string[];
  colorByAttackType: Record<string, string>;
};
