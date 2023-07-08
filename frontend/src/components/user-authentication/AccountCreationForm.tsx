import { Button, Grid, Stack, TextField } from '@mui/material';
import { useContext, useState } from 'react';
import { createUser } from '../../services/user';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/login';
import { UserContext } from './UserContext';

const AccountCreationForm = () => {
  const [formUsername, setFormUsername] = useState('');
  const [password, setPassword] = useState('');

  const { setUsername, setUserId } = useContext(UserContext);

  const navigate = useNavigate();

  const handleLoginClick = async () => {
    const response = await login({ username: formUsername, password });
    if (response && response.status === 200) {
      setUsername(response.data.username);
      setUserId(response.data.userId);
      navigate('/');
    }
  };

  const handleCreateAccountClick = async () => {
    const response = await createUser({ username: formUsername, password });
    if (response && response.status === 201) {
      const response = await login({ username: formUsername, password });
      if (response && response.status === 200) {
        setUsername(response.data.username);
        setUserId(response.data.userId);
        navigate('/');
      }
    }
  };

  return (
    <Stack spacing={1}>
      <TextField
        label="Username"
        value={formUsername}
        onChange={(event) => setFormUsername(event.target.value)}
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
