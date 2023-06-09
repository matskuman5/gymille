import express from 'express';
import cors from 'cors';
import { Session } from './types';
import logger from './utils/logging';

import dummySessions from './test/dummy-sessions.json';

const app = express();
app.use(express.json());
app.use(cors());

app.use((req, _res, next) => {
  const { method, originalUrl } = req;
  logger.info(method, originalUrl);
  next();
});

const PORT = 3000;

let sessions: Session[] = dummySessions;

app.get('/', (_req, res) => {
  res.send('hi');
});

app.get('/api/sessions', (_req, res) => {
  res.send(sessions);
});

app.post('/api/sessions', (req, res) => {
  sessions.push(req.body);
  res.send('workout added successfully');
});

app.listen(PORT, () => {
  logger.info(`Server listening on port ${3000}`);
});
