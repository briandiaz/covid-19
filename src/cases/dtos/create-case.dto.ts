import { Gender } from '../case.model';
import { IsBoolean, IsNotEmpty, IsInt, IsString, IsDecimal } from 'class-validator';

export class CreateCaseDTO {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    nationalId: string;

    @IsNotEmpty()
    @IsDecimal()
    latitude: number;

    @IsNotEmpty()
    @IsDecimal()
    longitude: number;

    @IsNotEmpty()
    @IsInt()
    infectionStage: number;

    @IsNotEmpty()
    @IsString()
    gender: Gender;

    @IsBoolean()
    recovered: boolean;

    @IsBoolean()
    died: boolean;
}
