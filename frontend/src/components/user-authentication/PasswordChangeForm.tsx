import { TextField, Button, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { getUserData, updatePassword } from '../../services/user';
import { useQuery } from '@tanstack/react-query';
import { Navigate } from 'react-router-dom';

const PasswordChangeForm = () => {
  const [newPassword, setNewPassword] = useState('');

  const { data: userData } = useQuery({
    queryKey: ['userData'],
    queryFn: getUserData,
  });

  return (
    <>
      {userData ? (
        <Stack spacing={2}>
          <Typography variant="h5">Change password</Typography>
          <TextField
            label="New Password"
            type="password"
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
            variant="contained"
            onClick={() => updatePassword(userData.userId, newPassword)}
          >
            Change Password
          </Button>
        </Stack>
      ) : (
        <Navigate to="/user" />
      )}
    </>
  );
};

export default PasswordChangeForm;
