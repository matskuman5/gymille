import { Box, Button, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { useEffect, useState } from 'react';

const LoginWarning = () => {
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    const dismissedFromStorage = localStorage.getItem('loginWarningDismissed');
    if (dismissedFromStorage === null) {
      setDismissed(false);
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem('loginWarningDismissed', 'true');
    setDismissed(true);
  };

  return (
    !dismissed && (
      <Box
        boxShadow={3}
        marginBottom={3}
        padding={1}
        textAlign="center"
        sx={{
          backgroundColor: (theme) => theme.palette.grey[300],
        }}
      >
        <Typography variant="body2" fontWeight={'bold'} padding={1}>
          Welcome! Note that while you're not logged in, some features might not
          work and any data you enter is only stored locally. Create an account
          or log in to access full functionality, including server-side storage
          of sessions and session templates.
        </Typography>
        <Button
          variant="outlined"
          color="inherit"
          startIcon={<CheckIcon />}
          onClick={handleDismiss}
        >
          Dismiss
        </Button>
      </Box>
    )
  );
};

export default LoginWarning;
