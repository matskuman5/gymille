import { Router } from 'express';
import { logger } from '../utils/logging';

const logoutRouter = Router();

logoutRouter.post('/', async (req, res) => {
  try {
    req.session.destroy(() => {
      res.status(200).send();
    });
  } catch (error) {
    logger.error(error);
    res.status(400).json({ error });
  }
});

export default logoutRouter;
