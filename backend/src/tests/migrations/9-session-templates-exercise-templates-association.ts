import type { Migration } from '../../utils/umzug';

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().addConstraint('exercise_templates', {
    fields: ['sessionTemplateId'],
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
    .removeConstraint(
      'exercise_templates',
      'exercise_templates_sessionTemplateId_sessions_fk'
    );
};
