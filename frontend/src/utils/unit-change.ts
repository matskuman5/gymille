import { Session } from './types';

export const kgToLbs = (session: Session) => {
  const updatedExercises = session.exercises.map((exercise) => {
    return { ...exercise, weight: Math.round(exercise.weight * 2.2) };
  });
  return {
    ...session,
    exercises: updatedExercises,
  };
};

export const lbsToKg = (session: Session) => {
  const updatedExercises = session.exercises.map((exercise) => {
    return { ...exercise, weight: Math.round(exercise.weight * 0.45) };
  });
  return {
    ...session,
    exercises: updatedExercises,
  };
};
