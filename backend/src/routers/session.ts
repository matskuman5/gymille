import { Router } from 'express';
import logger from '../utils/logging';
import {
  addSession,
  deleteSession,
  getAllSessions,
} from '../services/sessions';

const sessionRouter = Router();

sessionRouter.get('/', async (_req, res) => {
  try {
    const response = await getAllSessions();
    res.json(response);
  } catch (error) {
    res.status(400).json({ error });
  }
});

sessionRouter.post('/', async (req, res) => {
  try {
    await addSession(req.body);
    res.status(201);
  } catch (error) {
    logger.error(error);
    res.status(400).json({ error });
  }
});

sessionRouter.delete('/:id', async (req, res) => {
  try {
    await deleteSession(req.params.id);
    res.status(200);
  } catch (error) {
    res.status(400).json({ error });
  }
});

export default sessionRouter;
