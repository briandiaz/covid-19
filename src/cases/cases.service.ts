import { Injectable } from '@nestjs/common';
import { Case } from './case.model';

@Injectable()
export class CasesService {
    private cases: Case[] = [];

    getAllCases(): Case[] {
        return this.cases;
    }
}
