import type { Seeder } from '../utils/umzug';

const seedUsers = [
  {
    id: 'ff3e694e-02fd-413b-a38f-b826cc2dc08b',
    username: 'GymBro1',
    // password plaintext: password123
    passwordHash:
      '$2a$10$6/ynFnmxxPwFWQ6s.iHYves/YTWU8SWjrgBrO8we4FwRzV2Q5BTHG',
  },
  {
    id: '0293f428-3739-4d85-b7c3-9bbbc8973fed',
    username: 'Grizzly69',
    // password plaintext: password456
    passwordHash:
      '$2a$10$/6Pesn73kPgm4lOJS6sMaOXUpAXsWWtiEnO3BWzrlwG7Pnhtlj7PK',
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
