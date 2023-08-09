import { Button, Divider, Stack, TextField, Typography } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { deleteUser, getUserData } from '../../services/user';
import logout from '../../services/logout';

const DeleteAccountPage = () => {
  const [formUsername, setFormUsername] = useState('');

  const { data: userData } = useQuery({
    queryKey: ['userData'],
    queryFn: getUserData,
  });

  const queryClient = useQueryClient();

  const mutationDeleteUser = useMutation({
    mutationFn: () => deleteUser(userData!.userId),
    onSuccess: async () => {
      await logout();
      queryClient.invalidateQueries({ queryKey: ['userData'] });
    },
  });

  return (
    <Stack spacing={2}>
      <Typography variant="h5">Delete account</Typography>
      <Divider />
      <Typography
        variant="body1"
        fontWeight="bold"
        color={(theme) => theme.palette.error.dark}
      >
        Deleting your account permanently removes all data associated with it,
        including sessions and session templates.
      </Typography>
      <TextField
        label="Username"
        value={formUsername}
        onChange={(event) => setFormUsername(event.target.value)}
      ></TextField>
      <Button
        variant="contained"
        color="error"
        onClick={() => mutationDeleteUser.mutate()}
        disabled={formUsername !== userData?.username}
      >
        Delete Account
      </Button>
    </Stack>
  );
};

export default DeleteAccountPage;
