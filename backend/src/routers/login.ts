import { Router } from 'express';
import { logger } from '../utils/logging';
import { validateLoginAndReturnId } from '../services/login';

const loginRouter = Router();

loginRouter.post('/', async (req, res) => {
  try {
    const userId = await validateLoginAndReturnId(req.body);
    req.session.userId = userId;
    req.session.username = req.body.username;
    res.status(200).send();
  } catch (error) {
    logger.error(error);
    res.status(400).json({ error });
  }
});

export default loginRouter;
