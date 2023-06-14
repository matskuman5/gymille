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
  id: string;
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
