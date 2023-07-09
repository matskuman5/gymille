import instance from '../utils/axios';
import { SessionTemplate } from '../types';
import apiUrl from '../utils/config';
import { showError, showNotification } from '../utils/notifications';

export const postSessionTemplate = async (sessionTemplate: SessionTemplate) => {
  try {
    const response = await instance.post(
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
    const response = await instance.put(
      `${apiUrl}/session-templates/${sessionTemplate.id}`,
      sessionTemplate
    );
    showNotification('Session template updated successfully.', 'success');
    return response.data;
  } catch (error) {
    showError(error);
  }
};

export const getUserSessionTemplates = async (userId: string) => {
  try {
    const response = await instance.get<SessionTemplate[]>(
      `${apiUrl}/users/${userId}/session-templates`
    );
    return response.data;
  } catch (error) {
    showError(error);
  }
};

export const deleteSessionTemplate = async (id: string) => {
  try {
    const response = await instance.delete(`${apiUrl}/session-templates/${id}`);
    showNotification('Session template deleted successfully.', 'success');
    return response;
  } catch (error) {
    showError(error);
  }
};
