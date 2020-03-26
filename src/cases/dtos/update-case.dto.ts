import { Gender } from '../case.model';

export class UpdateCaseDTO {
    name?: string;
    national_id?: string;
    latitude?: number;
    longitude?: number;
    infection_stage?: number;
    gender?: Gender;
    recovered?: boolean;
    died?: boolean;
}
