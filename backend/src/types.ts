export interface SessionTemplate {
  id: number;
  name: string;
  exerciseTemplates: ExerciseTemplate[];
}

export interface Session {
  id: number;
  date: string;
  name?: string;
  exercises: Exercise[];
}

export interface ExerciseType {
  name: string;
}

export interface ExerciseTemplate extends ExerciseType {
  sets?: number;
  reps?: number;
}

export interface Exercise extends ExerciseType {
  sets: number;
  reps: number;
  weight: number;
  notes?: string;
}
