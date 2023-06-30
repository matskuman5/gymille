import { Button, Grid, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from 'react';
import { Exercise } from '../../types';

interface Props {
  index: number;
  exercise: Exercise;
  updateChildData: (e: Exercise, i: number) => void;
  deleteExercise: (index: string) => void;
}

const ExerciseForm = ({
  index,
  exercise,
  updateChildData,
  deleteExercise,
}: Props) => {
  const [exerciseData, setExerciseData] = useState<Exercise>({
    id: exercise.id,
    name: exercise.name,
    sets: exercise.sets,
    reps: exercise.reps,
    weight: 0,
    notes: '',
  });

  useEffect(() => {
    updateChildData(exerciseData, index);
  }, [exerciseData]);

  const deleteThisExercise = (id: string) => {
    deleteExercise(id);
  };

  return (
    <Grid container spacing={1}>
      <Grid item>
        <TextField
          label="Name"
          name="name"
          value={exerciseData.name}
          onChange={(event) =>
            setExerciseData({ ...exerciseData, name: event.target.value })
          }
          error={!exerciseData.name}
          helperText={!exerciseData.name ? 'Name must be non-empty' : ''}
        ></TextField>
      </Grid>
      <Grid item xs={3}>
        <TextField
          label="Sets"
          name="sets"
          value={exerciseData.sets}
          type="number"
          onChange={(event) =>
            setExerciseData({
              ...exerciseData,
              sets: Number(event.target.value),
            })
          }
          error={exerciseData.sets <= 0}
          helperText={exerciseData.sets <= 0 ? 'Sets must be at least 1' : ''}
        ></TextField>
      </Grid>
      <Grid item xs={3}>
        <TextField
          label="Reps"
          name="reps"
          value={exerciseData.reps}
          type="number"
          onChange={(event) =>
            setExerciseData({
              ...exerciseData,
              reps: Number(event.target.value),
            })
          }
          error={exerciseData.reps <= 0}
          helperText={exerciseData.reps <= 0 ? 'Reps must be at least 1' : ''}
        ></TextField>
      </Grid>
      <Grid item xs={3}>
        <TextField
          label="Weight"
          name="weight"
          value={exerciseData.weight}
          type="number"
          onChange={(event) =>
            setExerciseData({
              ...exerciseData,
              weight: Number(event.target.value),
            })
          }
          error={exerciseData.weight <= 0}
          helperText={
            exerciseData.weight <= 0 ? 'Weight must be at least 1' : ''
          }
        ></TextField>
      </Grid>
      <Grid item>
        <TextField
          label="Notes"
          name="notes"
          value={exerciseData.notes}
          onChange={(event) =>
            setExerciseData({ ...exerciseData, notes: event.target.value })
          }
        ></TextField>
      </Grid>
      <Grid item>
        <Button
          startIcon={<DeleteIcon />}
          onClick={() => deleteThisExercise(exercise.id)}
        >
          Delete
        </Button>
      </Grid>
    </Grid>
  );
};

export default ExerciseForm;
