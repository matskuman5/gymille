import instance from '../utils/axios';
import { User } from '../types';
import apiUrl from '../utils/config';
import { showError, showNotification } from '../utils/notifications';

export const createUser = async (user: User) => {
  try {
    const response = await instance.post(`${apiUrl}/users`, user);
    showNotification(
      `User '${user.username}' created successfully.`,
      'success'
    );
    return response;
  } catch (error) {
    showError(error);
  }
};

export const getUserName = async () => {
  try {
    const response = await instance.get(`${apiUrl}/users`);
    return response.data;
  } catch (error) {
    showError(error);
  }
};
