import { Button, TextField } from '@mui/material';
import { useState } from 'react';

const NewWorkoutForm = () => {
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');

  const submitWorkout = () => {
    console.log('sending', date, notes);
  };

  return (
    <div>
      <TextField
        label="Date"
        value={date}
        onChange={(event) => setDate(event.target.value)}
      ></TextField>
      <TextField
        label="Notes"
        value={notes}
        onChange={(event) => setNotes(event.target.value)}
      ></TextField>
      <Button onClick={submitWorkout}>Submit</Button>
    </div>
  );
};

export default NewWorkoutForm;
