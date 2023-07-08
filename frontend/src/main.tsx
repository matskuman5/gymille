import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { UserProvider } from './components/user-authentication/UserContext.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <UserProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <BrowserRouter basename="/front">
          <App />
        </BrowserRouter>
      </LocalizationProvider>
    </UserProvider>
  </React.StrictMode>
);

