import { Router } from 'express';
import models from '../models';
import { v4 as uuidv4 } from 'uuid';
import { isSession } from '../types';
import logger from '../utils/logging';

const sessionRouter = Router();

sessionRouter.get('/', async (_req, res) => {
  try {
    const sessions = await models.Session.findAll();
    res.json(sessions);
  } catch (error) {
    res.status(400).json({ error });
  }
});

sessionRouter.post('/', async (req, res) => {
  try {
    const session = {
      ...req.body,
      id: uuidv4(),
    };

    if (!isSession(session)) {
      console.log(session);
      throw new Error('Session validation failed');
    }

    await models.Session.create({
      id: session.id,
      date: session.date,
      name: session.name,
    });

    const exercises = session.exercises.map((exercise) => ({
      ...exercise,
      sessionId: session.id,
    }));

    await models.Exercise.bulkCreate(exercises);

    res.status(201);
  } catch (error) {
    logger.error(error);
    res.status(400).json({ error });
  }
});

export default sessionRouter;
