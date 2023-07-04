import { Button, Stack, TextField } from '@mui/material';
import { useState } from 'react';
import { createUser } from '../../services/user';
import { useNavigate } from 'react-router-dom';

const AccountCreationForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async () => {
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
      <Button
        variant="contained"
        onClick={handleSubmit}
        disabled={password.length < 8}
      >
        Create Account
      </Button>
    </Stack>
  );
};

export default AccountCreationForm;
