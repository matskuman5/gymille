import express from 'express';
import cors from 'cors';
import { logger, logRequests } from './utils/logging';
import pingRouter from './routers/ping';
import sessionRouter from './routers/session';
import { NODE_ENV, PORT } from './utils/config';
import sessionTemplateRouter from './routers/session-templates';
import {
  connectToPostgres,
  connectToRedis,
  sessionMiddleware,
} from './utils/db';
import { addDummySessions } from './tests/dummy';
import models from './models';
import userRouter from './routers/users';
import loginRouter from './routers/login';
import logoutRouter from './routers/logout';

const app = express();
app.use(express.json());

if (NODE_ENV === 'development') {
  app.use(
    cors({
      origin: 'http://localhost:5173',
      credentials: true,
    })
  );
}

app.use(logRequests);
app.use(sessionMiddleware);

app.use('/ping', pingRouter);
app.use('/api/sessions', sessionRouter);
app.use('/api/session-templates', sessionTemplateRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);
app.use('/api/logout', logoutRouter);

app.listen(PORT, async () => {
  logger.info(`Starting server in mode: ${NODE_ENV}`);
  await connectToPostgres();
  await models.setupModels();
  await addDummySessions();
  await connectToRedis();
  logger.info(`Startup finished, server listening on port ${PORT}`);
});
