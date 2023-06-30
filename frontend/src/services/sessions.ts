import axios from 'axios';
import { Session } from '../types';
import apiUrl from '../utils/config';
import { showError, showNotification } from '../utils/notifications';

export const postSession = async (session: Session) => {
  try {
    const response = await axios.post(`${apiUrl}/sessions`, session);
    showNotification('Session saved successfully.', 'success');
    return response.data;
  } catch (error) {
    showError(error);
  }
};

export const getSessions = async () => {
  try {
    const response = await axios.get<Session[]>(`${apiUrl}/sessions`);
    return response.data;
  } catch (error) {
    showError(error);
  }
};

export const deleteSession = async (id: string) => {
  try {
    const response = await axios.delete(`${apiUrl}/sessions/${id}`);
    showNotification('Session deleted successfully.', 'success');
    return response;
  } catch (error) {
    showError(error);
  }
};
