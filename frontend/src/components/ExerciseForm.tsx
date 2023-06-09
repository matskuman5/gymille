import { TextField } from '@mui/material';
import { useState } from 'react';
import { Exercise } from '../types';

interface Props {
  index: number;
  updateChildData: (e: Exercise, i: number) => void;
}

const ExerciseForm = ({ index, updateChildData }: Props) => {
  const [exerciseData, setExerciseData] = useState<Exercise>({
    name: '',
    sets: 0,
    reps: 0,
    weight: 0,
    notes: '',
  });

  const handleInputChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target;
    setExerciseData((prevExerciseData) => ({
      ...prevExerciseData,
      [name]: value,
    }));
    updateChildData(exerciseData, index);
  };

  return (
    <div>
      <TextField
        label="Name"
        name="name"
        value={exerciseData.name}
        onChange={handleInputChange}
      ></TextField>
      <TextField
        label="Sets"
        name="sets"
        value={exerciseData.sets}
        type="number"
        onChange={handleInputChange}
      ></TextField>
      <TextField
        label="Reps"
        name="reps"
        value={exerciseData.reps}
        type="number"
        onChange={handleInputChange}
      ></TextField>
      <TextField
        label="Weight"
        name="weight"
        value={exerciseData.weight}
        type="number"
        onChange={handleInputChange}
      ></TextField>
      <TextField
        label="Notes"
        name="notes"
        value={exerciseData.notes}
        onChange={handleInputChange}
      ></TextField>
    </div>
  );
};

export default ExerciseForm;
