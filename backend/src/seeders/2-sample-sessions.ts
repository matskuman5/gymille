import type { Seeder } from '../utils/umzug';

const seedSessions = [
  {
    id: 'b600fd47-cfd8-4b61-8e56-e82b0adb7b74',
    date: '2023-06-01',
    name: 'Push',
    userId: 'ff3e694e-02fd-413b-a38f-b826cc2dc08b',
  },
  {
    id: 'd6b204e8-ed4c-4f58-879f-d3c05551a83c',
    date: '2023-06-02',
    userId: '0293f428-3739-4d85-b7c3-9bbbc8973fed',
  },
];
export const up: Seeder = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().bulkInsert('sessions', seedSessions);
};

export const down: Seeder = async ({ context: sequelize }) => {
  await sequelize
    .getQueryInterface()
    .bulkDelete('sessions', { id: seedSessions.map((session) => session.id) });
};
