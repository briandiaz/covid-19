import { Gender, Status } from '../case.enum';

export class UpdateCaseDTO {
  name?: string;
  nationalId?: string;
  latitude?: number;
  longitude?: number;
  infectionStage?: number;
  gender?: Gender;
  status?: Status;
}
