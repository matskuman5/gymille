import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  ListItemIcon,
} from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getUserData } from '../../services/user';
import { useNavigate } from 'react-router-dom';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PasswordIcon from '@mui/icons-material/Password';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import TableChartIcon from '@mui/icons-material/TableChart';
import TimelineIcon from '@mui/icons-material/Timeline';
import { useState } from 'react';
import logout from '../../services/logout';

interface Props {
  setMobileSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideBarContent = ({ setMobileSidebarOpen }: Props) => {
  const [userButtonsExpanded, setUserButtonsExpanded] = useState(false);

  const { data: userData } = useQuery({
    queryKey: ['userData'],
    queryFn: getUserData,
  });

  const navigate = useNavigate();

  const handleNavigation = (to: string) => {
    setMobileSidebarOpen(false);
    navigate(to);
  };

  const queryClient = useQueryClient();

  const mutationLogout = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userData'] });
    },
  });

  return (
    <Box>
      <List>
        <ListItem key={'New Session'}>
          <ListItemButton onClick={() => handleNavigation('/')}>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText>New Session</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem key={'Previous Sessions'}>
          <ListItemButton onClick={() => handleNavigation('/sessions')}>
            <ListItemIcon>
              <TimelineIcon />
            </ListItemIcon>
            <ListItemText>Previous Sessions</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem key={'Session Templates'}>
          <ListItemButton
            onClick={() => handleNavigation('/session-templates')}
          >
            <ListItemIcon>
              <TableChartIcon />
            </ListItemIcon>
            <ListItemText>Session Templates</ListItemText>
          </ListItemButton>
        </ListItem>
        <Divider sx={{ marginY: 1 }} />
        {userData?.username ? (
          <>
            <ListItem key={'logged in'}>
              <ListItemButton
                onClick={() => setUserButtonsExpanded(!userButtonsExpanded)}
              >
                <ListItemIcon>
                  {userButtonsExpanded ? (
                    <ExpandLessIcon />
                  ) : (
                    <ExpandMoreIcon />
                  )}
                </ListItemIcon>
                <ListItemText>Logged in as {userData.username}</ListItemText>
              </ListItemButton>
            </ListItem>
            {userButtonsExpanded && (
              <>
                <ListItem key={'Logout'}>
                  <ListItemButton onClick={() => mutationLogout.mutate()}>
                    <ListItemIcon>
                      <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText>Logout</ListItemText>
                  </ListItemButton>
                </ListItem>
                <ListItem key={'Change Password'}>
                  <ListItemButton
                    onClick={() => handleNavigation('/user/change-password')}
                  >
                    <ListItemIcon>
                      <PasswordIcon />
                    </ListItemIcon>
                    <ListItemText>Change Password</ListItemText>
                  </ListItemButton>
                </ListItem>
                <ListItem key={'Delete Account'}>
                  <ListItemButton
                    onClick={() => handleNavigation('/user/delete-account')}
                  >
                    <ListItemIcon>
                      <DeleteIcon color="error" />
                    </ListItemIcon>
                    <ListItemText
                      primaryTypographyProps={{
                        color: 'error.dark',
                      }}
                    >
                      Delete Account
                    </ListItemText>
                  </ListItemButton>
                </ListItem>
              </>
            )}
          </>
        ) : (
          <ListItem key={'Login | Create Account'}>
            <ListItemButton onClick={() => handleNavigation('/user')}>
              <ListItemIcon>
                <LoginIcon />
              </ListItemIcon>
              <ListItemText>Login | Create Account</ListItemText>
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  );
};

export default SideBarContent;
