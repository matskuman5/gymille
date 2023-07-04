import { Button, Stack, TextField } from '@mui/material';
import { useState } from 'react';

const AccountCreationForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    console.log('creating account');
  };

  return (
    <Stack>
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
      <Button onClick={handleSubmit}>Create Account</Button>
    </Stack>
  );
};

export default AccountCreationForm;
