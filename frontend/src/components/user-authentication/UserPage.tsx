import { Stack, Typography } from '@mui/material';
import AccountCreationForm from './AccountCreationForm';
import { useEffect, useState } from 'react';
import { getUserName } from '../../services/user';

const UserPage = () => {
  const [username, setUsername] = useState('');

  const fetchUsername = async () => {
    const data = await getUserName();
    if (data) {
      setUsername(data);
    }
  };

  useEffect(() => {
    fetchUsername();
  }, []);

  return (
    <Stack spacing={1}>
      <Typography variant="h4">User info for ${username}</Typography>
      <AccountCreationForm />;
    </Stack>
  );
};

export default UserPage;
