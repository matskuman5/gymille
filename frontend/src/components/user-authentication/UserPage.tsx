import { Button, Stack, TextField, Typography } from '@mui/material';
import AccountCreationForm from './AccountCreationForm';
import logout from '../../services/logout';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getUserData, updatePassword } from '../../services/user';
import { useState } from 'react';

const UserPage = () => {
  const [newPassword, setNewPassword] = useState('');

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
          <TextField
            label="New Password"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
          />
          <Button
            variant="contained"
            onClick={() => updatePassword(userData.userId, newPassword)}
          >
            Change Password
          </Button>
        </Stack>
      ) : (
        <AccountCreationForm />
      )}
    </>
  );
};

export default UserPage;
