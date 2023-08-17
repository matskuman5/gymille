import SessionItem from './SessionItem';
import { getUserSessions } from '../../services/sessions';
import { Stack, Typography } from '@mui/material';
import Loading from '../miscellaneous/Loading';
import { useQuery } from '@tanstack/react-query';
import { getUserData } from '../../services/user';
import { useEffect, useState } from 'react';
import { Session } from '../../utils/types';

const SessionList = () => {
  const [tempSessions, setTempSessions] = useState<Session[]>([]);

  useEffect(() => {
    const sessionsFromStorage = JSON.parse(
      localStorage.getItem('tempSessions') || '[]'
    );
    setTempSessions(sessionsFromStorage);
  }, []);

  const { data: userData } = useQuery({
    queryKey: ['userData'],
    queryFn: getUserData,
  });

  const {
    data: sessions,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ['sessions'],
    queryFn: () => getUserSessions(userData!.userId),
    enabled: !!userData?.userId,
  });

  return (
    <>
      {userData?.userId ? (
        <>
          {isLoading ? (
            <Loading text={'Fetching sessions...'} />
          ) : (
            <>
              {isSuccess && (
                <>
                  {sessions.length === 0 ? (
                    <Typography variant="h5">
                      No sessions created yet!
                    </Typography>
                  ) : (
                    <Stack spacing={2}>
                      {sessions.map((session) => (
                        <SessionItem
                          key={session.id}
                          session={session}
                        ></SessionItem>
                      ))}
                    </Stack>
                  )}
                </>
              )}
            </>
          )}
        </>
      ) : (
        <>
          {tempSessions.length === 0 ? (
            <Typography variant="h5">No sessions created yet!</Typography>
          ) : (
            <Stack spacing={2}>
              {tempSessions.map((session) => (
                <SessionItem key={session.id} session={session}></SessionItem>
              ))}
            </Stack>
          )}
        </>
      )}
    </>
  );
};

export default SessionList;
