import instance from '../utils/axios';
import { Session } from '../types';
import apiUrl from '../utils/config';
import { showError, showNotification } from '../utils/notifications';

export const postSession = async (session: Session, userId: string) => {
  try {
    const response = await instance.post(
      `${apiUrl}/users/${userId}/sessions`,
      session
    );
    showNotification('Session saved successfully.', 'success');
    return response.data;
  } catch (error) {
    showError(error);
  }
};

export const getUserSessions = async (userId: string) => {
  try {
    const response = await instance.get<Session[]>(
      `${apiUrl}/users/${userId}/sessions`
    );
    return response.data;
  } catch (error) {
    showError(error);
  }
};

export const deleteSession = async (id: string) => {
  try {
    const response = await instance.delete(`${apiUrl}/sessions/${id}`);
    showNotification('Session deleted successfully.', 'success');
    return response;
  } catch (error) {
    showError(error);
  }
};
