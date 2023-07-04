export const PORT = process.env.PORT || 3000;

export const NODE_ENV = process.env.NODE_ENV || 'development';

export const DATABASE_URL =
  process.env.DATABASE_URL ||
  'postgres://postgres:test@localhost:5432/postgres';

export const REDIS_SECRET = process.env.REDIS_SECRET || 'test';
