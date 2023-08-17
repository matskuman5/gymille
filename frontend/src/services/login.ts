import axiosInstance from '../utils/axios';
import { User } from '../utils/types';
import apiUrl from '../utils/config';
import { showNotification } from '../utils/notifications';

export const login = async (user: User) => {
  const response = await axiosInstance.post(`${apiUrl}/login`, user);
  showNotification(`Logged in successfully as '${user.username}'.`, 'success');
  return response;
};

export default login;
