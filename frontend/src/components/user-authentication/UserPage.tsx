import { Button, Stack, Typography } from '@mui/material';
import AccountCreationForm from './AccountCreationForm';
import { useContext } from 'react';
import logout from '../../services/logout';
import { UserContext } from './UserContext';

const UserPage = () => {
  const { username, setUsername } = useContext(UserContext);

  const handleLogoutClick = async () => {
    await logout();
    setUsername('');
  };

  return (
    <>
      {username ? (
        <Stack>
          <Typography variant="h4">User info for {username}</Typography>
          <Button variant="contained" onClick={handleLogoutClick}>
            Logout
          </Button>
        </Stack>
      ) : (
        <AccountCreationForm />
      )}
    </>
  );
};

export default UserPage;
