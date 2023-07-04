export const PORT = process.env.PORT || 3000;

export const DATABASE_URL =
  process.env.DATABASE_URL ||
  'postgres://postgres:test@localhost:5432/postgres';

export const JWT_SECRET = process.env.JWT_SECRET || 'test';
