import axios from 'axios';
import { Session } from '../types';
import apiUrl from '../config';
import { showError, showNotification } from '../utils/notifications';
import { v4 as uuidv4 } from 'uuid';

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

    if (response.data !== undefined) {
      const sessionDataWithIDs = response.data.map((session) => {
        const exercisesWithIDs = session.exercises.map((exercise) => ({
          ...exercise,
          id: uuidv4(),
        }));
        return {
          ...session,
          exercises: exercisesWithIDs,
        };
      });
      return sessionDataWithIDs;
    }
  } catch (error) {
    showError(error);
  }
};
