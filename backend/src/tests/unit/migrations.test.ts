import { migrator, resetMigrations, seedData } from '../../utils/umzug';
import { connectToPostgres, sequelize } from '../../utils/db';

describe('migration', () => {
  beforeAll(async () => {
    await connectToPostgres();
  });

  test('correct number of executed and pending migrations', async () => {
    const executedAmount = (await migrator.executed()).length;
    const pendingAmount = (await migrator.pending()).length;
    await expect(executedAmount).toBe(0);
    await expect(pendingAmount).toBeGreaterThan(0);
  });

  test('runs migrations successfully', async () => {
    await expect(resetMigrations()).resolves.not.toThrow();
  });

  test('adds seed data successfully', async () => {
    await expect(seedData()).resolves.not.toThrow();
  });

  afterAll(() => {
    sequelize.close();
  });
});
