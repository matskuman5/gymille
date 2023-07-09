import {
  connectToPostgres,
  connectToRedis,
  redisClient,
  sequelize,
} from '../../utils/db';

describe('databases', () => {
  test('connects to Postgres', async () => {
    await expect(connectToPostgres()).resolves.not.toThrow();
  });
  test('connects to Redis', async () => {
    await expect(connectToRedis()).resolves.not.toThrow();
  });
});

afterAll(() => {
  sequelize.close();
  redisClient.quit();
});
