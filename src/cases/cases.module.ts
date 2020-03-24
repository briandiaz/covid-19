import { Module } from '@nestjs/common';
import { CasesController } from './cases.controller';

@Module({
  controllers: [CasesController],
})
export class CasesModule {}
