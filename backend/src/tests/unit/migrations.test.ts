import { resetMigrations, seedData } from '../../utils/umzug';
import { connectToPostgres, sequelize } from '../../utils/db';

describe('migration', () => {
  beforeAll(async () => {
    await connectToPostgres();
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
