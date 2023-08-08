import { Drawer } from '@mui/material';
import SideBarContent from './SidebarContent';

const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 200,
      }}
    >
      <SideBarContent />
    </Drawer>
  );
};

export default Sidebar;
