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

export const updateSessionTemplate = async (
  id: string,
  sessionTemplate: object
) => {
  if (!isSessionTemplate(sessionTemplate)) {
    console.log(sessionTemplate);
    throw new Error('Session template validation failed');
  }

  console.log(sessionTemplate);

  await models.SessionTemplateModel.update(
    { name: sessionTemplate.name },
    {
      where: {
        id: id,
      },
    }
  );

  for (const exerciseTemplate of sessionTemplate.exerciseTemplates) {
    await models.ExerciseTemplateModel.update(
      {
        name: exerciseTemplate.name,
        sets: exerciseTemplate.sets,
        reps: exerciseTemplate.reps,
      },
      { where: { id: exerciseTemplate.id } }
    );
  }
};

export const deleteSessionTemplate = async (id: string) => {
  await models.SessionTemplateModel.destroy({
    where: { id: id },
  });

  await models.ExerciseTemplateModel.destroy({
    where: { sessionTemplateId: id },
  });
};
