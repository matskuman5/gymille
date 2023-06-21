import models from '../models';
import dummySessions from './dummy-sessions.json';

export const addDummySessions = () => {
  models.Session.sync();
  dummySessions.forEach((session) => {
    models.Session.create(session);
  });
};
