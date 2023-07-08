import instance from '../utils/axios';
import apiUrl from '../utils/config';
import { showError, showNotification } from '../utils/notifications';

export const logout = async () => {
  try {
    const response = await instance.post(`${apiUrl}/logout`);
    showNotification('Logged out successfully.', 'success');
    return response;
  } catch (error) {
    showError(error);
  }
};

export default logout;
