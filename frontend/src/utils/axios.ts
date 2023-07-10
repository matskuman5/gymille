import axios, { AxiosError } from 'axios';
import { showError } from './notifications';

const instance = axios.create({
  withCredentials: true,
});

interface ErrorResponse {
  error?: string;
}

instance.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ErrorResponse>) => {
    if (error.response?.data.error) {
      showError(`Error: ${error.response.data.error}`);
    } else {
      showError(`Error: ${error}`);
    }
    throw error;
  }
);

export default instance;
