import { Button, Grid, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from 'react';
import { Exercise } from '../../types';

interface Props {
  index: number;
  exercise: Exercise;
  updateChildData: (e: Exercise, i: number) => void;
  deleteExercise: (index: string) => void;
  weightUnit: string;
}

const ExerciseForm = ({
  index,
  exercise,
  updateChildData,
  deleteExercise,
  weightUnit,
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

  return (
    <Grid container spacing={1}>
      <Grid item xs={10}>
        <TextField
          label="Name"
          data-cy="exercise-name-field"
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
          data-cy="exercise-sets-field"
          name="sets"
          value={exerciseData.sets || null}
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
          data-cy="exercise-reps-field"
          name="reps"
          value={exerciseData.reps || null}
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
      <Grid item xs={5}>
        <TextField
          label={`Weight (${weightUnit === 'lbs' ? 'lbs' : 'kg'})`}
          data-cy="exercise-weight-field"
          name="weight"
          value={exerciseData.weight || null}
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
          data-cy="exercise-notes-field"
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
          onClick={() => deleteExercise(exercise.id)}
        >
          Delete
        </Button>
      </Grid>
    </Grid>
  );
};

export default ExerciseForm;
