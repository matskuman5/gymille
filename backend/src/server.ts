import express from 'express';
import cors from 'cors';
import logger from './utils/logging';
import pingRouter from './routers/ping';
import sessionRouter from './routers/session';
import { PORT, DATABASE_URL } from './config';
import sessionTemplateRouter from './routers/session-templates';
import { Sequelize } from 'sequelize';

const app = express();
app.use(express.json());
app.use(cors());

app.use((req, _res, next) => {
  const { method, originalUrl } = req;
  logger.info(method, originalUrl);
  next();
});

app.use('/ping', pingRouter);
app.use('/api/sessions', sessionRouter);
app.use('/api/session-templates', sessionTemplateRouter);

const sequelize = new Sequelize(DATABASE_URL);

const connectToDB = async () => {
  try {
    await sequelize.authenticate();
    logger.info('Connected to database successfully');
    sequelize.close();
  } catch (error) {
    logger.error(error);
  }
};

connectToDB();

app.listen(PORT, () => {
  logger.info(`Server listening on port ${PORT}`);
});
