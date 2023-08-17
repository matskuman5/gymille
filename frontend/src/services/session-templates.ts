import axiosInstance from '../utils/axios';
import { SessionTemplate } from '../utils/types';
import apiUrl from '../utils/config';
import { showNotification } from '../utils/notifications';

export const postSessionTemplate = async (sessionTemplate: SessionTemplate) => {
  const response = await axiosInstance.post(
    `${apiUrl}/session-templates`,
    sessionTemplate
  );
  return response.data;
};

export const updateSessionTemplate = async (
  sessionTemplate: SessionTemplate
) => {
  const response = await axiosInstance.put(
    `${apiUrl}/session-templates/${sessionTemplate.id}`,
    sessionTemplate
  );
  showNotification('Session template updated successfully.', 'success');
  return response.data;
};

export const getUserSessionTemplates = async (userId: string) => {
  const response = await axiosInstance.get<SessionTemplate[]>(
    `${apiUrl}/users/${userId}/session-templates`
  );
  return response.data;
};

export const deleteSessionTemplate = async (id: string) => {
  const response = await axiosInstance.delete(
    `${apiUrl}/session-templates/${id}`
  );
  showNotification('Session template deleted successfully.', 'success');
  return response;
};
