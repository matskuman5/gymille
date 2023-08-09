import { Router } from 'express';
import { getAllSessionTemplates } from '../services/sessions';
import {
  addSessionTemplate,
  deleteSessionTemplate,
  updateSessionTemplate,
} from '../services/session-template';

const sessionTemplateRouter = Router();

sessionTemplateRouter.get('/', async (_req, res) => {
  const response = await getAllSessionTemplates();
  res.json(response);
});

sessionTemplateRouter.post('/', async (req, res) => {
  const response = await addSessionTemplate(req.body);
  res.status(201).json(response);
});

sessionTemplateRouter.put('/:id', async (req, res) => {
  const response = await updateSessionTemplate(req.params.id, req.body);
  res.json(response);
});

sessionTemplateRouter.delete('/:id', async (req, res) => {
  const response = await deleteSessionTemplate(req.params.id);
  res.json(response);
});

export default sessionTemplateRouter;
