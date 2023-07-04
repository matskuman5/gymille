import { Router } from 'express';
import { addUser } from '../services/users';
import { bunyanLogger } from '../utils/logging';

const userRouter = Router();

userRouter.post('/', async (req, res) => {
  try {
    const response = await addUser(req.body);
    res.status(201).json(response);
  } catch (error) {
    bunyanLogger.error(error);
    res.status(400).json({ error });
  }
});

export default userRouter;
