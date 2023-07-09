import { SequelizeStorage, Umzug } from 'umzug';
import { logger } from './logging';
import { sequelize } from './db';

export const migrator = new Umzug({
  migrations: { glob: 'sequelize/migrations/*.ts' },
  logger: logger,
  storage: new SequelizeStorage({
    sequelize,
    modelName: 'migration_meta',
  }),
  context: sequelize,
});

export type Migration = typeof migrator._types.migration;

export const seeder = new Umzug({
  migrations: { glob: 'sequelize/seeders/*.ts' },
  logger: logger,
  storage: new SequelizeStorage({
    sequelize,
    modelName: 'seeder_meta',
  }),
  context: sequelize,
});

export type Seeder = typeof seeder._types.migration;
