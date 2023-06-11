import axios from 'axios';
import { Session } from '../types';
import apiUrl from '../config';
import { showError } from '../utils/notifications';

export const postSession = async (session: Session) => {
  try {
    const response = await axios.post(`${apiUrl}/api/sessions`, session);
    return response.data;
  } catch (error) {
    showError(error);
  }
};

export const getSessions = async () => {
  try {
    const response = await axios.get<Session[]>(`${apiUrl}/api/sessions`);
    return response.data;
  } catch (error) {
    showError(error);
  }
};
