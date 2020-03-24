import { Module } from '@nestjs/common';
import { CasesModule } from './cases/cases.module';

@Module({
  imports: [CasesModule],
})
export class AppModule {}
