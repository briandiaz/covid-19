import { Module } from '@nestjs/common';
import { CasesModule } from './cases/cases.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './config/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    CasesModule
  ],
})
export class AppModule { }
