import { SessionModel } from './session';
import { ExerciseModel } from './exercise';
import logger from '../utils/logging';

const setupModels = async () => {
  try {
    SessionModel.hasMany(ExerciseModel);
    ExerciseModel.belongsTo(SessionModel);

    await SessionModel.sync({ force: true });
    await ExerciseModel.sync({ force: true });

    logger.info('Models synced with database successfully');
  } catch (error) {
    logger.error(error);
  }
};

export default {
  SessionModel,
  ExerciseModel,
  setupModels,
};
