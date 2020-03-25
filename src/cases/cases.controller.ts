import { Controller, Get } from '@nestjs/common';
import { CasesService } from './cases.service';
import { Case } from './case.model';

@Controller('cases')
export class CasesController {
    constructor(private casesService: CasesService) {}

    @Get()
    getAllCases(): Case[]  {
        return this.casesService.getAllCases();
    }

}
