import { Repository, EntityRepository } from "typeorm";
import { CaseEntity } from "./cases.entity";
import { CreateCaseDTO } from "./dtos/create-case.dto";
import { UpdateCaseDTO } from "./dtos/update-case.dto";

@EntityRepository(CaseEntity)
export class CaseRepository extends Repository<CaseEntity> {
  async createCase(createCaseDTO: CreateCaseDTO): Promise<CaseEntity> {
    const __case = new CaseEntity();
    const { name, nationalId, latitude, longitude, infectionStage, gender, status } = createCaseDTO;

    __case.name = name;
    __case.nationalId = nationalId;
    __case.latitude = latitude;
    __case.longitude = longitude;
    __case.infectionStage = infectionStage;
    __case.gender = gender;
    __case.status = status;

    return await __case.save();
  }

  async updateCase(__case: CaseEntity, updateCaseDTO: UpdateCaseDTO): Promise<CaseEntity> {
    return await this.save({ ...__case, ...updateCaseDTO, });
  }    
}