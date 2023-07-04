import { AppBar, Button, Grid, Toolbar, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Header = () => {
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
      <Toolbar>
        <Grid spacing={2} marginBottom={2}>
          <Button
            size="small"
            variant="contained"
            component={RouterLink}
            to="/"
          >
            New Session
          </Button>
          <Button
            size="small"
            variant="contained"
            component={RouterLink}
            to="/sessions"
          >
            Previous Sessions
          </Button>
          <Button
            size="small"
            variant="contained"
            component={RouterLink}
            to="/session-templates"
          >
            Session Templates
          </Button>
          <Button
            size="small"
            variant="contained"
            component={RouterLink}
            to="/user"
          >
            User
          </Button>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
