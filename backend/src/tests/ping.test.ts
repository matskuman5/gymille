import supertest from 'supertest';
import { app } from '../app';

const api = supertest(app);

test('ping endpoint returns correct data', async () => {
  const response = await api
    .get('/ping')
    .expect(200)
    .expect('Content-Type', /application\/json/);
  expect(response.body).toHaveProperty('message');
  expect(response.body.message).toBe('OK');
});
