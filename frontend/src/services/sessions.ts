import axiosInstance from '../utils/axios';
import { Session } from '../utils/types';
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

export const deleteSession = async (sessionId: string, userId: string) => {
  const response = await axiosInstance.delete(
    `${apiUrl}/users/${userId}/sessions/${sessionId}`
  );
  showNotification('Session deleted successfully.', 'success');
  return response;
};
