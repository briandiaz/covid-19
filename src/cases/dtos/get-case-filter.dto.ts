import { Gender } from '../case.model';
import { IsBoolean, IsInt, IsString, IsLatitude, IsLongitude } from 'class-validator';

export class GetCaseFilterDTO {
    @IsLatitude()
    latitude?: number;

    @IsLongitude()
    longitude?: number;

    @IsInt()
    infectionStage?: number;

    @IsString()
    gender?: Gender;

    @IsBoolean()
    recovered?: boolean;

    @IsBoolean()
    died?: boolean;
}
