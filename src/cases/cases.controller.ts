import { Controller, Get, Post, Body, Param, Patch, UsePipes, ValidationPipe, Query, UseGuards, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CasesService } from './cases.service';
import { CreateCaseDTO } from './dtos/create-case.dto';
import { UpdateCaseDTO } from './dtos/update-case.dto';
import { CaseValidationPipe } from './pipes/case.validation';
import { GetCaseFilterDTO } from './dtos/get-case-filter.dto';
import { ParseCasesFilterPipe } from './pipes/parse-cases-filter.pipe';
import { CaseEntity } from './cases.entity';
import { GetUser } from '../authentication/decorators/get-user.decorator';
import { UserEntity } from '../authentication/user.entity';
import { CaseRO } from './interfaces/case.interface';

@Controller('cases')
export class CasesController {
  private logger = new Logger('CasesController');

  constructor(private casesService: CasesService) { }

  @Get()
  async getCases(@Query(ParseCasesFilterPipe, ValidationPipe) getCaseFilterDTO: GetCaseFilterDTO): Promise<CaseEntity[]> {
    this.logger.verbose(`Retrieving cases with filter: ${JSON.stringify(getCaseFilterDTO)}`);
    return await this.casesService.getCases(getCaseFilterDTO);
  }

  @Get('/:id')
  async getCaseById(@Param('id') id: string): Promise<CaseEntity> {
    this.logger.verbose(`Retrieving case with id: ${id}`);
    return await this.casesService.getCaseById(id);
  }

  @Post()
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  async createCase(
    @Body(CaseValidationPipe) createCaseDTO: CreateCaseDTO,
    @GetUser() user: UserEntity,
  ): Promise<CaseRO> {
    this.logger.verbose(`User '${user.username}' creating case with params: ${JSON.stringify(createCaseDTO)}`);
    return await this.casesService.createCase(createCaseDTO, user);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  async updateCase(
    @Param('id') id: string,
    @Body(CaseValidationPipe) updateCaseDTO: UpdateCaseDTO,
    @GetUser() user: UserEntity,
  ): Promise<CaseRO> {
    this.logger.verbose(`User '${user.username}' updating case '${id}' with params: ${JSON.stringify(updateCaseDTO)}`);
    return await this.casesService.updateCase(id, updateCaseDTO);
  }
}
