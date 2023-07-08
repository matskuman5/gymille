import { Button, Stack, Typography } from '@mui/material';
import AccountCreationForm from './AccountCreationForm';
import { useContext } from 'react';
import logout from '../../services/logout';
import { UserContext } from './UserContext';

const UserPage = () => {
  const { username, setUsername, setUserId } = useContext(UserContext);

  const handleLogoutClick = async () => {
    const response = await logout();
    if (response && response.status === 200) {
      setUsername('');
      setUserId('');
    }
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
