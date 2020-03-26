import { Gender } from '../case.model';

export class CreateCaseDTO {
    name: string;
    nationalId: string;
    latitude: number;
    longitude: number;
    infectionStage: number;
    gender: Gender;
    recovered: boolean;
    died: boolean;
}
