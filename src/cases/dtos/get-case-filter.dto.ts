import { Gender } from '../case.model';
import { IsBoolean, IsInt, IsString, IsLatitude, IsLongitude, IsOptional, IsIn } from 'class-validator';

export class GetCaseFilterDTO {
  @IsOptional()
  @IsLatitude()
  latitude?: number;

  @IsOptional()
  @IsLongitude()
  longitude?: number;

  @IsOptional()
  @IsInt()
  infectionStage?: number;

  @IsString()
  @IsOptional()
  @IsIn([Gender.MALE, Gender.FEMALE, Gender.NA])
  gender?: string;

  @IsOptional()
  @IsBoolean()
  recovered?: boolean;

  @IsOptional()
  @IsBoolean()
  died?: boolean;
}
