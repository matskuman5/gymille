import { useEffect, useState } from 'react';
import { Session } from '../../types';
import SessionItem from './SessionItem';
import { getSessions } from '../../services/sessions';
import { Stack } from '@mui/material';
import { deleteSession as deleteSessionAPI } from '../../services/sessions';
import Loading from '../Loading';

const SessionList = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSessions = async () => {
    setLoading(true);
    const sessionsData = await getSessions();
    setLoading(false);
    if (sessionsData !== undefined) {
      setSessions(sessionsData);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const deleteSession = async (id: string) => {
    await deleteSessionAPI(id);
    await fetchSessions();
  };

  return (
    <>
      {loading ? (
        <Loading text={'Fetching sessions...'} />
      ) : (
        <Stack spacing={2}>
          {sessions.map((session) => (
            <SessionItem
              key={session.id}
              session={session}
              deleteSession={deleteSession}
            ></SessionItem>
          ))}
        </Stack>
      )}
    </>
  );
};

export default SessionList;
