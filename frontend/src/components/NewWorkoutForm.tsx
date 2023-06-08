import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import { Workout } from '../types';
import axios from 'axios';

const NewWorkoutForm = () => {
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');

  const submitWorkout = () => {
    const workoutToSend: Workout = {
      date: date,
      notes: notes,
    };
    console.log('attempting to send', workoutToSend);
    axios
      .post('http://localhost:3000/api/workouts', workoutToSend)
      .then((res) => console.log(res));
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
