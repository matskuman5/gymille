import axios from 'axios';
import { Session } from '../types';

export const postSession = async (session: Session) => {
  const response = await axios.post(
    'http://localhost:3000/api/sessions',
    session
  );
  return response.data;
};

export const getSessions = async () => {
  const response = await axios.get<Session[]>(
    'http://localhost:3000/api/sessions'
  );
  return response.data;
};
