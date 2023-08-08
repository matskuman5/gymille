import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

interface Props {
  setMobileSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = ({ setMobileSidebarOpen }: Props) => {
  const handleDrawerToggle = () => {
    setMobileSidebarOpen(true);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          color="inherit"
          onClick={handleDrawerToggle}
          sx={{
            display: { sm: 'none' },
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h3" fontWeight="bold" fontStyle="italic">
          Gymille!
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
