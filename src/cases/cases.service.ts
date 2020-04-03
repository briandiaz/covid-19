import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCaseDTO } from './dtos/create-case.dto';
import { UpdateCaseDTO } from './dtos/update-case.dto';
import { GetCaseFilterDTO } from './dtos/get-case-filter.dto';
import { CaseRepository } from './case.repository';
import { CaseEntity } from './cases.entity';
import { UserEntity } from '../authentication/user.entity';
import { CaseRO } from './interfaces/case.interface';

@Injectable()
export class CasesService {
  constructor(
    @InjectRepository(CaseRepository)
    private caseRepository: CaseRepository
  ) { }

  async getCases(getCaseFilterDTO: GetCaseFilterDTO = {}): Promise<CaseEntity[]> {
    if (Object.keys(getCaseFilterDTO).length) {
      return this.caseRepository.find({ where: getCaseFilterDTO });
    }
    return this.caseRepository.find();
  }

  async getCaseById(id: string): Promise<CaseEntity> {
    const __case: CaseEntity = await this.caseRepository.findOne(id);
    if (!__case) {
      throw new NotFoundException(`Case with id '${id}' was not found.`);
    }

    return __case;
  }

  async createCase(
    createCaseDTO: CreateCaseDTO,
    user: UserEntity
  ): Promise<CaseRO> {
    return await this.caseRepository.createCase(createCaseDTO, user);
  }

  async updateCase(
    id: string,
    updateCaseDTO: UpdateCaseDTO,
  ): Promise<CaseRO> {
    const __case = await this.getCaseById(id);

    return await this.caseRepository.updateCase(__case, updateCaseDTO);
  }
}
