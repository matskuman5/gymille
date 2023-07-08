import instance from '../utils/axios';
import { User } from '../types';
import apiUrl from '../utils/config';
import { showError, showNotification } from '../utils/notifications';

export const login = async (user: User) => {
  try {
    const response = await instance.post(`${apiUrl}/login`, user);
    showNotification(
      `Logged in successfully as '${user.username}'.`,
      'success'
    );
    return response;
  } catch (error) {
    showError(error);
  }
};

export default login;
