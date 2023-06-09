import axios from 'axios';
import { Session } from '../types';

export const postSession = (session: Session) => {
  axios.post('http://localhost:3000/api/sessions', session);
};

export const getSessions = async () => {
  const response = await axios.get<Session[]>(
    'http://localhost:3000/api/sessions'
  );
  return response.data;
};
