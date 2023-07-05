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
    res.status(200).send(req.session.username);
  } catch (error) {
    logger.error(error);
    res.status(400).json({ error });
  }
});

userRouter.post('/:username/sessions', async (req, res) => {
  try {
    const response = await addSession({
      ...req.body,
      username: req.params.username,
    });
    res.status(201).json(response);
  } catch (error) {
    logger.error(error);
    res.status(400).json({ error });
  }
});

userRouter.get('/:username/sessions', async (req, res) => {
  try {
    const sessions = await getUserSessions(req.params.username);
    res.json(sessions);
  } catch (error) {
    logger.error(error);
    res.status(400).json({ error });
  }
});

export default userRouter;
