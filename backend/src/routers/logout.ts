import { Router } from 'express';

const logoutRouter = Router();

logoutRouter.post('/', async (req, res) => {
  req.session.destroy(() => {
    res.status(200).send();
  });
});

export default logoutRouter;
