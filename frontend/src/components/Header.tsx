import { AppBar, Button, Toolbar } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Header = () => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Button variant="contained" component={RouterLink} to="/">
          New Session
        </Button>
        <Button variant="contained" component={RouterLink} to="/sessions">
          Previous Sessions
        </Button>
        <Button
          variant="contained"
          component={RouterLink}
          to="/session-templates"
        >
          Session Templates
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
