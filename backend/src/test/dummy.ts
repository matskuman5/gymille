import models from '../models';
import dummySessions from './dummy-sessions.json';
import dummySessionTemplates from './dummy-session-templates.json';

export const addDummySessions = async () => {
  dummySessions.forEach(async (session) => {
    const sessionWithoutExercises = {
      id: session.id,
      username: session.username,
      date: session.date,
      name: session.name,
    };
    await models.SessionModel.create(sessionWithoutExercises);
    await models.ExerciseModel.bulkCreate(session.exercises);
  });
  dummySessionTemplates.forEach(async (sessionTemplate) => {
    const sessionTemplateWithoutExercises = {
      id: sessionTemplate.id,
      name: sessionTemplate.name,
    };
    await models.SessionTemplateModel.create(sessionTemplateWithoutExercises);
    await models.ExerciseTemplateModel.bulkCreate(
      sessionTemplate.exerciseTemplates
    );
  });
};
