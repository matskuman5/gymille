import { useEffect, useState } from 'react';
import { Session } from '../../types';
import SessionItem from './SessionItem';
import { getSessions } from '../../services/sessions';
import { Stack } from '@mui/material';

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
    <Stack spacing={2}>
      {sessions.map((session) => (
        <SessionItem key={session.date} session={session}></SessionItem>
      ))}
    </Stack>
  );
};

export default SessionList;
