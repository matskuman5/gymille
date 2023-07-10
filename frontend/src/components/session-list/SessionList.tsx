import SessionItem from './SessionItem';
import { getUserSessions } from '../../services/sessions';
import { Stack, Typography } from '@mui/material';
import { deleteSession as deleteSessionAPI } from '../../services/sessions';
import Loading from '../Loading';
import { useQuery } from '@tanstack/react-query';
import { getUserData } from '../../services/user';

const SessionList = () => {
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

  const deleteSession = async (id: string) => {
    await deleteSessionAPI(id);
  };

  return (
    <>
      {userData ? (
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
                          deleteSession={deleteSession}
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
        <Typography variant="h5">Log in to save sessions!</Typography>
      )}
    </>
  );
};

export default SessionList;
