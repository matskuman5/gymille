import { Button, Stack, TextField } from '@mui/material';
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

  const handleInputChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target;
    // this is a bit hacky, the entire setup here needs to be reassessed
    if (name === 'sets' || 'reps' || 'weight') {
      setExerciseData({ ...exerciseData, [name]: Number(value) });
    } else {
      setExerciseData({ ...exerciseData, [name]: value });
    }
  };

  useEffect(() => {
    updateChildData(exerciseData, index);
  }, [exerciseData]);

  const deleteThisExercise = (id: string) => {
    deleteExercise(id);
  };

  return (
    <Stack direction="row" spacing={1}>
      <TextField
        label="Name"
        name="name"
        value={exerciseData.name}
        onChange={handleInputChange}
        error={!exerciseData.name}
        helperText={!exerciseData.name ? 'Name must be non-empty' : ''}
      ></TextField>
      <TextField
        label="Sets"
        name="sets"
        value={exerciseData.sets}
        type="number"
        onChange={handleInputChange}
        error={exerciseData.sets <= 0}
        helperText={exerciseData.sets <= 0 ? 'Sets must be at least 1' : ''}
      ></TextField>
      <TextField
        label="Reps"
        name="reps"
        value={exerciseData.reps}
        type="number"
        onChange={handleInputChange}
        error={exerciseData.reps <= 0}
        helperText={exerciseData.reps <= 0 ? 'Reps must be at least 1' : ''}
      ></TextField>
      <TextField
        label="Weight"
        name="weight"
        value={exerciseData.weight}
        type="number"
        onChange={handleInputChange}
        error={exerciseData.weight <= 0}
        helperText={exerciseData.weight <= 0 ? 'Weight must be at least 1' : ''}
      ></TextField>
      <TextField
        label="Notes"
        name="notes"
        value={exerciseData.notes}
        onChange={handleInputChange}
      ></TextField>
      <Button
        startIcon={<DeleteIcon />}
        onClick={() => deleteThisExercise(exercise.id)}
      >
        Delete
      </Button>
    </Stack>
  );
};

export default ExerciseForm;
