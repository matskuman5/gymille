import axios from 'axios';
import { useEffect, useState } from 'react';
import { Workout } from '../types';

const WorkoutList = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  useEffect(() => {
    axios.get<Workout[]>('http://localhost:3000/api/workouts').then((res) => {
      setWorkouts(res.data);
    });
  }, []);

  return (
    <div>
      <h2>Past workouts:</h2>
      <ul>
        {workouts.map((workout) => {
          return (
            <li key={workout.date}>
              <div>
                <p>Date: {workout.date}</p>
                <p>Notes: {workout.notes}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default WorkoutList;
