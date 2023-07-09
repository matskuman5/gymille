import type { Seeder } from '../../utils/umzug';

const seedUsers = [
  {
    id: 'ff3e694e-02fd-413b-a38f-b826cc2dc08b',
    username: 'GymBro1',
    passwordHash: 'jfiejifjaj',
  },
  {
    id: '0293f428-3739-4d85-b7c3-9bbbc8973fed',
    username: 'Grizzly69',
    passwordHash: 'fjawifjaoifj',
  },
];

export const up: Seeder = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().bulkInsert('users', seedUsers);
};

export const down: Seeder = async ({ context: sequelize }) => {
  await sequelize
    .getQueryInterface()
    .bulkDelete('users', { id: seedUsers.map((u) => u.id) });
};
