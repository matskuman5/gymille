import { Router } from 'express';
import {
  addSession,
  deleteSession,
  getUserSessions,
} from '../services/sessions';

const userSessionsRouter = Router();

userSessionsRouter.post('/:id/sessions', async (req, res) => {
  const response = await addSession({
    ...req.body,
    userId: req.params.id,
  });
  res.status(201).json(response);
});

userSessionsRouter.get('/:id/sessions', async (req, res) => {
  const sessions = await getUserSessions(req.params.id);
  res.json(sessions);
});

userSessionsRouter.delete('/:userId/sessions/:sessionId', async (req, res) => {
  const response = await deleteSession(req.params.sessionId);
  res.json(response);
});

export default userSessionsRouter;
