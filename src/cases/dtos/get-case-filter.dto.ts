import { IsInt, IsString, IsLatitude, IsLongitude, IsOptional, IsIn } from 'class-validator';
import { Gender, Status } from '../case.enum';

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

  @IsString()
  @IsOptional()
  @IsIn([Status.ACTIVE, Status.RECOVERED, Status.DEAD])
  status?: string;
}
