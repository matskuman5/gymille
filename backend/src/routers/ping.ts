import { Router } from 'express';
import { NODE_ENV } from '../utils/config';

const pingRouter = Router();

pingRouter.get('/', (_req, res) => {
  res.json({
    message: 'OK',
    nodeEnv: NODE_ENV,
    nodeVersion: process.version,
    uptimeSeconds: process.uptime(),
    timestamp: new Date(),
  });
});

export default pingRouter;
