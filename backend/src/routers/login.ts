import { Router } from 'express';
import { logger } from '../utils/logging';
import { login } from '../services/login';

const loginRouter = Router();

loginRouter.post('/', async (req, res) => {
  try {
    await login(req.body);
    req.session.username = req.body.username;
    res.status(200);
  } catch (error) {
    logger.error(error);
    res.status(400).json({ error });
  }
});

export default loginRouter;
