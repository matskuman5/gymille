import { Router } from 'express';
import { addUser } from '../services/users';
import { logger } from '../utils/logging';
import { addSession, getUserSessions } from '../services/sessions';

const userRouter = Router();

userRouter.post('/', async (req, res) => {
  try {
    const response = await addUser(req.body);
    res.status(201).json(response);
  } catch (error) {
    logger.error(error);
    res.status(400).json({ error });
  }
});

userRouter.get('/', async (req, res) => {
  try {
    console.log(req.session);
    res.status(200).send({
      username: req.session.username,
      userId: req.session.userId,
    });
  } catch (error) {
    logger.error(error);
    res.status(400).json({ error });
  }
});

userRouter.post('/:id/sessions', async (req, res) => {
  try {
    const response = await addSession({
      ...req.body,
      userId: req.params.id,
    });
    res.status(201).json(response);
  } catch (error) {
    logger.error(error);
    res.status(400).json({ error });
  }
});

userRouter.get('/:id/sessions', async (req, res) => {
  try {
    const sessions = await getUserSessions(req.params.id);
    res.json(sessions);
  } catch (error) {
    logger.error(error);
    res.status(400).json({ error });
  }
});

export default userRouter;
