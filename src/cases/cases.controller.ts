import { Controller, Get, Post, Body, Param, Patch, UsePipes, ValidationPipe, Query } from '@nestjs/common';
import { CasesService } from './cases.service';
import { Case } from './case.model';
import { CreateCaseDTO } from './dtos/create-case.dto';
import { UpdateCaseDTO } from './dtos/update-case.dto';
import { GenderValidationPipe } from './pipes/cases-gender.validation';
import { GetCaseFilterDTO } from './dtos/get-case-filter.dto';
import { ParseCasesFilterPipe } from './pipes/parse-cases-filter.pipe';

@Controller('cases')
export class CasesController {
    constructor(private casesService: CasesService) {}

    @Get()
    async getAllCases(@Query('', ParseCasesFilterPipe) getCaseFilterDTO: GetCaseFilterDTO): Promise<Case[]> {
        if (Object.keys(getCaseFilterDTO).length) {
            return await this.casesService.getCasesFiltered(getCaseFilterDTO);
        }
        return await this.casesService.getAllCases();
    }

    @Post()
    @UsePipes(ValidationPipe)
    async createCase(@Body('', GenderValidationPipe) createCaseDTO: CreateCaseDTO): Promise<Case> {
        return await this.casesService.createCase(createCaseDTO);
    }

    @Get('/:id')
    async getCaseById(@Param('id') id: string): Promise<Case> {
        return await this.casesService.getCaseById(id);
    }

    @Patch('/:id')
    async updateCase(@Param('id') id: string, @Body('', GenderValidationPipe) updateCaseDTO: UpdateCaseDTO): Promise<Case> {
        return await this.casesService.updateCase(id, updateCaseDTO);
    }
}
