import models from '../models';
import dummySessions from './dummy-sessions.json';

export const addDummySessions = async () => {
  const sessionsWithoutExercises = dummySessions.map((session) => ({
    id: session.id,
    date: session.date,
    name: session.name,
  }));
  sessionsWithoutExercises.forEach(async (session) => {
    await models.Session.create(session);
  });
};
