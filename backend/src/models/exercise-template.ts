import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from 'sequelize';
import { sequelize } from '../utils/db';

interface ExerciseTemplateModel
  extends Model<
    InferAttributes<ExerciseTemplateModel>,
    InferCreationAttributes<ExerciseTemplateModel>
  > {
  sessionTemplateId: string;
  id: string;
  name: string;
  sets: CreationOptional<number>;
  reps: CreationOptional<number>;
}

export const ExerciseTemplateModel = sequelize.define<ExerciseTemplateModel>(
  'ExerciseTemplate',
  {
    sessionTemplateId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sets: {
      type: DataTypes.INTEGER,
    },
    reps: {
      type: DataTypes.INTEGER,
    },
  }
);
