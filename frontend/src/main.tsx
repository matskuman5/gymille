import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { UserProvider } from './components/user-authentication/UserContext.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <BrowserRouter basename="/front">
            <App />
          </BrowserRouter>
        </LocalizationProvider>
      </UserProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

