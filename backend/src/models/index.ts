import { Session } from './session';
import { Exercise } from './exercise';

Session.hasMany(Exercise);
Exercise.belongsTo(Session);

Session.sync({ alter: true });
Exercise.sync({ alter: true });

export default {
  Session,
  Exercise,
};
