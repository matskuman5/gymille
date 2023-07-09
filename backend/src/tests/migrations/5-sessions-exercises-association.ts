import type { Migration } from '../../utils/umzug';

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().addConstraint('exercises', {
    fields: ['sessionId'],
    type: 'foreign key',
    references: {
      table: 'sessions',
      field: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
};

export const down: Migration = async ({ context: sequelize }) => {
  await sequelize
    .getQueryInterface()
    .removeConstraint('exercises', 'exercises_sessionId_sessions_fk');
};
