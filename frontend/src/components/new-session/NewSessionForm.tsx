import { Box, Button, Grid, Stack, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { Exercise } from '../../types';
import ExerciseForm from './ExerciseForm';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { postSession } from '../../services/sessions';
import SessionTemplateSelector from './SessionTemplateSelector';
import { v4 as uuidv4 } from 'uuid';
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { getUserData } from '../../services/user';

const NewSessionForm = () => {
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [name, setName] = useState('');
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [weightUnit, setWeightUnit] = useState<string>('');

  const { data: userData } = useQuery({
    queryKey: ['userData'],
    queryFn: getUserData,
  });

  useEffect(() => {
    setWeightUnit(localStorage.getItem('weightUnit') || '');
  }, []);

  const queryClient = useQueryClient();

  const mutationPostSession = useMutation({
    mutationFn: () =>
      postSession(
        {
          id: uuidv4(),
          date: date!.toString(),
          name: name,
          exercises: exercises,
        },
        userData!.userId
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sessions'] });
      setExercises([]);
      setName('');
    },
  });

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

  const checkValidity = () => {
    return (
      date &&
      exercises.every((exercise) => {
        return (
          exercise.name &&
          exercise.sets > 0 &&
          exercise.reps > 0 &&
          exercise.weight > 0
        );
      })
    );
  };

  const handleSubmitClick = () => {
    if (userData?.userId) {
      mutationPostSession.mutate();
    } else {
      const existingTempSessions = JSON.parse(
        localStorage.getItem('tempSessions') || '[]'
      );

      localStorage.setItem(
        'tempSessions',
        JSON.stringify([
          ...existingTempSessions,
          {
            id: uuidv4(),
            date: date!.toString(),
            name: name,
            exercises: exercises,
          },
        ])
      );
    }
  };

  return (
    <Stack spacing={2}>
      <Grid container spacing={1}>
        <Grid item>
          <SessionTemplateSelector
            setExercises={setExercises}
            setSessionName={setName}
          />
        </Grid>
        <Grid item>
          <DatePicker
            label="Date"
            value={date}
            onChange={(value) => setDate(value)}
            sx={{ maxWidth: 120 }}
          ></DatePicker>
        </Grid>
        <Grid item>
          <TextField
            label="Session Name"
            data-cy="session-name-field"
            value={name}
            onChange={(event) => setName(event.target.value)}
            sx={{ maxWidth: 140 }}
          ></TextField>
        </Grid>
      </Grid>

      <Box boxShadow={3}>
        <Stack data-cy="exercise-forms" spacing={1} margin={3}>
          {exercises.map((exercise, index) => (
            <ExerciseForm
              key={exercise.id}
              index={index}
              exercise={exercise}
              updateChildData={updateExercise}
              deleteExercise={deleteExercise}
              weightUnit={weightUnit}
            ></ExerciseForm>
          ))}
        </Stack>
        <Button
          data-cy="add-exercise-button"
          variant="contained"
          onClick={newExercise}
        >
          Add Exercise
        </Button>
      </Box>

      <Button
        data-cy="submit-button"
        variant="contained"
        onClick={handleSubmitClick}
        disabled={!checkValidity()}
      >
        Submit
      </Button>
    </Stack>
  );
};

export default NewSessionForm;
