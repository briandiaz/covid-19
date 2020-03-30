import { IsNotEmpty, IsInt, IsString, IsLatitude, IsLongitude } from 'class-validator';
import { Status, Gender } from '../case.enum';

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

  @IsNotEmpty()
  @IsString()
  status: Status;
}
