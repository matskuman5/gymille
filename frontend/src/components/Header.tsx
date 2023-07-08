import { AppBar, Button, Grid, Toolbar, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { UserContext } from './user-authentication/UserContext';
import { useContext } from 'react';

const Header = () => {
  const { username } = useContext(UserContext);

  return (
    <AppBar position="sticky">
      <Typography
        variant="h3"
        fontWeight="bold"
        fontStyle="italic"
        style={{ margin: 16 }}
      >
        Gymille!
      </Typography>
      {username && <Typography>Logged in as {username}</Typography>}
      <Toolbar>
        <Grid container spacing={2} marginBottom={2}>
          <Grid item>
            <Button
              size="small"
              variant="contained"
              component={RouterLink}
              to="/"
            >
              New Session
            </Button>
          </Grid>
          <Grid item>
            <Button
              size="small"
              variant="contained"
              component={RouterLink}
              to="/sessions"
            >
              Previous Sessions
            </Button>
          </Grid>
          <Grid item>
            <Button
              size="small"
              variant="contained"
              component={RouterLink}
              to="/session-templates"
            >
              Session Templates
            </Button>
          </Grid>
          <Grid item>
            <Button
              size="small"
              variant="contained"
              component={RouterLink}
              to="/user"
            >
              User
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
