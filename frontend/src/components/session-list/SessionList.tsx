import { useEffect, useState } from 'react';
import { Session } from '../../types';
import SessionItem from './SessionItem';
import { getSessions } from '../../services/sessions';

const SessionList = () => {
  const [sessions, setSessions] = useState<Session[]>([]);

  useEffect(() => {
    const fetchSessions = async () => {
      const sessionsData = await getSessions();
      if (sessionsData !== undefined) {
        setSessions(sessionsData);
      }
    };

    fetchSessions();
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
