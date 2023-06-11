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

sessionTemplateRouter.put('/:name', (req, res) => {
  sessionTemplates = sessionTemplates.map((sessionTemplate) =>
    sessionTemplate.name === req.params.name ? req.body : sessionTemplate
  );
  res.send('session template updated successfully');
});

export default sessionTemplateRouter;
