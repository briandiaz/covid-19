import { Injectable, NotFoundException } from '@nestjs/common';
import { v1 as uuid } from 'uuid';
import { Case, Gender } from './case.model';
import { CreateCaseDTO } from './dtos/create-case.dto';
import { UpdateCaseDTO } from './dtos/update-case.dto';

@Injectable()
export class CasesService {
    private cases: Case[] = [];

    private findCaseById = (id): Case => this.cases.find((c) => c.id === id);

    getAllCases(): Case[] {
        return this.cases;
    }

    async createCase(createCaseDTO: CreateCaseDTO): Promise<Case> {
        let { gender, died } = createCaseDTO;

        if (!gender) gender = Gender.NA;

        if (!died) died = false;

        const __case: Case = {
            ...createCaseDTO,
            id: uuid(),
            gender,
            died,
        };

        this.cases.push(__case);

        return Promise.resolve(__case);
    }

    async getCaseById(id: string): Promise<Case> {
        const __case: Case = this.findCaseById(id);
        if (!__case) {
            throw new NotFoundException(`Case with id: '${id}' is not found.`);
        }

        return Promise.resolve(__case);
    }

    async updateCase(id: string, updateCaseDTO: UpdateCaseDTO): Promise<Case> {
        const __case: Case = await this.getCaseById(id);

        const caseIndex = this.cases.indexOf(__case);
        const updatedCase: Case = {
            ...__case,
            ...updateCaseDTO,
        };
        this.cases[caseIndex] = updatedCase;

        return Promise.resolve(updatedCase);
    }
}
