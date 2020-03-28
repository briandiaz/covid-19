import { Module } from '@nestjs/common';
import { CasesController } from './cases.controller';
import { CasesService } from './cases.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaseRepository } from './case.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CaseRepository,
    ]),
  ],
  controllers: [CasesController],
  providers: [CasesService],
})
export class CasesModule {}
