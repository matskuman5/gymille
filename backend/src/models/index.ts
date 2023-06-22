import { Session } from './session';
import { Exercise } from './exercise';
import logger from '../utils/logging';

const setupModels = async () => {
  try {
    Session.hasMany(Exercise);
    Exercise.belongsTo(Session);

    await Session.sync({ force: true });
    await Exercise.sync({ force: true });

    logger.info('Models synced with database successfully');
  } catch (error) {
    logger.error(error);
  }
};

export default {
  Session,
  Exercise,
  setupModels,
};
