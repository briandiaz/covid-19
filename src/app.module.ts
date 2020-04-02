import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CasesModule } from './cases/cases.module';
import { typeORMConfig } from './config/typeorm.config';
import { AuthenticationModule } from './authentication/authentication.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    CasesModule,
    AuthenticationModule
  ],
})
export class AppModule { }
