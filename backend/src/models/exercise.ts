import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import { sequelize } from '../utils/db';

interface ExerciseModel
  extends Model<
    InferAttributes<ExerciseModel>,
    InferCreationAttributes<ExerciseModel>
  > {
  sessionId: string;
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight: number;
  notes: CreationOptional<string>;
}

export const ExerciseModel = sequelize.define<ExerciseModel>('exercises', {
  sessionId: {
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
    allowNull: false,
  },
  reps: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  weight: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  notes: {
    type: DataTypes.STRING,
  },
});
