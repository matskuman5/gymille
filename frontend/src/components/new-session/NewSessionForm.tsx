import { Box, Button, Grid, Stack, TextField } from '@mui/material';
import { useState } from 'react';
import { Exercise } from '../../types';
import ExerciseForm from './ExerciseForm';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { postSession } from '../../services/sessions';
import SessionTemplateSelector from './SessionTemplateSelector';
import { v4 as uuidv4 } from 'uuid';
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { getUserData } from '../../services/user';
import Cookies from 'js-cookie';

const NewSessionForm = () => {
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [name, setName] = useState('');
  const [exercises, setExercises] = useState<Exercise[]>([]);

  const { data: userData } = useQuery({
    queryKey: ['userData'],
    queryFn: getUserData,
  });

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
        userData!.userId // WIP: disable submitting sessions when not logged in
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
      const existingTempSessions = Cookies.get('tempSessions');

      if (existingTempSessions === undefined) {
        Cookies.set(
          'tempSessions',
          JSON.stringify([
            {
              id: uuidv4(),
              date: date!.toString(),
              name: name,
              exercises: exercises,
            },
          ])
        );
      } else {
        console.log(existingTempSessions);
        console.log(JSON.parse(existingTempSessions));
        console.log(
          JSON.parse(existingTempSessions).push({
            id: uuidv4(),
            date: date!.toString(),
            name: name,
            exercises: exercises,
          })
        );
        console.log([
          ...JSON.parse(existingTempSessions),
          {
            id: uuidv4(),
            date: date!.toString(),
            name: name,
            exercises: exercises,
          },
        ]);
        Cookies.set(
          'tempSessions',
          JSON.stringify([
            ...JSON.parse(existingTempSessions),
            {
              id: uuidv4(),
              date: date!.toString(),
              name: name,
              exercises: exercises,
            },
          ])
        );
      }
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
            value={name}
            onChange={(event) => setName(event.target.value)}
            sx={{ maxWidth: 140 }}
          ></TextField>
        </Grid>
      </Grid>

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
        onClick={handleSubmitClick}
        disabled={!checkValidity()}
      >
        Submit
      </Button>
    </Stack>
  );
};

export default NewSessionForm;
