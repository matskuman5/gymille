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

  describe('POST /users', () => {
    it('returns 201 to valid users', async () => {
      await api.post('/api/users').send(validUser).expect(201);
    });
    it('refuses to create malformed users', async () => {
      await api.post('/api/users').send(invalidUser).expect(400);
    });
    it('returns error if username already exists', async () => {
      await api.post('/api/users').send(validUser).expect(400);
    });
  });

  afterAll(async () => {
    sequelize.close();
  });
});
