import express from 'express';
import cors from 'cors';
import { Workout } from './types';
import logger from './utils/logging';

const app = express();
app.use(express.json());
app.use(cors());

app.use((req, _res, next) => {
  const { method, originalUrl, ip } = req;
  logger.info({ method, originalUrl, ip });
  next();
});

const PORT = 3000;

let workouts: Workout[] = [
  { date: '2023-3-21', notes: 'felt like crap' },
  { date: '2023-3-29', notes: 'improving' },
  { date: '2023-4-1', notes: 'hurt my shoulder' },
];

app.get('/', (_req, res) => {
  res.send('hi');
});

app.get('/api/workouts', (_req, res) => {
  res.send(workouts);
});

app.post('/api/workouts', (req, res) => {
  workouts.push(req.body);
  res.send('workout added successfully');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${3000}`);
});
