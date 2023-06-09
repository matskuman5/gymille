export interface Session {
  date: string;
  exercises: Exercise[];
}

export interface ExerciseType {
  name: string;
  bodyPart?: string;
}

export interface Exercise extends ExerciseType {
  sets: number;
  reps: number;
  weight: number;
  notes?: string;
}
