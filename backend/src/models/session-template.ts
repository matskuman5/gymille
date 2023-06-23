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
  name: string;
}

export const SessionTemplateModel = sequelize.define<SessionTemplateModel>(
  'SessionTemplate',
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }
);
