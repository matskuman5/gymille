import { Sequelize } from 'sequelize';
import { DATABASE_URL, REDIS_SECRET } from './config';
import { logger } from './logging';
import { createClient } from 'redis';
import session from 'express-session';
import RedisStore from 'connect-redis';

export const sequelize = new Sequelize(DATABASE_URL, {
  logging: false,
});

export const connectToPostgres = async () => {
  try {
    await sequelize.authenticate();
    logger.info('Connected to Postgres successfully');
  } catch (error) {
    logger.error(error);
  }
};

const redisClient = createClient();

export const connectToRedis = async () => {
  try {
    await redisClient.connect();
    logger.info('Connected to Redis successfully');
  } catch (error) {
    logger.error(error);
  }
};

export const sessionMiddleware = session({
  secret: REDIS_SECRET,
  resave: false,
  saveUninitialized: false,
  store: new RedisStore({
    client: redisClient,
  }),
});
