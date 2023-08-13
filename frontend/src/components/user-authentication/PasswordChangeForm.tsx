import { TextField, Button, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { getUserData, updatePassword } from '../../services/user';
import { useQuery } from '@tanstack/react-query';

const PasswordChangeForm = () => {
  const [newPassword, setNewPassword] = useState('');

  const { data: userData } = useQuery({
    queryKey: ['userData'],
    queryFn: getUserData,
  });

  return (
    <>
      {userData?.userId ? (
        <Stack spacing={2}>
          <Typography variant="h5">Change password</Typography>
          <TextField
            label="New Password"
            type="password"
            data-cy="new-password-field"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            error={newPassword.length < 8}
            helperText={
              newPassword.length < 8
                ? 'Password must be at least 8 characters long'
                : ''
            }
          />
          <Button
            data-cy="change-password-button"
            variant="contained"
            onClick={() => updatePassword(userData.userId, newPassword)}
          >
            Change Password
          </Button>
        </Stack>
      ) : (
        'Log in first!'
      )}
    </>
  );
};

export default PasswordChangeForm;
