import { Router } from 'express';
import { getAllSessionTemplates } from '../services/sessions';
import {
  addSessionTemplate,
  deleteSessionTemplate,
  updateSessionTemplate,
} from '../services/session-template';

const sessionTemplateRouter = Router();

sessionTemplateRouter.get('/', async (_req, res) => {
  try {
    const response = await getAllSessionTemplates();
    res.json(response);
  } catch (error) {
    res.status(400).json({ error });
  }
});

sessionTemplateRouter.post('/', async (req, res) => {
  try {
    const response = await addSessionTemplate(req.body);
    res.json(response);
  } catch (error) {
    res.status(400).json({ error });
  }
});

sessionTemplateRouter.put('/:id', async (req, res) => {
  try {
    const response = await updateSessionTemplate(req.params.id, req.body);
    res.json(response);
  } catch (error) {
    res.status(400).json({ error });
  }
});

sessionTemplateRouter.delete('/:id', async (req, res) => {
  try {
    const response = await deleteSessionTemplate(req.params.id);
    res.json(response);
  } catch (error) {
    res.status(400).json({ error });
  }
});

export default sessionTemplateRouter;
