import { DataTypes } from 'sequelize';
import type { Migration } from '../../src/utils/umzug';

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable('Users', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};

export const down: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().dropTable('Users');
};

