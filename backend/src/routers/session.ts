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
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error });
  }
});

sessionRouter.post('/', async (req, res) => {
  try {
    const response = await addSession(req.body);
    res.status(201).json(response);
  } catch (error) {
    logger.error(error);
    res.status(400).json({ error });
  }
});

sessionRouter.delete('/:id', async (req, res) => {
  try {
    const response = await deleteSession(req.params.id);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error });
  }
});

export default sessionRouter;
