import { Box, Button, Stack, TextField } from '@mui/material';
import { useState } from 'react';
import { Exercise, Session } from '../../types';
import ExerciseForm from './ExerciseForm';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { postSession } from '../../services/sessions';
import SessionTemplateSelect from './SessionTemplateSelect';
import { showNotification } from '../../utils/notifications';

const NewSessionForm = () => {
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [name, setName] = useState('');
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
      showNotification('Error: date not valid.', 'error');
      return;
    }
    const sessionToSend: Session = {
      date: date.toString(),
      name: name,
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
    <Stack spacing={2}>
      <SessionTemplateSelect setExercises={setExercises} />
      <DatePicker
        value={date}
        onChange={(value) => setDate(value)}
      ></DatePicker>
      <TextField
        label="Session Name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      ></TextField>

      <Box boxShadow={3}>
        <Stack spacing={1} margin={3}>
          {exercises.map((exercise, index) => (
            <ExerciseForm
              key={exercise.id}
              index={index}
              exercise={exercise}
              updateChildData={updateExercise}
              deleteExercise={deleteExercise}
            ></ExerciseForm>
          ))}
        </Stack>
        <Button variant="contained" onClick={newExercise}>
          Add Exercise
        </Button>
      </Box>

      <Button
        variant="contained"
        onClick={submitSession}
        disabled={!checkValidity()}
      >
        Submit
      </Button>
    </Stack>
  );
};

export default NewSessionForm;
