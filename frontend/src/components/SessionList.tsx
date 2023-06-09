import axios from 'axios';
import { useEffect, useState } from 'react';
import { Session } from '../types';

const SessionList = () => {
  const [sessions, setSessions] = useState<Session[]>([]);

  useEffect(() => {
    axios.get<Session[]>('http://localhost:3000/api/sessions').then((res) => {
      setSessions(res.data);
    });
  }, []);

  return (
    <div>
      <h2>Past workout sessions:</h2>
      <ul>
        {sessions.map((session) => {
          return (
            <li key={session.date}>
              <div>
                <h3>Date: {session.date}</h3>
                {session.exercises.map((exercise) => {
                  return (
                    <div key={exercise.name}>
                      <p>
                        <b>{exercise.name}</b> ({exercise.bodyPart}),{' '}
                        {exercise.sets} sets of {exercise.reps} at{' '}
                        {exercise.weight}
                      </p>
                      <p>Notes: {exercise.notes}</p>
                    </div>
                  );
                })}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SessionList;
