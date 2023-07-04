import { Button, Grid, Stack, TextField } from '@mui/material';
import { useState } from 'react';
import { createUser } from '../../services/user';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/login';

const AccountCreationForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLoginClick = async () => {
    const response = await login({ username, password });
    if (response && response.status === 200) {
      navigate('/');
    }
  };

  const handleCreateAccountClick = async () => {
    const response = await createUser({ username, password });
    if (response && response.status === 201) {
      navigate('/');
    }
  };

  return (
    <Stack spacing={1}>
      <TextField
        label="Username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      ></TextField>
      <TextField
        label="Password"
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
          <Button variant="contained" onClick={handleLoginClick}>
            Login
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            onClick={handleCreateAccountClick}
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
