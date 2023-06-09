import type { Seeder } from '../utils/umzug';

const seedExercises = [
  {
    sessionId: 'b600fd47-cfd8-4b61-8e56-e82b0adb7b74',
    id: '33a386d8-f5fa-405c-8492-16dcb77986ee',
    name: 'Bench Press',
    sets: 3,
    reps: 10,
    weight: 135,
    notes: 'Take it slow',
  },
  {
    sessionId: 'b600fd47-cfd8-4b61-8e56-e82b0adb7b74',
    id: 'bcfb2b73-fcb5-40ec-90cb-c0dfdab71506',
    name: 'Squat',
    sets: 4,
    reps: 8,
    weight: 225,
    notes: 'Maintain proper form',
  },
  {
    sessionId: 'd6b204e8-ed4c-4f58-879f-d3c05551a83c',
    id: 'e459e8f7-de00-4331-b1ad-93830ae9c555',
    name: 'Shoulder Press',
    sets: 3,
    reps: 12,
    weight: 95,
  },
  {
    sessionId: 'd6b204e8-ed4c-4f58-879f-d3c05551a83c',
    id: 'fd12a7e5-86f7-4c75-8b7f-a9e97cbfb2df',
    name: 'Deadlift',
    sets: 3,
    reps: 6,
    weight: 275,
  },
];
export const up: Seeder = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().bulkInsert('exercises', seedExercises);
};

export const down: Seeder = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().bulkDelete('exercises', {
    id: seedExercises.map((exercise) => exercise.id),
  });
};
