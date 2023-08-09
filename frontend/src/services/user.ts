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

export const updatePassword = async (userId: string, newPassword: string) => {
  const response = await axiosInstance.put(
    `${apiUrl}/users/${userId}/password`,
    { newPassword }
  );
  showNotification(`Password updated successfully.`, 'success');
  return response;
};

export const deleteUser = async (userId: string) => {
  const response = await axiosInstance.delete(`${apiUrl}/users/${userId}`);
  showNotification(`Account deleted successfully.`, 'success');
  return response;
};
