import { Drawer } from '@mui/material';
import SideBarContent from './SidebarContent';

interface Props {
  mobileSidebarOpen: boolean;
  setMobileSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar = ({ mobileSidebarOpen, setMobileSidebarOpen }: Props) => {
  const handleDrawerToggle = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };

  return (
    <>
      <Drawer
        variant="temporary"
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
        }}
        open={mobileSidebarOpen}
        onClose={handleDrawerToggle}
      >
        <SideBarContent setMobileSidebarOpen={setMobileSidebarOpen} />
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
        }}
        PaperProps={{ style: { width: 200 } }}
      >
        <SideBarContent setMobileSidebarOpen={setMobileSidebarOpen} />
      </Drawer>
    </>
  );
};

export default Sidebar;
