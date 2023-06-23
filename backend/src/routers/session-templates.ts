import { Router } from 'express';
import dummySessionTemplates from '../test/dummy-session-templates.json';
import { SessionTemplate } from '../utils/types';
import { v4 as uuidv4 } from 'uuid';

const sessionTemplateRouter = Router();

let sessionTemplates: SessionTemplate[] = dummySessionTemplates;

sessionTemplateRouter.get('/', (_req, res) => {
  res.send(sessionTemplates);
});

sessionTemplateRouter.post('/', (req, res) => {
  sessionTemplates.push({
    ...req.body,
    id: uuidv4(),
  });
  res.send('session template added successfully');
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
