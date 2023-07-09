import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
} from 'sequelize';
import { sequelize } from '../utils/db';

interface SessionTemplateModel
  extends Model<
    InferAttributes<SessionTemplateModel>,
    InferCreationAttributes<SessionTemplateModel>
  > {
  id: string;
  userId: string;
  name: string;
}

export const SessionTemplateModel = sequelize.define<SessionTemplateModel>(
  'SessionTemplate',
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }
);
