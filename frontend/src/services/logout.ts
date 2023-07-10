import instance from '../utils/axios';
import apiUrl from '../utils/config';
import { showNotification } from '../utils/notifications';

export const logout = async () => {
  const response = await instance.post(`${apiUrl}/logout`);
  showNotification('Logged out successfully.', 'success');
  return response;
};

export default logout;
