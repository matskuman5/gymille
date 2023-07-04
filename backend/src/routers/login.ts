import { Router } from 'express';
import logger from '../utils/logging';
import { addUser } from '../services/users';

const loginRouter = Router();

loginRouter.post('/', async (req, res) => {
  try {
    const token = await addUser(req.body);
    res.status(200).json(token);
  } catch (error) {
    logger.error(error);
    res.status(400).json({ error });
  }
});

export default loginRouter;
