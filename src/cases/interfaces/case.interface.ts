import { Gender, Status } from "../case.enum";

export interface CaseRO {
  id: string;
  name: string;
  nationalId: string;
  latitude: number;
  longitude: number;
  infectionStage: number;
  gender: Gender;
  status: Status;
  createdAt?: Date;
  updatedAt?: Date;
}
