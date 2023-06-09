import { Router } from 'express';
import dummySessions from '../test/dummy-sessions.json';
import { Session } from '../types';

const sessionRouter = Router();

let sessions: Session[] = dummySessions;

sessionRouter.get('/', (_req, res) => {
  res.send(sessions);
});

sessionRouter.post('/', (req, res) => {
  sessions.push(req.body);
  res.send('session added successfully');
});

export default sessionRouter;
