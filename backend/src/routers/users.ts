import { Router } from 'express';
import { addUser } from '../services/users';
import { getUserSessionTemplates } from '../services/session-template';

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

userRouter.get('/:id/session-templates', async (req, res) => {
  const response = await getUserSessionTemplates(req.params.id);
  res.json(response);
});

export default userRouter;
