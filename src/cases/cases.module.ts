import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CasesController } from './cases.controller';
import { CasesService } from './cases.service';
import { CaseRepository } from './case.repository';
import { AuthenticationModule } from 'src/authentication/authentication.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CaseRepository,
    ]),
    AuthenticationModule,
  ],
  controllers: [CasesController],
  providers: [CasesService],
})
export class CasesModule {}
