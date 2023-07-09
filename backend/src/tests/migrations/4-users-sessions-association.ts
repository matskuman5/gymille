import type { Migration } from '../../utils/umzug';

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().addConstraint('sessions', {
    fields: ['userId'],
    type: 'foreign key',
    references: {
      table: 'users',
      field: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
};

export const down: Migration = async ({ context: sequelize }) => {
  await sequelize
    .getQueryInterface()
    .removeConstraint('sessions', 'sessions_userId_users_fk');
};
