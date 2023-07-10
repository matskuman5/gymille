import { SequelizeStorage, Umzug } from 'umzug';
import { logger } from './logging';
import { sequelize } from './db';
import { NODE_ENV } from './config';

const logIfInProd = NODE_ENV === 'production' ? logger : undefined;

export const migrator = new Umzug({
  migrations: { glob: 'src/migrations/*.ts' },
  logger: logIfInProd,
  storage: new SequelizeStorage({
    sequelize,
    modelName: 'migration_meta',
  }),
  context: sequelize,
});

export type Migration = typeof migrator._types.migration;

export const seeder = new Umzug({
  migrations: { glob: 'src/seeders/*.ts' },
  logger: logIfInProd,
  storage: new SequelizeStorage({
    sequelize,
    modelName: 'seeder_meta',
  }),
  context: sequelize,
});

export type Seeder = typeof seeder._types.migration;

export const resetMigrations = async () => {
  try {
    const executedAmount = (await migrator.executed()).length;
    const pendingAmount = (await migrator.pending()).length;
    logger.info('Migrations executed: ', executedAmount);
    logger.info('Migrations pending: ', pendingAmount);
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
