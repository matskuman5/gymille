export interface SessionTemplate {
  name: string;
  exerciseTypes: ExerciseType[];
}

export interface Session {
  date: string;
  exercises: Exercise[];
}

export interface ExerciseType {
  id: number;
  name: string;
}

export interface Exercise extends ExerciseType {
  sets: number;
  reps: number;
  weight: number;
  notes?: string;
}
