import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getUserData } from '../services/user';

const Sidebar = () => {
  const { data: userData } = useQuery({
    queryKey: ['userData'],
    queryFn: getUserData,
  });

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 200,
      }}
    >
      <Box>
        <Typography variant="h3" fontWeight="bold" fontStyle="italic">
          Gymille!
        </Typography>
        {userData?.username && (
          <Typography>Logged in as {userData.username}</Typography>
        )}
        <List>
          <ListItem key={'New Session'}>
            <ListItemButton component={RouterLink} to="/">
              <ListItemText>New Session</ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem key={'Previous Sessions'}>
            <ListItemButton component={RouterLink} to="/sessions">
              <ListItemText>Previous Sessions</ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem key={'Session Templates'}>
            <ListItemButton component={RouterLink} to="/session-templates">
              <ListItemText>Session Templates</ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem key={'User'}>
            <ListItemButton component={RouterLink} to="/user">
              <ListItemText>User</ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
