import type { Seeder } from '../utils/umzug';

const seedExerciseTemplates = [
  {
    sessionTemplateId: 'bcce916a-85a1-474c-a5f3-155dccad9166',
    id: '61375d60-31b0-4311-8ad0-1c3766c1302a',
    name: 'Bench Press',
  },
  {
    sessionTemplateId: 'bcce916a-85a1-474c-a5f3-155dccad9166',
    id: '02aeb2bc-9002-42f0-956e-6041c40fd467',
    name: 'Squat',
    sets: 3,
    reps: 12,
  },
  {
    sessionTemplateId: 'bcce916a-85a1-474c-a5f3-155dccad9166',
    id: '6869b649-30d8-4bc0-8937-f44c29a32583',
    name: 'Shoulder Press',
  },
  {
    sessionTemplateId: '0f13db6e-72d9-4630-a63b-68f5ac5763df',
    id: '154acfa4-f2f1-43f0-b003-039fe56bbc13',
    name: 'Deadlift',
    sets: 4,
    reps: 2,
  },
  {
    sessionTemplateId: '0f13db6e-72d9-4630-a63b-68f5ac5763df',
    id: '03ed899d-37ae-42e3-84b3-7ba251dcc5ba',
    name: 'Bicep Curls',
    sets: 3,
    reps: 12,
  },
  {
    sessionTemplateId: '0f13db6e-72d9-4630-a63b-68f5ac5763df',
    id: 'c58a818f-ae15-4d2a-b654-35c117213572',
    name: 'Lunges',
    sets: 4,
    reps: 6,
  },
];
export const up: Seeder = async ({ context: sequelize }) => {
  await sequelize
    .getQueryInterface()
    .bulkInsert('exercise_templates', seedExerciseTemplates);
};

export const down: Seeder = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().bulkDelete('exercise_templates', {
    id: seedExerciseTemplates.map((exerciseTemplate) => exerciseTemplate.id),
  });
};
