import { Router } from 'express';
import { addUser } from '../services/users';
import { logger } from '../utils/logging';

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

export default userRouter;
