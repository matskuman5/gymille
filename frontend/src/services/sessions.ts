import axios from 'axios';
import { Session } from '../types';
import apiUrl from '../config';

export const postSession = async (session: Session) => {
  const response = await axios.post(`${apiUrl}/api/sessions`, session);
  return response.data;
};

export const getSessions = async () => {
  const response = await axios.get<Session[]>(`${apiUrl}/api/sessions`);
  return response.data;
};
