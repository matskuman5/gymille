import { Router } from 'express';
import { validateLoginAndReturnId } from '../services/login';

const loginRouter = Router();

loginRouter.post('/', async (req, res) => {
  const userId = await validateLoginAndReturnId(req.body);
  req.session.userId = userId;
  req.session.username = req.body.username;
  res.status(200).send({
    username: req.session.username,
    userId: req.session.userId,
  });
});

export default loginRouter;
