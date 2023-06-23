import models from '../models';
import dummySessions from './dummy-sessions.json';

export const addDummySessions = async () => {
  dummySessions.forEach(async (session) => {
    const sessionWithoutExercises = {
      id: session.id,
      date: session.date,
      name: session.name,
    };
    await models.SessionModel.create(sessionWithoutExercises);
    await models.ExerciseModel.bulkCreate(session.exercises);
  });
};
