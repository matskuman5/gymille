import axiosInstance from '../utils/axios';
import { User, UserData } from '../types';
import apiUrl from '../utils/config';
import { showNotification } from '../utils/notifications';

export const createUser = async (user: User) => {
  const response = await axiosInstance.post(`${apiUrl}/users`, user);
  showNotification(`User '${user.username}' created successfully.`, 'success');
  return response;
};

export const getUserData = async () => {
  const response = await axiosInstance.get<UserData>(`${apiUrl}/users`);
  return response.data;
};
