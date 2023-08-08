import { Button, Stack, Typography } from '@mui/material';
import AccountCreationForm from './AccountCreationForm';
import logout from '../../services/logout';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getUserData } from '../../services/user';
import PasswordChangeForm from './PasswordChangeForm';

const UserPage = () => {
  const { data: userData } = useQuery({
    queryKey: ['userData'],
    queryFn: getUserData,
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userData'] });
    },
  });

  return (
    <>
      {userData?.username && userData?.userId ? (
        <Stack>
          <Typography variant="h4">
            User info for {userData.username}
          </Typography>
          <Button variant="contained" onClick={() => mutation.mutate()}>
            Logout
          </Button>
          <PasswordChangeForm />
        </Stack>
      ) : (
        <AccountCreationForm />
      )}
    </>
  );
};

export default UserPage;
