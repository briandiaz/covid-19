import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CasesService } from './cases.service';
import { Case } from './case.model';
import { CreateCaseDTO } from './dtos/create-case.dto';

@Controller('cases')
export class CasesController {
    constructor(private casesService: CasesService) {}

    @Get()
    getAllCases(): Case[]  {
        return this.casesService.getAllCases();
    }

    @Post()
    async createCase(@Body() createCaseDTO: CreateCaseDTO): Promise<Case> {
        return await this.casesService.createCase(createCaseDTO);
    }

    @Get('/:id')
    async getCaseById(@Param('id') id: string): Promise<Case> {
        return await this.casesService.getCaseById(id);
    }
}
