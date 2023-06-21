import { Sequelize } from 'sequelize';
import { DATABASE_URL } from '../config';
import logger from './logging';

export const sequelize = new Sequelize(DATABASE_URL);

export const connectToDB = async () => {
  try {
    await sequelize.authenticate();
    logger.info('Connected to database successfully');
    sequelize.close();
  } catch (error) {
    logger.error(error);
  }
};
