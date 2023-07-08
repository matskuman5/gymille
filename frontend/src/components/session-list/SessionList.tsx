import { useContext, useEffect, useState } from 'react';
import { Session } from '../../types';
import SessionItem from './SessionItem';
import { getUserSessions } from '../../services/sessions';
import { Stack, Typography } from '@mui/material';
import { deleteSession as deleteSessionAPI } from '../../services/sessions';
import Loading from '../Loading';
import { UserContext } from '../user-authentication/UserContext';

const SessionList = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  const { userId } = useContext(UserContext);

  const fetchSessions = async () => {
    setLoading(true);
    const sessionsData = await getUserSessions(userId);
    setLoading(false);
    if (sessionsData !== undefined) {
      setSessions(sessionsData);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchSessions();
    }
  }, []);

  const deleteSession = async (id: string) => {
    await deleteSessionAPI(id);
    await fetchSessions();
  };

  return (
    <>
      {userId ? (
        <>
          {loading ? (
            <Loading text={'Fetching sessions...'} />
          ) : (
            <>
              {sessions.length === 0 ? (
                <Typography variant="h5">No sessions created yet!</Typography>
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
          )}
        </>
      ) : (
        <Typography variant="h5">Log in to save sessions!</Typography>
      )}
    </>
  );
};

export default SessionList;
