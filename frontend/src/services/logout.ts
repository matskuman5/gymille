import { useContext } from 'react';
import instance from '../utils/axios';
import apiUrl from '../utils/config';
import { showError, showNotification } from '../utils/notifications';
import { UserContext } from '../components/user-authentication/UserContext';

const { setUsername, setUserId } = useContext(UserContext);

export const logout = async () => {
  try {
    const response = await instance.post(`${apiUrl}/logout`);
    showNotification('Logged out successfully.', 'success');
    setUsername('');
    setUserId('');
    return response;
  } catch (error) {
    showError(error);
  }
};

export default logout;
