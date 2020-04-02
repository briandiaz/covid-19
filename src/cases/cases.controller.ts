import { Controller, Get, Post, Body, Param, Patch, UsePipes, ValidationPipe, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CasesService } from './cases.service';
import { CreateCaseDTO } from './dtos/create-case.dto';
import { UpdateCaseDTO } from './dtos/update-case.dto';
import { CaseValidationPipe } from './pipes/case.validation';
import { GetCaseFilterDTO } from './dtos/get-case-filter.dto';
import { ParseCasesFilterPipe } from './pipes/parse-cases-filter.pipe';
import { CaseEntity } from './cases.entity';

@Controller('cases')
export class CasesController {
  constructor(private casesService: CasesService) { }

  @Get()
  async getCases(@Query(ParseCasesFilterPipe, ValidationPipe) getCaseFilterDTO: GetCaseFilterDTO): Promise<CaseEntity[]> {
    return await this.casesService.getCases(getCaseFilterDTO);
  }

  @Get('/:id')
  async getCaseById(@Param('id') id: string): Promise<CaseEntity> {
    return await this.casesService.getCaseById(id);
  }

  @Post()
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  async createCase(@Body(CaseValidationPipe) createCaseDTO: CreateCaseDTO): Promise<CaseEntity> {
    return await this.casesService.createCase(createCaseDTO);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  async updateCase(@Param('id') id: string, @Body(CaseValidationPipe) updateCaseDTO: UpdateCaseDTO): Promise<CaseEntity> {
    return await this.casesService.updateCase(id, updateCaseDTO);
  }
}
