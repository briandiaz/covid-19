import { Injectable } from '@nestjs/common';
import { v1 as uuid } from 'uuid';
import { Case, Gender } from './case.model';
import { CreateCaseDTO } from './dtos/create-case.dto';

@Injectable()
export class CasesService {
    private cases: Case[] = [];

    getAllCases(): Case[] {
        return this.cases;
    }

    async createCase(createCaseDTO: CreateCaseDTO): Promise<Case> {
        let { gender, died } = createCaseDTO;

        if (!gender) gender = Gender.NA;

        if (!died) died = false;

        const _case: Case = {
            id: uuid(),
            ...createCaseDTO,
            gender,
            died,
        };

        this.cases.push(_case);

        return Promise.resolve(_case);
    }

    async getCaseById(id: string): Promise<Case> {
        const _case: Case = this.cases.find((c) => c.id === id);

        return Promise.resolve(_case);
    }
}
