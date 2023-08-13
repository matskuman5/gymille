import { Router } from 'express';
import { resetMigrations, seedData } from '../utils/umzug';

const resetRouter = Router();

resetRouter.post('/', async (_req, res) => {
  await resetMigrations();
  await seedData();
  res.status(200).send();
});

export default resetRouter;
