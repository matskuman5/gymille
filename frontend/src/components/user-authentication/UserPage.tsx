import { Button, Stack, Typography } from '@mui/material';
import AccountCreationForm from './AccountCreationForm';
import { useEffect, useState } from 'react';
import { getUserName } from '../../services/user';
import logout from '../../services/logout';

const UserPage = () => {
  const [username, setUsername] = useState('');

  const fetchUsername = async () => {
    const data = await getUserName();
    if (data) {
      setUsername(data);
    }
  };

  const handleLogoutClick = async () => {
    await logout();
  };

  useEffect(() => {
    fetchUsername();
  }, []);

  return (
    <Stack spacing={1}>
      <Typography variant="h4">User info for ${username}</Typography>
      <Button onClick={handleLogoutClick}>Logout</Button>
      <AccountCreationForm />;
    </Stack>
  );
};

export default UserPage;
