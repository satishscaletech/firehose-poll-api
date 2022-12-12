import { Global, Module } from '@nestjs/common';
import { DatabasConfig } from './database.config';
import { databaseProviders } from './database.provider';

@Global()
@Module({
  providers: [DatabasConfig, databaseProviders],
  exports: [databaseProviders],
})
export class DatabaseModule {}
