import axios, { AxiosError } from 'axios';
import { showError } from './notifications';

const axiosInstance = axios.create({
  withCredentials: true,
});

interface ErrorResponse {
  error?: string;
}

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ErrorResponse>) => {
    if (error.response?.data.error) {
      showError(`Error: ${error.response.data.error}`);
    } else {
      showError(`Error: ${error.message}`);
    }
    throw error;
  }
);

export default axiosInstance;
