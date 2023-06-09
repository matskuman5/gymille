import express from 'express';
import cors from 'cors';
import logger from './utils/logging';
import pingRouter from './routers/ping';
import sessionRouter from './routers/session';
import PORT from './config';

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

app.listen(PORT, () => {
  logger.info(`Server listening on port ${PORT}`);
});
