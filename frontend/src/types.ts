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

export interface ExerciseTemplate {
  id: number;
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
