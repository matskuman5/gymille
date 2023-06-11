import axios from 'axios';
import { SessionTemplate } from '../types';
import apiUrl from '../config';

export const postSessionTemplate = async (sessionTemplate: SessionTemplate) => {
  const response = await axios.post(
    `${apiUrl}/api/session-templates`,
    sessionTemplate
  );
  return response.data;
};

export const updateSessionTemplate = async (
  sessionTemplate: SessionTemplate
) => {
  const response = await axios.put(
    `${apiUrl}/api/session-templates/${sessionTemplate.name}`,
    sessionTemplate
  );
  return response.data;
};

export const getSessionTemplates = async () => {
  const response = await axios.get<SessionTemplate[]>(
    `${apiUrl}/api/session-templates`
  );
  return response.data;
};
