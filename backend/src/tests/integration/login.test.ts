import supertest from 'supertest';
import { app } from '../../app';
import { connectToPostgres, sequelize } from '../../utils/db';
import { resetMigrations, seedData } from '../../utils/umzug';

const api = supertest(app);

describe('Login API', () => {
  beforeAll(async () => {
    await connectToPostgres();
    await resetMigrations();
    await seedData();
  });

  const validCredentials = {
    username: 'GymBro1',
    password: 'password123',
  };

  const invalidCredentials = {
    username: 'GymBro1',
    password: 'password999',
  };

  const malformedUser = {
    malformed1: false,
    malformed2: 591585,
  };

  const userWithoutPassword = { username: 'GymBro1', password: '' };

  const nonExistingUser = {
    username: 'test409409',
    password: 'fma4um5oauj5',
  };

  describe('POST /login', () => {
    it('returns 200 to valid credentials', async () => {
      await api.post('/api/login').send(validCredentials).expect(200);
    });
    it('returns 400 with correct message to malformed user', async () => {
      const response = await api
        .post('/api/login')
        .send(malformedUser)
        .expect(400);
      expect(response.body.error).toBe('User validation failed');
    });
    it('returns 400 with correct message to user missing password', async () => {
      const response = await api
        .post('/api/login')
        .send(userWithoutPassword)
        .expect(400);
      expect(response.body.error).toBe('Username or password is null');
    });
    it('returns 404 with correct message if user not found', async () => {
      const response = await api
        .post('/api/login')
        .send(nonExistingUser)
        .expect(404);
      expect(response.body.error).toBe(
        `User '${nonExistingUser.username}' not found`
      );
    });
    it('returns 401 if password is incorrect', async () => {
      const response = await api
        .post('/api/login')
        .send(invalidCredentials)
        .expect(401);
      expect(response.body.error).toBe(`Incorrect password`);
    });
  });

  afterAll(async () => {
    sequelize.close();
  });
});
