export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  NA = 'n/a',
};

export interface Case {
  id: string,
  name: string,
  nationalId: string,
  latitude: number,
  longitude: number,
  infectionStage: number,
  gender: Gender,
  recovered: boolean,
  died: boolean,
};
