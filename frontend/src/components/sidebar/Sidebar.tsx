import { AppBar, Drawer, IconButton, Toolbar, Typography } from '@mui/material';
import SideBarContent from './SidebarContent';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';

const Sidebar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h3" fontWeight="bold" fontStyle="italic">
            Gymille!
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          width: 200,
        }}
        open={mobileOpen}
        onClose={handleDrawerToggle}
      >
        <SideBarContent />
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          width: 200,
        }}
      >
        <SideBarContent />
      </Drawer>
    </>
  );
};

export default Sidebar;
