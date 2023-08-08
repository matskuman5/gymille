import { Route, Routes } from 'react-router-dom';
import NewSessionForm from './components/new-session/NewSessionForm';
import SessionList from './components/session-list/SessionList';
import Sidebar from './components/Sidebar';
import SessionTemplateList from './components/session-templates/SessionTemplateList';
import { ToastContainer } from 'react-toastify';
import { Box, Stack } from '@mui/material';
import Footer from './components/Footer';
import UserPage from './components/user-authentication/UserPage';

const App = () => {
  return (
    <Box>
      <Sidebar />
      <Stack spacing={2} minHeight="100vh">
        <Box sx={{ flex: 1, width: { marginLeft: 200 } }}>
          <Routes>
            <Route path="/" element={<NewSessionForm />} />
            <Route path="/sessions" element={<SessionList />} />
            <Route
              path="/session-templates"
              element={<SessionTemplateList />}
            />
            <Route path="/user" element={<UserPage />} />
          </Routes>
        </Box>
        <Footer />
      </Stack>
      <ToastContainer />
    </Box>
  );
};

export default App;

