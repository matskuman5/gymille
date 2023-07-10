import axiosInstance from '../utils/axios';
import { Session } from '../types';
import apiUrl from '../utils/config';
import { showNotification } from '../utils/notifications';

export const postSession = async (session: Session, userId: string) => {
  const response = await axiosInstance.post(
    `${apiUrl}/users/${userId}/sessions`,
    session
  );
  showNotification('Session saved successfully.', 'success');
  return response.data;
};

export const getUserSessions = async (userId: string) => {
  const response = await axiosInstance.get<Session[]>(
    `${apiUrl}/users/${userId}/sessions`
  );
  return response.data;
};

export const deleteSession = async (id: string) => {
  const response = await axiosInstance.delete(`${apiUrl}/sessions/${id}`);
  showNotification('Session deleted successfully.', 'success');
  return response;
};
