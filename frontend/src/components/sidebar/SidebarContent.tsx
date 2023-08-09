import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { getUserData } from '../../services/user';
import { useNavigate } from 'react-router-dom';

interface Props {
  setMobileSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideBarContent = ({ setMobileSidebarOpen }: Props) => {
  const { data: userData } = useQuery({
    queryKey: ['userData'],
    queryFn: getUserData,
  });

  const navigate = useNavigate();

  const handleNavigation = (to: string) => {
    setMobileSidebarOpen(false);
    navigate(to);
  };

  return (
    <Box>
      <List>
        <ListItem key={'New Session'}>
          <ListItemButton onClick={() => handleNavigation('/')}>
            <ListItemText>New Session</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem key={'Previous Sessions'}>
          <ListItemButton onClick={() => handleNavigation('/sessions')}>
            <ListItemText>Previous Sessions</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem key={'Session Templates'}>
          <ListItemButton
            onClick={() => handleNavigation('/session-templates')}
          >
            <ListItemText>Session Templates</ListItemText>
          </ListItemButton>
        </ListItem>
        <Divider sx={{ marginY: 1 }} />
        {userData?.username ? (
          <>
            <ListItem>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ marginLeft: 2.1 }}
              >
                Logged in as {userData.username}
              </Typography>
            </ListItem>
            <ListItem key={'Change Password'}>
              <ListItemButton
                onClick={() => handleNavigation('/user/change-password')}
              >
                <ListItemText>Change Password</ListItemText>
              </ListItemButton>
            </ListItem>
            <ListItem key={'Delete Account'}>
              <ListItemButton
                onClick={() => handleNavigation('/user/delete-account')}
              >
                <ListItemText>Delete Account</ListItemText>
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          <ListItem key={'User'}>
            <ListItemButton onClick={() => handleNavigation('/user')}>
              <ListItemText>User</ListItemText>
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  );
};

export default SideBarContent;
