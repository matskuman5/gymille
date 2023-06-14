import { Router } from 'express';
import dummySessions from '../test/dummy-sessions.json';
import { Session } from '../types';
import { v4 as uuidv4 } from 'uuid';

const sessionRouter = Router();

let sessions: Session[] = dummySessions;

sessionRouter.get('/', (_req, res) => {
  res.send(sessions);
});

sessionRouter.post('/', (req, res) => {
  sessions.push({
    ...req.body,
    id: uuidv4(),
  });
  res.send('session added successfully');
});

export default sessionRouter;
