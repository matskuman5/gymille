import { Router } from 'express';
import { getUserSessionTemplates } from '../services/session-template';

const userSessionTemplatesRouter = Router();

userSessionTemplatesRouter.get('/:id/session-templates', async (req, res) => {
  const response = await getUserSessionTemplates(req.params.id);
  res.json(response);
});

export default userSessionTemplatesRouter;
