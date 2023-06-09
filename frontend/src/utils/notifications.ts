type notificationType = 'success' | 'error' | 'warn' | 'info';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const showNotification = (message: string, type: notificationType) => {
  switch (type) {
    case 'success':
      toast.success(message);
      break;
    case 'error':
      console.error(message);
      toast.error(message);
      break;
    case 'warn':
      console.warn(message);
      toast.warn(message);
      break;
    case 'info':
      toast.info(message);
      break;
  }
};

export const showError = (error: any) => {
  if (error instanceof Error) {
    toast.error(`Error: ${error.message}`);
  } else {
    toast.error(JSON.stringify(error));
  }
  console.error(error);
};
