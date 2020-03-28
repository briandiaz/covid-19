import { Gender } from '../case.model';
import { IsBoolean, IsNotEmpty, IsInt, IsString, IsLatitude, IsLongitude } from 'class-validator';

export class CreateCaseDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  nationalId: string;

  @IsNotEmpty()
  @IsLatitude()
  latitude: number;

  @IsNotEmpty()
  @IsLongitude()
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
