import express from 'express';
import cors from 'cors';
import { Session } from './types';
import logger from './utils/logging';

const app = express();
app.use(express.json());
app.use(cors());

app.use((req, _res, next) => {
  const { method, originalUrl } = req;
  logger.info(method, originalUrl);
  next();
});

const PORT = 3000;

let workouts: Session[] = [];

app.get('/', (_req, res) => {
  res.send('hi');
});

app.get('/api/sessions', (_req, res) => {
  res.send(workouts);
});

app.post('/api/sessions', (req, res) => {
  workouts.push(req.body);
  res.send('workout added successfully');
});

app.listen(PORT, () => {
  logger.info(`Server listening on port ${3000}`);
});
