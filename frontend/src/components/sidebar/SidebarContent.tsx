import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { getUserData } from '../../services/user';
import { Link as RouterLink } from 'react-router-dom';

const SideBarContent = () => {
  const { data: userData } = useQuery({
    queryKey: ['userData'],
    queryFn: getUserData,
  });

  return (
    <Box>
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
  );
};

export default SideBarContent;
