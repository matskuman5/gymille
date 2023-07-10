import { Router } from 'express';
import {
  addSessionTemplate,
  getUserSessionTemplates,
} from '../services/session-template';

const userSessionTemplatesRouter = Router();

userSessionTemplatesRouter.post('/:id/session-templates', async (req, res) => {
  const response = await addSessionTemplate({
    ...req.body,
    userId: req.params.id,
  });
  res.status(201).json(response);
});

userSessionTemplatesRouter.get('/:id/session-templates', async (req, res) => {
  const response = await getUserSessionTemplates(req.params.id);
  res.json(response);
});

export default userSessionTemplatesRouter;
