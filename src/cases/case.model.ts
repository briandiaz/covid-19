export enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
    NA = 'n/a',   
};

export interface Case {
    id: number,
    name: string,
    national_id: string,
    latitude: number,
    longitude: number,
    infection_stage: number,
    gender: Gender,
    recovered: boolean,
    died: boolean,
};
