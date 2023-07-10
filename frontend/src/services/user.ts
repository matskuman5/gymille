import instance from '../utils/axios';
import { User } from '../types';
import apiUrl from '../utils/config';
import { showNotification } from '../utils/notifications';

export const createUser = async (user: User) => {
  const response = await instance.post(`${apiUrl}/users`, user);
  showNotification(`User '${user.username}' created successfully.`, 'success');
  return response;
};

export const getUserName = async () => {
  const response = await instance.get(`${apiUrl}/users`);
  return response.data;
};
