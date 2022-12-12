import { Sequelize } from 'sequelize-typescript';
import { Option, Question, Vote } from 'src/models';
import { DatabasConfig } from './database.config';

export const databaseProviders = {
  provide: 'SEQUELIZE',
  useFactory: async (databaseConfig: DatabasConfig) => {
    const config = databaseConfig.readConfiguration();
    const sequelize = new Sequelize(config);
    sequelize.addModels([Question, Option, Vote]);
    return sequelize;
  },
  inject: [DatabasConfig],
};
