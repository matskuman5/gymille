import axios from 'axios';
import { SessionTemplate } from '../types';
import apiUrl from '../config';
import { showError, showNotification } from '../utils/notifications';
import { v4 as uuidv4 } from 'uuid';

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
      `${apiUrl}/api/session-templates/${sessionTemplate.id}`,
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
    if (response.data !== undefined) {
      const sessionTemplateDataWithIDs = response.data.map(
        (sessionTemplate) => {
          const exerciseTemplatesWithIDs =
            sessionTemplate.exerciseTemplates.map((exerciseTemplate) => ({
              ...exerciseTemplate,
              id: uuidv4(),
            }));

          return {
            ...sessionTemplate,
            exerciseTemplates: exerciseTemplatesWithIDs,
          };
        }
      );
      return sessionTemplateDataWithIDs;
    }
  } catch (error) {
    showError(error);
  }
};

export const deleteSessionTemplate = async (id: string) => {
  try {
    const response = await axios.delete(
      `${apiUrl}/api/session-templates/${id}`
    );
    showNotification('Session template deleted successfully.', 'success');
    return response;
  } catch (error) {
    showError(error);
  }
};
