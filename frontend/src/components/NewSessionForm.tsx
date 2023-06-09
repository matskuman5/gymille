import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import { Exercise, Session } from '../types';
import axios from 'axios';
import ExerciseForm from './ExerciseForm';

const NewSessionForm = () => {
  const [date, setDate] = useState('');
  const [exercises, setExercises] = useState<Exercise[]>([]);

  const updateExercise = (exercise: Exercise, index: number) => {
    setExercises((exercises) => {
      const updatedExercises = [...exercises];
      updatedExercises[index] = exercise;
      return updatedExercises;
    });
  };

  const submitSession = () => {
    const sessionToSend: Session = {
      date: date,
      exercises: exercises,
    };
    console.log('attempting to send', sessionToSend);
  };

  return (
    <div>
      <TextField
        label="Date"
        value={date}
        onChange={(event) => setDate(event.target.value)}
      ></TextField>
      <ExerciseForm index={0} updateChildData={updateExercise}></ExerciseForm>
      <Button onClick={submitSession}>Submit</Button>
    </div>
  );
};

export default NewSessionForm;
