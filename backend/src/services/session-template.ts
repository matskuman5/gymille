import models from '../models';
import { isSessionTemplate } from '../utils/types';
import { v4 as uuidv4 } from 'uuid';

export const addSessionTemplate = async (obj: object) => {
  const sessionTemplate = {
    ...obj,
    id: uuidv4(),
  };

  if (!isSessionTemplate(sessionTemplate)) {
    console.log(sessionTemplate);
    throw new Error('Session template validation failed');
  }

  await models.SessionTemplateModel.create({
    id: sessionTemplate.id,
    name: sessionTemplate.name,
  });

  const exerciseTemplates = sessionTemplate.exerciseTemplates.map(
    (exerciseTemplate) => ({
      ...exerciseTemplate,
      id: uuidv4(),
      sessionTemplateId: sessionTemplate.id,
    })
  );

  await models.ExerciseTemplateModel.bulkCreate(exerciseTemplates);
};
