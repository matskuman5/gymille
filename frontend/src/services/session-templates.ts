import axios from 'axios';
import { SessionTemplate } from '../types';
import apiUrl from '../config';
import { showError, showNotification } from '../utils/notifications';

export const postSessionTemplate = async (sessionTemplate: SessionTemplate) => {
  try {
    const response = await axios.post(
      `${apiUrl}/api/session-templates`,
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
      `${apiUrl}/api/session-templates/${sessionTemplate.name}`,
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
      `${apiUrl}/api/session-templates`
    );
    return response.data;
  } catch (error) {
    showError(error);
  }
};
