import { useEffect, useState } from 'react';
import { Session } from '../../types';
import SessionItem from './SessionItem';
import { getSessions } from '../../services/sessions';
import { Stack } from '@mui/material';
import { deleteSession as deleteSessionAPI } from '../../services/sessions';

const SessionList = () => {
  const [sessions, setSessions] = useState<Session[]>([]);

  const fetchSessions = async () => {
    const sessionsData = await getSessions();
    if (sessionsData !== undefined) {
      setSessions(sessionsData);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const deleteSession = async (id: string) => {
    const response = await deleteSessionAPI(id);
    if (response !== undefined && response.status === 200) {
      setSessions(sessions.filter((session) => session.id !== id));
    }
  };

  return (
    <Stack spacing={2}>
      {sessions.map((session) => (
        <SessionItem
          key={session.id}
          session={session}
          deleteSession={deleteSession}
        ></SessionItem>
      ))}
    </Stack>
  );
};

export default SessionList;
