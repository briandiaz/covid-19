import { Repository, EntityRepository } from "typeorm";
import { CaseEntity } from "./cases.entity";

@EntityRepository(CaseEntity)
export class CaseRepository extends Repository<CaseEntity> {
    
}