import { ModelStatic } from 'sequelize';
import models from '../models';

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
