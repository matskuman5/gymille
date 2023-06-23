import { Router } from 'express';
import models from '../models';
import { v4 as uuidv4 } from 'uuid';
import { isSession } from '../types';
import logger from '../utils/logging';

const sessionRouter = Router();

sessionRouter.get('/', async (_req, res) => {
  try {
    const sessions = await models.SessionModel.findAll({
      raw: true,
    });

    let response = [];

    for (const session of sessions) {
      if (session.id !== null) {
        const sessionExercises = await models.ExerciseModel.findAll({
          raw: true,
          where: { sessionId: session.id },
        });
        response.push({
          ...session,
          exercises: sessionExercises,
        });
      }
    }
    res.json(response);
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

    if (session.name) {
      await models.SessionModel.create({
        id: session.id,
        date: session.date,
        name: session.name,
      });
    } else {
      await models.SessionModel.create({
        id: session.id,
        date: session.date,
      });
    }

    const exercises = session.exercises.map((exercise) => ({
      ...exercise,
      id: uuidv4(),
      sessionId: session.id,
    }));

    await models.ExerciseModel.bulkCreate(exercises);

    res.status(201);
  } catch (error) {
    logger.error(error);
    res.status(400).json({ error });
  }
});

export default sessionRouter;
