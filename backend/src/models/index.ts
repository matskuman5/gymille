import { SessionModel } from './session';
import { ExerciseModel } from './exercise';
import { logger } from '../utils/logging';
import { SessionTemplateModel } from './session-template';
import { ExerciseTemplateModel } from './exercise-template';
import { UserModel } from './user';

const setupModels = async () => {
  try {
    SessionModel.hasMany(ExerciseModel);
    ExerciseModel.belongsTo(SessionModel);

    UserModel.hasMany(SessionModel);
    SessionModel.belongsTo(UserModel);

    SessionTemplateModel.hasMany(ExerciseTemplateModel);
    ExerciseTemplateModel.belongsTo(SessionTemplateModel);

    UserModel.hasMany(SessionTemplateModel);
    SessionTemplateModel.belongsTo(UserModel);

    await SessionModel.sync({ force: true });
    await ExerciseModel.sync({ force: true });
    await SessionTemplateModel.sync({ force: true });
    await ExerciseTemplateModel.sync({ force: true });
    await UserModel.sync({ force: true });

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
  UserModel,
  setupModels,
};
