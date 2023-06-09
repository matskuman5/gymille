import { Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { Exercise } from '../../types';

interface Props {
  index: number;
  updateChildData: (e: Exercise, i: number) => void;
  deleteExercise: (i: number) => void;
}

const ExerciseForm = ({ index, updateChildData, deleteExercise }: Props) => {
  const [exerciseData, setExerciseData] = useState<Exercise>({
    name: '',
    sets: 0,
    reps: 0,
    weight: 0,
    notes: '',
  });

  const handleInputChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target;
    setExerciseData({ ...exerciseData, [name]: value });
  };

  useEffect(() => {
    updateChildData(exerciseData, index);
  }, [exerciseData]);

  const deleteThisExercise = () => {
    deleteExercise(index);
  };

  return (
    <div>
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
      <Button onClick={deleteThisExercise}>Delete</Button>
    </div>
  );
};

export default ExerciseForm;
