export interface SessionTemplate {
  name: string;
  exerciseTypes: ExerciseTemplate[];
}

export interface Session {
  date: string;
  exercises: Exercise[];
}

export interface ExerciseType {
  id: number;
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
