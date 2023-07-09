import { SequelizeStorage, Umzug } from 'umzug';
import { logger } from './logging';
import { sequelize } from './db';
import { NODE_ENV } from './config';

export const migrator = new Umzug({
  migrations: { glob: 'src/tests/migrations/*.ts' },
  logger: logger,
  storage: new SequelizeStorage({
    sequelize,
    modelName: 'migration_meta',
  }),
  context: sequelize,
});

export type Migration = typeof migrator._types.migration;

export const seeder = new Umzug({
  migrations: { glob: 'src/tests/seeders/*.ts' },
  logger: logger,
  storage: new SequelizeStorage({
    sequelize,
    modelName: 'seeder_meta',
  }),
  context: sequelize,
});

export type Seeder = typeof seeder._types.migration;

export const resetMigrations = async () => {
  try {
    // don't drop all tables in production...
    if (NODE_ENV !== 'production') {
      await migrator.down({ to: 0 });
    }
    await migrator.up();
    logger.info('Migrations completed successfully');
  } catch (error) {
    logger.error(`Error during migrations:`, error);
  }
};

export const seedData = async () => {
  try {
    await seeder.down({ to: 0 });
    await seeder.up();
    logger.info('Seed data added successfully');
  } catch (error) {
    logger.error(`Error adding seed data:`, error);
  }
};
