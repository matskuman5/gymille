export interface SessionTemplate {
  id: string;
  name: string;
  exerciseTemplates: ExerciseTemplate[];
}

export interface Session {
  id: string;
  date: string;
  name?: string;
  exercises: Exercise[];
}

export interface ExerciseTemplate {
  name: string;
  sets?: number;
  reps?: number;
}

export interface Exercise extends ExerciseTemplate {
  sets: number;
  reps: number;
  weight: number;
  notes?: string;
}

export const isExercise = (object: unknown): object is Exercise =>
  typeof object === 'object' &&
  object !== null &&
  'id' in object &&
  'name' in object &&
  'sets' in object &&
  'reps' in object &&
  'weight' in object &&
  typeof object.id === 'string' &&
  typeof object.name === 'string' &&
  typeof object.sets === 'number' &&
  typeof object.reps === 'number' &&
  typeof object.weight === 'number';

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
