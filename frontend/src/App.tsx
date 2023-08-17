import { Route, Routes } from 'react-router-dom';
import NewSessionForm from './components/new-session/NewSessionForm';
import SessionList from './components/session-list/SessionList';
import Sidebar from './components/sidebar/Sidebar';
import SessionTemplateList from './components/session-templates/SessionTemplateList';
import { ToastContainer } from 'react-toastify';
import { Box, Stack, Theme, ThemeProvider, createTheme } from '@mui/material';
import Footer from './components/miscellaneous/Footer';
import { useEffect, useState } from 'react';
import Header from './components/miscellaneous/Header';
import PasswordChangeForm from './components/user-authentication/PasswordChangeForm';
import DeleteAccountPage from './components/user-authentication/DeleteAccountPage';
import AccountCreationForm from './components/user-authentication/AccountCreationForm';
import LoginWarning from './components/miscellaneous/LoginWarning';
import Preferences from './components/miscellaneous/Preferences';

const App = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);
  const [theme, setTheme] = useState<Theme>(createTheme());

  useEffect(() => {
    const mode = localStorage.getItem('darkMode') === 'true' ? 'dark' : 'light';
    setTheme(
      createTheme({
        palette: {
          mode: mode,
        },
      })
    );
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box
        bgcolor="background.default"
        position="fixed"
        height="100%"
        width="100%"
        marginTop="-8px"
        marginLeft="-8px"
        paddingLeft="8px"
      >
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
            <LoginWarning />
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
              <Route path="/preferences" element={<Preferences />} />
            </Routes>
          </Box>
          <Footer />
        </Stack>
        <ToastContainer />
      </Box>
    </ThemeProvider>
  );
};

export default App;

