import { Route, Routes } from 'react-router-dom';
import NewSessionForm from './components/new-session/NewSessionForm';
import SessionList from './components/session-list/SessionList';
import Sidebar from './components/sidebar/Sidebar';
import SessionTemplateList from './components/session-templates/SessionTemplateList';
import { ToastContainer } from 'react-toastify';
import { Box, Stack } from '@mui/material';
import Footer from './components/Footer';
import { useState } from 'react';
import Header from './components/Header';
import PasswordChangeForm from './components/user-authentication/PasswordChangeForm';
import DeleteAccountPage from './components/user-authentication/DeleteAccountPage';
import AccountCreationForm from './components/user-authentication/AccountCreationForm';

const App = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);

  return (
    <Box>
      <Sidebar
        mobileSidebarOpen={mobileSidebarOpen}
        setMobileSidebarOpen={setMobileSidebarOpen}
      />
      <Stack
        spacing={2}
        sx={{
          width: { marginLeft: 200 },
          mx: { xs: 0, sm: 25 },
        }}
      >
        <Header setMobileSidebarOpen={setMobileSidebarOpen} />
        <Box>
          <Routes>
            <Route path="/" element={<NewSessionForm />} />
            <Route path="/sessions" element={<SessionList />} />
            <Route
              path="/session-templates"
              element={<SessionTemplateList />}
            />
            <Route path="/user" element={<AccountCreationForm />} />
            <Route
              path="/user/change-password"
              element={<PasswordChangeForm />}
            />
            <Route
              path="/user/delete-account"
              element={<DeleteAccountPage />}
            />
          </Routes>
        </Box>
        <Footer />
      </Stack>
      <ToastContainer />
    </Box>
  );
};

export default App;

