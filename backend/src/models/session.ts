import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import { sequelize } from '../utils/db';

interface SessionModel
  extends Model<
    InferAttributes<SessionModel>,
    InferCreationAttributes<SessionModel>
  > {
  id: string;
  username: string;
  date: string;
  name: CreationOptional<string>;
}

export const SessionModel = sequelize.define<SessionModel>('Session', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
  },
});
