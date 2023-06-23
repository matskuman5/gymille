import { SessionModel } from './session';
import { ExerciseModel } from './exercise';
import logger from '../utils/logging';
import { SessionTemplateModel } from './session-template';
import { ExerciseTemplateModel } from './exercise-template';

const setupModels = async () => {
  try {
    SessionModel.hasMany(ExerciseModel);
    ExerciseModel.belongsTo(SessionModel);

    SessionTemplateModel.hasMany(ExerciseTemplateModel);
    ExerciseTemplateModel.belongsTo(SessionTemplateModel);

    await SessionModel.sync({ force: true });
    await ExerciseModel.sync({ force: true });
    await SessionTemplateModel.sync({ force: true });
    await ExerciseTemplateModel.sync({ force: true });

    logger.info('Models synced with database successfully');
  } catch (error) {
    logger.error(error);
  }
};

export default {
  SessionModel,
  ExerciseModel,
  SessionTemplateModel,
  ExerciseTemplateModel,
  setupModels,
};