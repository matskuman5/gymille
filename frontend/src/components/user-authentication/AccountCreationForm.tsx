import { Button, Grid, Stack, TextField } from '@mui/material';
import { useState } from 'react';
import { createUser } from '../../services/user';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/login';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const AccountCreationForm = () => {
  const [formUsername, setFormUsername] = useState('');
  const [password, setPassword] = useState('');

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const mutationLogin = useMutation({
    mutationFn: () => login({ username: formUsername, password }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userData'] });
      navigate('/');
    },
  });

  const mutationCreateAccount = useMutation({
    mutationFn: () => createUser({ username: formUsername, password }),
    onSuccess: () => {
      mutationLogin.mutate();
    },
  });

  return (
    <Stack spacing={1}>
      <TextField
        label="Username"
        data-cy="username-field"
        value={formUsername}
        onChange={(event) => setFormUsername(event.target.value)}
      ></TextField>
      <TextField
        label="Password"
        data-cy="password-field"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        error={password.length < 8}
        helperText={
          password.length < 8
            ? 'Password must be at least 8 characters long'
            : ''
        }
      ></TextField>
      <Grid container spacing={1}>
        <Grid item>
          <Button
            data-cy="login-button"
            variant="contained"
            onClick={() => mutationLogin.mutate()}
          >
            Login
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            onClick={() => mutationCreateAccount.mutate()}
            disabled={password.length < 8}
          >
            Create Account
          </Button>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default AccountCreationForm;
