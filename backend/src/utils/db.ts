import { Sequelize } from 'sequelize';
import { DATABASE_URL } from './config';
import { bunyanLogger } from './logging';

export const sequelize = new Sequelize(DATABASE_URL, {
  logging: false,
});

export const connectToDB = async () => {
  try {
    await sequelize.authenticate();
    bunyanLogger.info('Connected to database successfully');
  } catch (error) {
    bunyanLogger.error(error);
  }
};
