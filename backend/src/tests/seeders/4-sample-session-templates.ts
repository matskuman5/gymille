import type { Seeder } from '../../utils/umzug';

const seedSessionTemplates = [
  {
    id: 'bcce916a-85a1-474c-a5f3-155dccad9166',
    userId: 'ff3e694e-02fd-413b-a38f-b826cc2dc08b',
    name: 'Push',
  },
  {
    id: '0f13db6e-72d9-4630-a63b-68f5ac5763df',
    userId: '0293f428-3739-4d85-b7c3-9bbbc8973fed',
    name: 'Pull',
  },
];
export const up: Seeder = async ({ context: sequelize }) => {
  await sequelize
    .getQueryInterface()
    .bulkInsert('session_templates', seedSessionTemplates);
};

export const down: Seeder = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().bulkDelete('session_templates', {
    id: seedSessionTemplates.map((sessionTemplate) => sessionTemplate.id),
  });
};
