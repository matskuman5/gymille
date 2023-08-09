import { Router } from 'express';
import { addUser, deleteUser, updatePassword } from '../services/users';

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

userRouter.put('/:id/password', async (req, res) => {
  if (req.session.userId === req.params.id) {
    await updatePassword(req.session.userId, req.body.newPassword);
    res.status(200).send();
  } else {
    res.status(401).send();
  }
});

userRouter.delete('/:id', async (req, res) => {
  if (req.session.userId === req.params.id) {
    await deleteUser(req.session.userId);
    res.status(200).send();
  } else {
    res.status(401).send();
  }
});

export default userRouter;
