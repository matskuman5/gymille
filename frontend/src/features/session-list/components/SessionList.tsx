import axios from 'axios';
import { useEffect, useState } from 'react';
import { Session } from '../../../types';
import SessionItem from './SessionItem';

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
      {sessions.map((session) => (
        <SessionItem key={session.date} session={session}></SessionItem>
      ))}
    </div>
  );
};

export default SessionList;
