import { Stack, Typography } from '@mui/material';
import AccountCreationForm from './AccountCreationForm';

const UserPage = () => {
  return (
    <Stack spacing={1}>
      <Typography variant="h4">User info</Typography>
      <AccountCreationForm />;
    </Stack>
  );
};

export default UserPage;
