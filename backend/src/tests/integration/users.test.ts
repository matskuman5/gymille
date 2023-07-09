import supertest from 'supertest';
import { app } from '../../app';
import { connectToPostgres, sequelize } from '../../utils/db';
import { resetMigrations, seedData } from '../../utils/umzug';

const api = supertest(app);

describe('User API', () => {
  beforeAll(async () => {
    await connectToPostgres();
    await resetMigrations();
    await seedData();
  });

  const validUser = {
    username: 'iloveworkingout',
    password: 'creatine5050',
  };

  const invalidUser = { malformed1: false, malformed2: 5 };

  const userWithoutPassword = { username: 'testguy1', password: '' };

  describe('POST /users', () => {
    it('returns 201 to valid user', async () => {
      await api.post('/api/users').send(validUser).expect(201);
    });
    it('returns 400 with correct message to malformed user', async () => {
      const response = await api
        .post('/api/users')
        .send(invalidUser)
        .expect(400);
      expect(response.body.error).toBe('User validation failed');
    });
    it('returns 400 with correct message to user missing password', async () => {
      const response = await api
        .post('/api/users')
        .send(userWithoutPassword)
        .expect(400);
      expect(response.body.error).toBe('Username or password is null');
    });
    it('returns 409 if username already exists', async () => {
      const response = await api.post('/api/users').send(validUser).expect(409);
      expect(response.body.error).toBe(
        `Username '${validUser.username}' already used`
      );
    });
  });

  afterAll(async () => {
    sequelize.close();
  });
});
