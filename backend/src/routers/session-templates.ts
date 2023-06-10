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

export default sessionTemplateRouter;
