import { Router } from 'express';
import dummySessionTemplates from '../test/dummy-session-templates.json';
import { SessionTemplate } from '../utils/types';
import { getAllSessionTemplates } from '../services/sessions';
import { addSessionTemplate } from '../services/session-template';

const sessionTemplateRouter = Router();

let sessionTemplates: SessionTemplate[] = dummySessionTemplates;

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

sessionTemplateRouter.put('/:id', (req, res) => {
  sessionTemplates = sessionTemplates.map((sessionTemplate) =>
    sessionTemplate.id === req.params.id ? req.body : sessionTemplate
  );
  res.send('session template updated successfully');
});

sessionTemplateRouter.delete('/:id', (req, res) => {
  sessionTemplates = sessionTemplates.filter(
    (sessionTemplate) => sessionTemplate.id !== req.params.id
  );
  res.send('session template deleted successfully').status(200);
});

export default sessionTemplateRouter;
