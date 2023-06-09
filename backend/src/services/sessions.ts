import { ModelStatic } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import models from '../models';
import { isSession } from '../utils/types';
import { ExerciseModel } from '../models/exercise';

export const getAllSessions = async () => {
  return getAllData(
    models.SessionModel,
    models.ExerciseModel,
    'sessionId',
    'exercises'
  );
};

export const getAllSessionTemplates = async () => {
  return getAllData(
    models.SessionTemplateModel,
    models.ExerciseTemplateModel,
    'sessionTemplateId',
    'exerciseTemplates'
  );
};

const getAllData = async (
  mainModel: ModelStatic<any>,
  subModel: ModelStatic<any>,
  idField: string,
  subModelName: string
) => {
  const mainData = await mainModel.findAll({ raw: true });

  const response = [];

  for (const mainItem of mainData) {
    if (mainItem.id !== null) {
      const subData = await subModel.findAll({
        raw: true,
        where: { [idField]: mainItem.id },
      });
      response.push({
        ...mainItem,
        [subModelName]: subData,
      });
    }
  }

  return response;
};

export const addSession = async (obj: object) => {
  const session = {
    ...obj,
    id: uuidv4(),
  };

  if (!isSession(session)) {
    console.log(session);
    throw new Error('Session validation failed');
  }

  if (session.name) {
    await models.SessionModel.create({
      id: session.id,
      userId: session.userId,
      date: session.date,
      name: session.name,
    });
  } else {
    await models.SessionModel.create({
      id: session.id,
      userId: session.userId,
      date: session.date,
    });
  }

  const exercises = session.exercises.map((exercise) => ({
    ...exercise,
    id: uuidv4(),
    sessionId: session.id,
  }));

  await models.ExerciseModel.bulkCreate(exercises);
};

export const getUserSessions = async (id: string) => {
  const sessions = await models.SessionModel.findAll({
    raw: true,
    where: { userId: id },
  });

  let response = [];
  for (const session of sessions) {
    const exercises = await ExerciseModel.findAll({
      raw: true,
      where: { sessionId: session.id },
    });
    response.push({
      ...session,
      exercises: exercises,
    });
  }
  return response;
};

export const deleteSession = async (id: string) => {
  await models.SessionModel.destroy({
    where: { id: id },
  });

  await models.ExerciseModel.destroy({
    where: { sessionId: id },
  });
};
