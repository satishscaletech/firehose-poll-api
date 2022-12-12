import { Injectable } from '@nestjs/common';
import { SequelizeOptions } from 'sequelize-typescript';

@Injectable()
export class DatabasConfig {
  public readConfiguration(): SequelizeOptions {
    return {
      timezone: 'UTC',
      dialectOptions: {
        dateStrings: true,
        typeCast: true,
      },
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      password: process.env.DB_PASSWORD,
      username: process.env.DB_USER,
      database: process.env.DB_DATABASE,
    };
  }
}
