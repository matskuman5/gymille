import { SessionModel } from './session';
import { ExerciseModel } from './exercise';
import { bunyanLogger } from '../utils/logging';
import { SessionTemplateModel } from './session-template';
import { ExerciseTemplateModel } from './exercise-template';
import { UserModel } from './user';

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
    await UserModel.sync({ force: true });

    bunyanLogger.info('Models synced with database successfully');
  } catch (error) {
    bunyanLogger.error(error);
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
