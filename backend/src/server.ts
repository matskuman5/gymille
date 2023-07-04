import express from 'express';
import cors from 'cors';
import logger from './utils/logging';
import pingRouter from './routers/ping';
import sessionRouter from './routers/session';
import { PORT } from './utils/config';
import sessionTemplateRouter from './routers/session-templates';
import { connectToDB } from './utils/db';
import { addDummySessions } from './test/dummy';
import models from './models';
import userRouter from './routers/users';

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
app.use('/api/users', userRouter);

app.listen(PORT, async () => {
  logger.info(
    `Starting server in mode: ${process.env.NODE_ENV || 'development'}`
  );
  await connectToDB();
  await models.setupModels();
  await addDummySessions();
  logger.info(`Startup finished, server listening on port ${PORT}`);
});
