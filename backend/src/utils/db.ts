import { Sequelize } from 'sequelize';
import { DATABASE_URL } from './config';
import { logger } from './logging';
import { createClient } from 'redis';

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
