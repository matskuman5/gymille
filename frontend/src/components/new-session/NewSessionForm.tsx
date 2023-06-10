import { Button } from '@mui/material';
import { useState } from 'react';
import { Exercise, Session } from '../../types';
import ExerciseForm from './ExerciseForm';
import { DatePicker } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';
import { postSession } from '../../services/sessions';
import SessionTemplateSelect from './SessionTemplateSelect';

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
        id: Math.round(Math.random() * 10000),
        name: '',
        sets: 0,
        reps: 0,
        weight: 0,
      },
    ]);
  };

  const deleteExercise = (indexToRemove: number) => {
    console.log('deleting exercise', indexToRemove);
    setExercises((exercises) =>
      exercises.filter((exercise) => exercise.id !== indexToRemove)
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
      <SessionTemplateSelect setExercises={setExercises} />
      <DatePicker
        value={date}
        onChange={(value) => setDate(value)}
      ></DatePicker>
      <Button onClick={newExercise}>Add Exercise</Button>
      <div>
        {exercises.map((exercise, index) => (
          <ExerciseForm
            key={exercise.id}
            index={index}
            exercise={exercise}
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
