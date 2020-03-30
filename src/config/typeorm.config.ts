require('dotenv/config');
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const { DB_PORT, DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME } = process.env;

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: DB_HOST,
  port: parseInt(DB_PORT, 10) || 5432,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  subscribers: [__dirname + '/../**.module/*-subscriber.{js,ts}'],
  migrations: [__dirname + '/../migrations/*.{js,ts}'],
  synchronize: true,
};
