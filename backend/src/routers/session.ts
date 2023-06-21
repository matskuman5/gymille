import { Router } from 'express';
import models from '../models';
import { v4 as uuidv4 } from 'uuid';

const sessionRouter = Router();

sessionRouter.get('/', async (_req, res) => {
  try {
    const sessions = await models.Session.findAll();
    res.json(sessions);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

sessionRouter.post('/', async (req, res) => {
  try {
    const session = await models.Session.create({
      ...req.body,
      id: uuidv4(),
    });
    res.json(session);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

export default sessionRouter;
