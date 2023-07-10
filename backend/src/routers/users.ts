import { Router } from 'express';
import { addUser } from '../services/users';

const userRouter = Router();

userRouter.post('/', async (req, res) => {
  const response = await addUser(req.body);
  res.status(201).json(response);
});

userRouter.get('/', async (req, res) => {
  console.log(req.session);
  res.status(200).send({
    username: req.session.username,
    userId: req.session.userId,
  });
});

export default userRouter;
