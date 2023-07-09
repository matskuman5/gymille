import { DataTypes } from 'sequelize';
import type { Migration } from '../../utils/umzug';

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable('exercise_templates', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    sessionTemplateId: {
      type: DataTypes.STRING,
      allowNull: false,
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
  });
};

export const down: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().dropTable('exercise_templates');
};
