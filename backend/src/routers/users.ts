import { Router } from 'express';
import logger from '../utils/logging';
import { addUser } from '../services/users';

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

export default userRouter;
