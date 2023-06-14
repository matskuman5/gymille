import { Box, Button, Stack, TextField } from '@mui/material';
import { useState } from 'react';
import { Exercise, Session } from '../../types';
import ExerciseForm from './ExerciseForm';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { postSession } from '../../services/sessions';
import SessionTemplateSelect from './SessionTemplateSelect';
import { showNotification } from '../../utils/notifications';
import { v4 as uuidv4 } from 'uuid';

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
        id: uuidv4(),
        name: '',
        sets: 0,
        reps: 0,
        weight: 0,
      },
    ]);
  };

  const deleteExercise = (id: string) => {
    console.log('deleting exercise', id);
    setExercises((exercises) =>
      exercises.filter((exercise) => exercise.id !== id)
    );
  };

  const submitSession = () => {
    if (date === null) {
      showNotification('Error: date not valid.', 'error');
      return;
    }
    const sessionToSend: Session = {
      id: uuidv4(),
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
      return (
        exercise.name &&
        exercise.sets > 0 &&
        exercise.reps > 0 &&
        exercise.weight > 0
      );
    });
  };

  return (
    <Stack spacing={2}>
      <SessionTemplateSelect
        setExercises={setExercises}
        setSessionName={setName}
      />
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
