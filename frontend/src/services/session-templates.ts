import axios from 'axios';
import { SessionTemplate } from '../types';
import apiUrl from '../config';
import { showError, showNotification } from '../utils/notifications';
import { v4 as uuidv4 } from 'uuid';

export const postSessionTemplate = async (sessionTemplate: SessionTemplate) => {
  try {
    const response = await axios.post(
      `${apiUrl}/session-templates`,
      sessionTemplate
    );
    return response.data;
  } catch (error) {
    showError(error);
  }
};

export const updateSessionTemplate = async (
  sessionTemplate: SessionTemplate
) => {
  try {
    const response = await axios.put(
      `${apiUrl}/session-templates/${sessionTemplate.id}`,
      sessionTemplate
    );
    showNotification('Session template updated successfully.', 'success');
    return response.data;
  } catch (error) {
    showError(error);
  }
};

export const getSessionTemplates = async () => {
  try {
    const response = await axios.get<SessionTemplate[]>(
      `${apiUrl}/session-templates`
    );
    return response.data;
  } catch (error) {
    showError(error);
  }
};

export const deleteSessionTemplate = async (id: string) => {
  try {
    const response = await axios.delete(`${apiUrl}/session-templates/${id}`);
    showNotification('Session template deleted successfully.', 'success');
    return response;
  } catch (error) {
    showError(error);
  }
};
