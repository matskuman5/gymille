import axios from 'axios';
import { User } from '../types';
import apiUrl from '../utils/config';
import { showError, showNotification } from '../utils/notifications';

export const createUser = async (user: User) => {
  try {
    const response = await axios.post(`${apiUrl}/users`, user);
    showNotification('User created successfully.', 'success');
    return response.data;
  } catch (error) {
    showError(error);
  }
};
