import { Router } from 'express';
import dummySessionTemplates from '../test/dummy-session-templates.json';
import { SessionTemplate } from '../types';

const sessionTemplateRouter = Router();

let sessionTemplates: SessionTemplate[] = dummySessionTemplates;

sessionTemplateRouter.get('/', (_req, res) => {
  res.send(sessionTemplates);
});

sessionTemplateRouter.post('/', (req, res) => {
  sessionTemplates.push(req.body);
  res.send('session template added successfully');
});

sessionTemplateRouter.put('/:id', (req, res) => {
  sessionTemplates = sessionTemplates.map((sessionTemplate) =>
    sessionTemplate.id === Number(req.params.id) ? req.body : sessionTemplate
  );
  res.send('session template updated successfully');
});

sessionTemplateRouter.delete('/:id', (req, res) => {
  sessionTemplates = sessionTemplates.filter(
    (sessionTemplate) => sessionTemplate.id !== Number(req.params.id)
  );
  res.send('session template deleted successfully').status(200);
});

export default sessionTemplateRouter;
