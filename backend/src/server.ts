import express from 'express';
import { Workout } from './types';

const app = express();
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

app.listen(PORT, () => {
  console.log(`Server listening on port ${3000}`);
});
