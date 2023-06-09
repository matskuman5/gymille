import { Button } from '@mui/material';
import { useState } from 'react';
import { Exercise, Session } from '../../types';
import ExerciseForm from './ExerciseForm';
import { DatePicker } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';
import { postSession } from '../../services/sessions';

const NewSessionForm = () => {
  const [date, setDate] = useState<Dayjs | null>(null);
  const [exercises, setExercises] = useState<Exercise[]>([]);

  const updateExercise = (exercise: Exercise, index: number) => {
    setExercises((exercises) => {
      const updatedExercises = [...exercises];
      updatedExercises[index] = exercise;
      return updatedExercises;
    });
  };

  const newExercise = () => {
    setExercises((exercises) => [
      ...exercises,
      {
        name: '',
        sets: 0,
        reps: 0,
        weight: 0,
      },
    ]);
  };

  const deleteExercise = (indexToRemove: number) => {
    setExercises((exercises) =>
      exercises.filter((_, i) => i !== indexToRemove)
    );
  };

  const submitSession = () => {
    if (date === null) {
      console.error('date not valid');
      return;
    }
    const sessionToSend: Session = {
      date: date.toString(),
      exercises: exercises,
    };
    postSession(sessionToSend);
    setDate(null);
    setExercises([]);
  };

  const checkValidity = () => {
    return exercises.every((exercise) => {
      return exercise.name && exercise.sets > 0 && exercise.reps > 0;
    });
  };

  return (
    <div>
      <DatePicker
        value={date}
        onChange={(value) => setDate(value)}
      ></DatePicker>
      <Button onClick={newExercise}>Add Exercise</Button>
      <div>
        {exercises.map((exercise, index) => (
          <ExerciseForm
            key={index}
            index={index}
            updateChildData={updateExercise}
            deleteExercise={deleteExercise}
          ></ExerciseForm>
        ))}
      </div>

      <Button onClick={submitSession} disabled={!checkValidity()}>
        Submit
      </Button>
    </div>
  );
};

export default NewSessionForm;
