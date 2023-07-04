export interface SessionTemplate {
  id: string;
  name: string;
  exerciseTemplates: ExerciseTemplate[];
}

export const isSessionTemplate = (object: unknown): object is SessionTemplate =>
  typeof object === 'object' &&
  object !== null &&
  'id' in object &&
  'name' in object &&
  'exerciseTemplates' in object &&
  typeof object.id === 'string' &&
  typeof object.name === 'string' &&
  Array.isArray(object.exerciseTemplates) &&
  object.exerciseTemplates.every(isExerciseTemplate);

export interface Session {
  id: string;
  date: string;
  name?: string;
  exercises: Exercise[];
}

export const isSession = (object: unknown): object is Session =>
  typeof object === 'object' &&
  object !== null &&
  'id' in object &&
  'date' in object &&
  'exercises' in object &&
  typeof object.id === 'string' &&
  typeof object.date === 'string' &&
  Array.isArray(object.exercises) &&
  object.exercises.every(isExercise);

export interface ExerciseTemplate {
  id: string;
  name: string;
  sets?: number;
  reps?: number;
}

export const isExerciseTemplate = (object: unknown): object is Exercise =>
  typeof object === 'object' &&
  object !== null &&
  'id' in object &&
  'name' in object &&
  typeof object.id === 'string' &&
  typeof object.name === 'string';

export interface Exercise extends ExerciseTemplate {
  sets: number;
  reps: number;
  weight: number;
  notes?: string;
}

export const isExercise = (object: unknown): object is Exercise =>
  isExerciseTemplate(object) &&
  'sets' in object &&
  'reps' in object &&
  'weight' in object &&
  typeof object.sets === 'number' &&
  typeof object.reps === 'number' &&
  typeof object.weight === 'number';

export interface User {
  id: string;
  username: string;
  passwordHash: string;
}

export interface NewUser {
  username: string;
  password: string;
}

export const isNewUser = (object: unknown): object is NewUser =>
  typeof object === 'object' &&
  object !== null &&
  'username' in object &&
  'password' in object &&
  typeof object.username === 'string' &&
  typeof object.password === 'string';
