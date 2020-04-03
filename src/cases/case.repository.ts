import { Repository, EntityRepository } from "typeorm";
import { CaseEntity } from "./cases.entity";
import { CreateCaseDTO } from "./dtos/create-case.dto";
import { UpdateCaseDTO } from "./dtos/update-case.dto";
import { UserEntity } from "../authentication/user.entity";
import { CaseRO } from "./interfaces/case.interface";

@EntityRepository(CaseEntity)
export class CaseRepository extends Repository<CaseEntity> {
  async createCase(
    createCaseDTO: CreateCaseDTO,
    user: UserEntity,
    ): Promise<CaseRO> {
    const __case = new CaseEntity();
    const { name, nationalId, latitude, longitude, infectionStage, gender, status } = createCaseDTO;

    __case.name = name;
    __case.nationalId = nationalId;
    __case.latitude = latitude;
    __case.longitude = longitude;
    __case.infectionStage = infectionStage;
    __case.gender = gender;
    __case.status = status;
    __case.createdBy = user;

    const savedCase = await __case.save();

    return this.generateCaseRO(savedCase);
  }

  async updateCase(__case: CaseEntity, updateCaseDTO: UpdateCaseDTO): Promise<CaseEntity> {
    return await this.save({ ...__case, ...updateCaseDTO, });
  }


  private generateCaseRO(__case: CaseEntity): CaseRO {
    delete __case.createdBy;
    return { ...__case };
  }
}